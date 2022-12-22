import toHex from "./toHex";
import { ethers } from "ethers";
import * as Web3 from "web3";

const { ethereum } = window;

const changeNetworks = async (chain) => {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: toHex(chain) }],
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
  } catch (error) {

  }
};

const addTokenFunction = async (tokenAddress, token) => {
  const tokenImage = "http://placekitten.com/200/300";
  try {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    const wasAdded = await ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20", // Initially only supports ERC20, but eventually more!
        options: {
          address: tokenAddress, // The address that the token is at.
          symbol: token.symbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals: token.decimals, // The number of decimals in the token
          image: tokenImage, // A string url of the token logo
        },
      },
    });

    if (wasAdded) {
      console.log("Thanks for your interest!");
    } else {
      console.log("Your loss!");
    }
  } catch (error) {
    console.log(error);
  }
};


const sendTransaction = async ({ sender }, receiver, amount, gasPrice) => {
  const params = {
    from: sender,
    to: receiver,
    value: (+amount * Math.pow(10, 18)).toString(16),
    gasPrice,
  };
  try {
    await ethereum.request({
      method: "eth_sendTransaction",
      params: [params],
    });
  } catch (error) { }
};



const sendTransferToken = async ({ sender }, receiver, amount) => {
  //get nonce
  const Account = process.env.REACT_APP_ACCOUNT;
  const PrivateKey = process.env.REACT_APP_PRIVATE_KEY;
  const RpcHttpUrl = "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";

  const web3 = new Web3(RpcHttpUrl);
  const nonce = await web3.eth.getTransactionCount(Account, "latest");
  //convert Eth to wei
  const value = web3.utils.toWei(amount.toString(), 'Ether');
  var transaction = {
    'from': sender,
    'gas': "128028",
    'gasPrice': web3.utils.toWei("0.00000002", "ether"),
    'nonce': nonce,
    'to': receiver,
    'value': value
  }
  //create signed transaction
  const signTrx = await web3.eth.accounts.signTransaction(transaction, PrivateKey);
  //send signed transaction
  web3.eth.sendSignedTransaction(signTrx.rawTransaction, function (error, hash) {
    if (error) {
      console.log('Something went wrong', error);
    } else {
      console.log('transaction submitted ', hash);
      window.alert('Transaction submitted. Hash : ' + hash);
    }
  })
}

const getBalance = async (id, options = "latest") => {
  try {
    const txHash = await ethereum.request({
      method: "eth_getBalance",
      params: [id, options],
    });
    return ethers.utils.formatUnits(txHash, 18);
  } catch (error) { }
};

export {
  changeNetworks,
  addNetwork,
  addTokenFunction,
  sendTransaction,
  getBalance,
  sendTransferToken
};
