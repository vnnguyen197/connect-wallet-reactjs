import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import AddToken from "./components/Infomation/Add";
import SendToken from "./components/Infomation/Send";
import WalletList from "./components/WalletList";

function App() {
  const { ethereum } = window;
  const [isConnected, setIsConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState("");
  const [currentChain, setCurrentChain] = useState(ethereum?.chainId);

  const connectWallet = async (chainId) => {
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      if (setAccountAddress) {
        setAccountAddress(accounts[0]);
      }
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

  const handleChangeNetwork = (chainId) => {
    setCurrentChain(chainId);
    connectWallet();
  };

  const handleChangeAccount = (id) => {
    connectWallet();
  };

  const setListener = () => {
    ethereum.on("chainChanged", handleChangeNetwork);
    ethereum.on("accountsChanged", handleChangeAccount);
  };

  const removeListener = () => {
    ethereum.removeListener("chainChanged", handleChangeNetwork);
    ethereum.removeListener("accountsChanged", handleChangeAccount);
  };

  useEffect(() => {
    setListener();
    return () => removeListener;
  }, []);

  return (
    <div className="App" style={{ backgroundColor: "beige" }}>
      <Header
        accountAddress={accountAddress}
        setAccountAddress={setAccountAddress}
        isConnected={isConnected}
        setIsConnected={setIsConnected}
        connectWallet={connectWallet}
      />
      <div className="content">
        <div className="contentLeft">
          <AddToken sender={accountAddress} currentChain={currentChain} />
          <SendToken sender={accountAddress} currentChain={currentChain} />
        </div>
        <div className="contentRight"> 
        <WalletList
          accountAddress={accountAddress}
          setAccountAddress={setAccountAddress}
          isConnected={isConnected}
          setIsConnected={setIsConnected}
          connectWallet={connectWallet}
        />
        </div>
      </div>
    </div>
  );
}

export default App;
