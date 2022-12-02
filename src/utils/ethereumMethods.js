import iconSrc from "./icon";
import toHex from "./toHex";

const { ethereum } = window;

const changeNetwork = async (chain) => {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: toHex(chain.chainId) }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      addNetwork(chain);
    }
  }
};

const addNetwork = async (chain) => {
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
      method: "wallet_addEthereumChain",
      params: [params],
    });
  } catch (error) {}
};

const addTokenFunction = async (tokenAddress, tokenSymbol, tokenDecimals) => {
  const tokenImage = iconSrc(null);
  try {
    const wasAdded = await ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: tokenImage,
        },
      },
    });

    if (wasAdded) {
      console.log("Thanks for your interest!");
    } else {
      console.log("HelloWorld Coin has not been added");
    }
  } catch (error) {
    console.log(error);
  }
};

const sendTransaction = async (sender, receiver, amount, gasPrice) => {
  const params = {
    from: sender,
    to: receiver,
    value: (+amount*Math.pow(10,18)).toString(16),
    gasPrice
  }
  try {
    const txHash = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [params],
    });
  } catch (error) {
    
  }
}

export { changeNetwork, addNetwork, addTokenFunction, sendTransaction };
