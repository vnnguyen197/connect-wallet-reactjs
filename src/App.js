import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import AddToken from "./components/Infomation/Add";
import SendToken from "./components/Infomation/Send";
import WalletList from "./components/WalletList";
import { connectToNetworks } from "./constants/networks";
import { getBalance } from "./utils/ethereumMethods";
import toId from "./utils/toId";

function App() {
  const { ethereum } = window;
  const [isConnected, setIsConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState("");
  const [currentChain, setCurrentChain] = useState();
  const [currentBlance, setCurrentBalance] = useState();
  const [symbol, setSymbol] = useState()
  const connectWallet = async (chainId) => {
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if(!currentChain){
        covertChainIdToName(ethereum?.chainId)
      }
      getBalance(accounts[0]).then((data) => setCurrentBalance(data));
      if (setAccountAddress) {
        setAccountAddress(accounts[0]);
      }
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

  const covertChainIdToName = async(chainId)=>{
    const network = connectToNetworks.filter(
      (x) => x.chainId === toId(chainId)
    );
    setTimeout(() => {
      setCurrentChain(network?.[0]?.name);
      setSymbol(network?.[0].nativeCurrency.symbol)
    }, 0);
  }

  const handleChangeNetwork = async (chainId) => {
    await covertChainIdToName(chainId)
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
    <div className="App" style={{ backgroundColor: "beige", marginBottom:-20 }}>
      <Header
        accountAddress={accountAddress}
        setAccountAddress={setAccountAddress}
        isConnected={isConnected}
        setIsConnected={setIsConnected}
        connectWallet={connectWallet}
        currentChain={currentChain}
      />
      <div className="content">
        <div className="contentLeft">
          <AddToken sender={accountAddress} symbol={symbol} currentBlance={currentBlance} currentChain={currentChain} />
          <SendToken sender={accountAddress} currentChain={currentChain} />
        </div>
        <div className="contentRight"> 
        <WalletList
          accountAddress={accountAddress}
          setAccountAddress={setAccountAddress}
          isConnected={isConnected}
          setIsConnected={setIsConnected}
          connectWallet={connectWallet}
          currentChain={currentChain}
        />
        </div>
      </div>
    </div>
  );
}

export default App;
