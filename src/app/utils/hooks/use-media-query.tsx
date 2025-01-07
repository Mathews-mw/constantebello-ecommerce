'use client';

import { useState, useEffect } from 'react';

interface WindowSize {
	width: number | undefined;
	height: number | undefined;
}

const useMediaQuery = (): WindowSize => {
	const [windowSize, setWindowSize] = useState<WindowSize>({
		width: undefined,
		height: undefined,
	});

	useEffect(() => {
		// Função para atualizar o estado com o tamanho da janela
		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		// Adiciona o evento de redimensionamento
		if (typeof window !== 'undefined') {
			handleResize(); // Define o tamanho inicial
			window.addEventListener('resize', handleResize);
		}

		// Limpa o evento ao desmontar o componente
		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('resize', handleResize);
			}
		};
	}, []); // Executa apenas uma vez, ao montar o componente

	return windowSize;
};

export default useMediaQuery;
