import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./style.css";
import ConnectWallet from "../ConnectWallet";
import SwitchNetwork from "../SwitchNetwork";
import Container from "../Container";

export default function Header({
  isConnected,
  setIsConnected,
  setAccountAddress,
  accountAddress,
  connectWallet,
  currentChain,
}) {
  return (
    <div className="header">
      <Container>
        {/* <div className="search">
        <input placeholder="Search" />
        <SearchIcon />
      </div> */}
        <div style={{
          display:"flex",
          width: '100%',
          position: "relative",
          

        }}>
          <div className="switch">
            {isConnected && <SwitchNetwork currentChain={currentChain} />}
          </div>
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
      </Container>
    </div>
  );
}
