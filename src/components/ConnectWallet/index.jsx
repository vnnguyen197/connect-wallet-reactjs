import { useState, useEffect } from "react";
import toId from "../../utils/toId";
import "./styles.css";

const ConnectWallet = ({ isConnected, accountAddress, connectWallet }) => {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [clicked, setClicked] = useState(false);
  const { ethereum } = window;
  const checkMetamaskAvailability = async () => {
    if (!ethereum) {
      sethaveMetamask(false);
    }
    sethaveMetamask(true);
  };
  const logOut = async () => {
    window.ethereum.request({
      method: "eth_requestAccounts",
      params: [
        {
          eth_accounts: {}
        }
      ]
    });
  };
  useEffect(() => {
    checkMetamaskAvailability();
  }, []);
  console.log(haveMetamask);
  return (
    <>
      {haveMetamask ? (
        <>
          {isConnected ? (
            <button
              onClick={() => setClicked(!clicked)}
              style={{
                position: "relative",
              }}
              className="btn"
            >
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
