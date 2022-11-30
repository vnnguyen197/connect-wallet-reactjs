import React, { useEffect, useState } from "react";
import fetcher from "../../utils/fetcher";
import Chain from "../Chain";
import "./style.css";
export default function WalletList({
  isConnected,
  setIsConnected,
  setAccountAddress,
  accountAddress,
}) {
  const [chains, setChains] = useState();
  const fetchChains = async () => {
    try {
      const chains = await fetcher("https://chainid.network/chains.json");
      setChains(chains.splice(1, 32));
    } catch (error) {}
  };
  useEffect(() => {
    fetchChains();
  }, []);
  return (
    <div className="wallet-list">
      {chains ? (
        chains.map((chain) => (
          <Chain
            isConnected={isConnected}
            setIsConnected={setIsConnected}
            chain={chain}
            setAccountAddress={setAccountAddress}
            accountAddress={accountAddress}
          />
        ))
      ) : (
        <>There is occured an error when fetch data</>
      )}
    </div>
  );
}
