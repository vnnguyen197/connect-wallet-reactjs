import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./styles.css";

const ConnectWallet = ({
  isConnected,
  setIsConnected,
  setAccountAddress,
  accountAddress,
}) => {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const { ethereum } = window;
  const checkMetamaskAvailability = async () => {
    if (!ethereum) {
      sethaveMetamask(false);
    }
    sethaveMetamask(true);
  };
  console.log(ethereum)
  const connectWallet = async (chainId) => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }
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
  const handleChangeNetwork = () => {
    connectWallet();
  };

  const handleChangeAccount = () => {
    connectWallet();
  };

  const setListener = () => {
    ethereum.on("chainChanged", handleChangeNetwork);
    ethereum.on("accountsChanged", handleChangeAccount);
  };

  const removeListener = () => {
    ethereum.removeListener("chainChanged", connectWallet);
    ethereum.removeListener("accountsChanged", connectWallet);
  };

  useEffect(() => {
    checkMetamaskAvailability();
    setListener();
    return () => removeListener;
  }, []);

  return (
    <>
      {haveMetamask ? (
        <>
          {isConnected ? (
            <button className="btn">
              {accountAddress.slice(0, 4)}...
              {accountAddress.slice(38, 42)}
            </button>
          ) : (
            <button className="btn" onClick={connectWallet}>
              Connect Wallet
            </button>
          )}
        </>
      ) : (
        <p>Please Install MataMask</p>
      )}
    </>
  );
};

export default ConnectWallet;
