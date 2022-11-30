import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./style.css";
import ConnectWallet from "../ConnectWallet";

export default function Header({
  isConnected,
  setIsConnected,
  setAccountAddress,
  accountAddress,
}) {
  return (
    <div className="header">
      <div className="search">
        <input placeholder="Search" />
        <SearchIcon />
      </div>
      <div className="connect">
        <ConnectWallet
          setAccountAddress={setAccountAddress}
          accountAddress={accountAddress}
          isConnected={isConnected}
          setIsConnected={setIsConnected}
        />
      </div>
    </div>
  );
}
