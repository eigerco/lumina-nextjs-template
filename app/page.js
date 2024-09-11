"use client";

import React, { useState, useEffect, useRef } from "react";

import { spawnNode, Network, NodeConfig } from 'lumina-node';

export default function Home() {
  let initialized = useRef(false);
  let [node, setNode] = useState(null);

  useEffect(() => {
    const init = async () => {
      let node = await spawnNode();
      setNode(node);
    };
    if (!initialized.current) {
      initialized.current = true;
      init();
    }
  }, [node]);

  return (
    <main>
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
