import { useState } from "react";
import "./App.css";
import ConnectWallet from "./components/ConnectWallet";
import Header from "./components/Header";
import WalletList from "./components/WalletList";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState("");
  console.log(accountAddress)
  return (
    <div className="App">
      <Header
        accountAddress={accountAddress}
        setAccountAddress={setAccountAddress}
        isConnected={isConnected}
        setIsConnected={setIsConnected}
      />
      <WalletList
        accountAddress={accountAddress}
        setAccountAddress={setAccountAddress}
        isConnected={isConnected}
        setIsConnected={setIsConnected}
      />
    </div>
  );
}

export default App;
