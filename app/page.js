"use client";

import Image from "next/image";
import React, {useState, useEffect} from "react";
import dynamic from 'next/dynamic';

import init, {Network, NodeConfig, NodeClient} from 'lumina-node-shim';

let worker_started = false;

export default function Home() {
	let [node, setNode] = useState();

	useEffect(() => {
		const startWasm = async () => {
			setNode(await init());
		};
		if (!worker_started) {
			worker_started = true;
			startWasm();
		}
	}, []);

	return (
		<main>
		<p> Hello there</p>
		<button onClick={async () => {
			console.log("current: ", node);
			let result = await node.is_running();
			console.log("running: ", result);
		}}>Is running</button>
		<br />
		<button onClick={async () => {
			let config = NodeConfig.default(Network.Mocha);
			console.log("bootnodes", config.bootnodes);
			console.log("network", config.network);

			console.log("current: ", node);
			let result = await node.start(config);
			console.log("running: ", result);

		}}>Start</button>
		</main>
	);
}
