'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface ICartItems {
	productId: string;
	productModelId: string;
	productSizeId: string;
	quantity: number;
	price: number;
}

interface IAddToCartRequest {
	productId: string;
	productModelId: string;
	productSizeId: string;
	price: number;
	quantity?: number;
}

interface IRemoveRequest {
	productModelId: string;
	productSizeId: string;
}

interface CartContextType {
	items: ICartItems[];
	clearCart: () => void;
	addToCart: (params: IAddToCartRequest) => void;
	removeFromCart: (params: IRemoveRequest) => void;
	decrementProductFromCart: (params: IRemoveRequest) => void;
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

	function addToCart({ productId, productModelId, productSizeId, price, quantity }: IAddToCartRequest) {
		console.log('add to cart productId:', productId);
		console.log('add to cart productModelId:', productModelId);
		console.log('add to cart productSizeId:', productSizeId);
		console.log('add to cart price:', price);
		console.log('add to cart quantity:', quantity);

		setCartItems((state) => {
			const productInCart = state.some(
				(item) => item.productModelId === productModelId && productSizeId === item.productSizeId
			);

			if (productInCart) {
				return state.map((item) => {
					if (item.productModelId === productModelId && productSizeId === item.productSizeId) {
						return {
							...item,
							quantity: quantity ?? item.quantity + 1,
							price: item.price,
						};
					} else {
						return item;
					}
				});
			} else {
				return [...state, { productId, productModelId, productSizeId, quantity: quantity ?? 1, price }];
			}
		});
	}

	function removeFromCart({ productModelId, productSizeId }: IRemoveRequest) {
		setCartItems((prev) =>
			prev.filter((item) => !(item.productModelId === productModelId && item.productSizeId === productSizeId))
		);
	}

	function decrementProductFromCart({ productModelId, productSizeId }: IRemoveRequest) {
		setCartItems((prev) => {
			return prev.map((item) => {
				if (item.productModelId === productModelId && item.productSizeId === productSizeId) {
					return { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 };
				} else {
					return item;
				}
			});
		});
	}

	function clearCart() {
		setCartItems([]);
		sessionStorage.removeItem('cart');
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
