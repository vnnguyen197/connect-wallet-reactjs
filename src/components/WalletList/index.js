import React, { useEffect, useState } from "react";
import fetcher from "../../utils/fetcher";
import Chain from "../Chain";
import "./style.css";
export default function WalletList({
  isConnected,
  setIsConnected,
  setAccountAddress,
  accountAddress,
  connectWallet
}) {
  const [chains, setChains] = useState();
  const fetchChains = async () => {
    try {
      const chains = await fetcher("https://chainid.network/chains.json");
      
      setChains(chains.splice(0, 32));
    } catch (error) {}
  };
  useEffect(() => {
    fetchChains();
  }, []);
  console.log(chains)
  return (
    <div className="wallet-list">
      {chains ? (
        chains.map((chain) => (
          <Chain
          connectWallet={connectWallet}
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
