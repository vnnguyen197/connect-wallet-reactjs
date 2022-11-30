import { networks } from "../constants/networks";
import toHex from "./toHex";

const { ethereum } = window

const changeNetwork = async (networkName, setError) => {
  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: networks[networkName]?.chainId }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      addNetwork(networkName)
    }
  }
};

const addNetwork = async(chain)=>{
  const params = {
    chainId: toHex(chain.chainId), 
    chainName: chain.name,
    nativeCurrency: {
      name: chain.nativeCurrency.name,
      symbol: chain.nativeCurrency.symbol, 
      decimals: chain.nativeCurrency.decimals,
    },
    rpcUrls: chain.rpc,
    blockExplorerUrls: [
      chain.explorers && chain.explorers.length > 0 && chain.explorers[0].url
        ? chain.explorers[0].url
        : chain.infoURL,
    ],
  };
  try {
    await ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [params],
    });
  } catch (error) {
  }
}

export {
  changeNetwork,
  addNetwork
}
