import { useState, useEffect } from "react";
// import toId from "../../utils/toId";
import Disconnect from "./Disconnect";
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

  useEffect(() => {
    checkMetamaskAvailability();
  }, []);

  return (
    <div className='containers'>
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
          {isConnected && <Disconnect />}
        </>
      ) : (
        <p>Please Install MataMask</p>
      )}
    </div>
  );
};

export default ConnectWallet;
