"use client";

import Image from "next/image";
import React, {useState, useEffect} from "react";
import dynamic from 'next/dynamic';

import {Network, NodeConfig} from 'lumina-node-shim';
import { useWasm }  from './useWasm';

export default function Home() {
	const lumina_instance = useWasm();

  return (
    <main>
	  <p> Hello there</p>
	  <button onClick={async () => {
		  let lumina = await lumina_instance;
		  console.log("lumina_instance: ", lumina.current);
		  let current = await lumina.current;
		  console.log("current: ", current);
		  let result = await current.is_running();
		  console.log("running: ", result);
	  }}>Is running</button>
	  <br />
	  <button onClick={async () => {
		  let config = NodeConfig.default(Network.Mainnet);
		  console.log("config", config);

		  let lumina = await lumina_instance;
		  console.log("lumina_instance: ", lumina.current);
		  let current = await lumina.current;
		  console.log("current: ", current);
		  let result = await current.start(config);
		  console.log("running: ", result);

	  }}>Start</button>
    </main>
  );
}
