import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./style.css";
import ConnectWallet from "../ConnectWallet";
import SwitchNetwork from "../SwitchNetwork";

export default function Header({
  isConnected,
  setIsConnected,
  setAccountAddress,
  accountAddress,
  connectWallet,
  currentChain
}) {
  return (
    <div className="header">
      {/* <div className="search">
        <input placeholder="Search" />
        <SearchIcon />
      </div> */}
      <div className="switch">{isConnected && <SwitchNetwork  currentChain={currentChain}/>}</div>
      <div className="connect">
        <ConnectWallet
          connectWallet={connectWallet}
          setAccountAddress={setAccountAddress}
          accountAddress={accountAddress}
          isConnected={isConnected}
          setIsConnected={setIsConnected}
        />
      </div>
    </div>
  );
}
