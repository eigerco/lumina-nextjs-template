import { useEffect, useState, useRef } from 'react';
import init, {Network, NodeConfig, NodeClient} from 'lumina-node-shim';

export const useWasm = () => {
	const lumina = useRef(undefined);
	useEffect(() => { 
		const fetchWasm = async () => {
			lumina.current = init();
		};
		if (lumina.current === undefined ){
			lumina.current = "loading";
			fetchWasm();
		}
	}, []);
	return lumina;
}
