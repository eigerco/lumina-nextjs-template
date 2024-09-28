"use client";

import React, { useState, useContext, useEffect } from "react";

import { Network, NodeConfig } from "lumina-node";

import { LuminaContext, LuminaContextProvider } from "./lumina";

export default function Home() {
  return (
    <LuminaContextProvider>
      <main>
        <Launcher />
        <Stats />
      </main>
    </LuminaContextProvider>
  );
}

function Launcher() {
  const node = useContext(LuminaContext);

  return (
    <>
      {node ? (
        <button
          onClick={async () => {
            let config = NodeConfig.default(Network.Mocha);
            console.log("bootnodes", config.bootnodes);
            console.log("network", config.network);

            console.log("current: ", node);
            let result = await node.start(config);
            console.log("running: ", result);
          }}
        >
          Start
        </button>
      ) : (
        <span>Loading...</span>
      )}
    </>
  );
}

function Stats() {
  const node = useContext(LuminaContext);

  const [peerTrackerInfo, setPeerTrackerInfo] = useState();
  const [syncerInfo, setSyncerInfo] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      const update = async () => {
        if (node && (await node.isRunning())) {
          setPeerTrackerInfo(await node.peerTrackerInfo());
          setSyncerInfo(await node.syncerInfo());
        }
      };
      update();
    }, 1000);
    return () => clearInterval(interval);
  }, [node]);

  if (!peerTrackerInfo || !syncerInfo) {
    return;
  }

  return (
    <div>
      <div>network head: {syncerInfo.subjective_head.toString()}</div>
      <div>
        stored headers:
        {syncerInfo.stored_headers.map((range) => {
          return ` ${range.start}..${range.end}`;
        })}
      </div>
      <div>
        peers: {peerTrackerInfo.num_connected_peers.toString()} (
        {peerTrackerInfo.num_connected_trusted_peers.toString()} trusted)
      </div>
    </div>
  );
}
