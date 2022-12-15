import React from "react";
import Chain from "../Chain";
import "./style.css";
import { connectToNetworks } from "../../constants/networks";
export default function WalletList({
  isConnected,
  setIsConnected,
  setAccountAddress,
  accountAddress,
  connectWallet,
  currentChain
}) {

  
  return (
    <div className="wallet-list">
      {connectToNetworks ? (
        connectToNetworks.map((chain) => {if(!chain.hide){
          return (
            <Chain
              connectWallet={connectWallet}
              isConnected={isConnected}
              setIsConnected={setIsConnected}
              chain={chain}
              setAccountAddress={setAccountAddress}
              accountAddress={accountAddress}
              disabled={currentChain===chain.name}
            />
          )
        }})
      ) : (
        <>There is occured an error when fetch data</>
      )}
    </div>
  );
}
