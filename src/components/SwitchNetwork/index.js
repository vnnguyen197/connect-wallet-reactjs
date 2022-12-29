import { useEffect, useState } from "react";
import "./style.css";
import { changeNetworks } from "../../utils/ethereumMethods";
const networks = {
  polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com/"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  bsc: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: [
      "https://bsc-dataseed1.binance.org",
      "https://bsc-dataseed2.binance.org",
      "https://bsc-dataseed3.binance.org",
      "https://bsc-dataseed4.binance.org",
      "https://bsc-dataseed1.defibit.io",
      "https://bsc-dataseed2.defibit.io",
      "https://bsc-dataseed3.defibit.io",
      "https://bsc-dataseed4.defibit.io",
      "https://bsc-dataseed1.ninicoin.io",
      "https://bsc-dataseed2.ninicoin.io",
      "https://bsc-dataseed3.ninicoin.io",
      "https://bsc-dataseed4.ninicoin.io",
      "wss://bsc-ws-node.nariox.org",
    ],
    blockExplorerUrls: ["https://bscscan.com"],
  },
};

const changeNetwork = async ({ networkName, setError }) => {
  console.log("networkName", networkName);
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName],
        },
      ],
    });
  } catch (err) {
    setError(err.message);
  }
};

const SwitchNetwork = ({ currentChain }) => {
  const [show, setShow] = useState(false);
  const handleNetworkSwitch = async (networkName) => {
    await changeNetwork({ networkName });
  };

  const networkChanged = (chainId) => {
    console.log({ chainId });
  };

  useEffect(() => {
    window.ethereum.on("chainChanged", networkChanged);

    return () => {
      window.ethereum.removeListener("chainChanged", networkChanged);
    };
  }, []);
  const handleDisabledButton = () => {
    switch (currentChain) {
      case "Binance Smart Chain Mainnet":
        return 2;
      case "Polygon Mainnet":
        return 1;
      case "Goerli":
        return 3;
      default:
        return null;
    }
  };
  return (
    <div className="network">
      <div style={{
        display: 'flex',
        marginTop: 'auto',
      }} onClick={() => setShow(!show)}>Change Network</div>
      {show && (
        <div style={{
          position: 'absolute',
          top: 25,
          left: 0,
          background: '#f5f5dc',
          padding: '10px 10px',
          borderRadius: '20px',
          zIndex: 2000
        }}>
          <button
            className="button"
            disabled={handleDisabledButton() === 1}
            onClick={() => handleNetworkSwitch("polygon")}
          >
            Switch to Polygon
          </button>
          <button
            className="button"
            disabled={handleDisabledButton() === 2}
            onClick={() => handleNetworkSwitch("bsc")}
          >
            Switch to BSC
          </button>
          <button
            className="button"
            disabled={handleDisabledButton() === 3}
            onClick={() => changeNetworks(5)}
          >
            Switch to Goerli
          </button>
        </div>
      )}
    </div>
  );
};

export default SwitchNetwork;
