'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ICartItems {
	productId: string;
	quantity: number;
}

interface CartContextType {
	items: ICartItems[];
	clearCart: () => void;
	addToCart: (productId: string) => void;
	removeFromCart: (productId: string) => void;
	decrementProductFromCart: (productId: string) => void;
}

export const CartContext = createContext({} as CartContextType);

export function CartContextProvider({ children }: { children: React.ReactNode }) {
	const [cartItems, setCartItems] = useState<ICartItems[]>(() => {
		// Tenta carregar o carrinho do localStorage ao inicializar o estado
		// typeof window !== 'undefined' impede que o localStorage seja acessado no servidor (SSR)
		if (typeof window !== 'undefined') {
			const savedCart = localStorage.getItem('cart');
			return savedCart ? JSON.parse(savedCart) : [];
		}
		return [];
	});

	function addToCart(productId: string) {
		setCartItems((state) => {
			const productInCart = state.some((item) => item.productId === productId);

			if (productInCart) {
				return state.map((item) => {
					if (item.productId === productId) {
						return { ...item, quantity: item.quantity + 1 };
					} else {
						return item;
					}
				});
			} else {
				return [...state, { productId, quantity: 1 }];
			}
		});
	}

	function removeFromCart(productId: string) {
		setCartItems((prev) => prev.filter((item) => item.productId !== productId));
	}

	function decrementProductFromCart(productId: string) {
		setCartItems((prev) => {
			return prev.map((item) => {
				if (item.productId === productId) {
					return { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 };
				} else {
					return item;
				}
			});
		});
	}

	function clearCart() {
		setCartItems([]);
	}

	// Atualiza o localStorage apenas quando o carrinho já foi inicializado
	useEffect(() => {
		if (cartItems.length > 0 || localStorage.getItem('cart') !== null) {
			localStorage.setItem('cart', JSON.stringify(cartItems));
		}
	}, [cartItems]);

	// Sincroniza o estado do carrinho entre múltiplas abas
	useEffect(() => {
		const handleStorageChange = (event: StorageEvent) => {
			if (event.key === 'cart') {
				const updatedCart = event.newValue ? JSON.parse(event.newValue) : [];
				setCartItems(updatedCart);
			}
		};

		window.addEventListener('storage', handleStorageChange);
		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);

	return (
		<CartContext.Provider
			value={{
				items: cartItems,
				clearCart,
				addToCart,
				removeFromCart,
				decrementProductFromCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export const useCart = () => useContext(CartContext);
