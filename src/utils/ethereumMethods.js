import toHex from "./toHex";
import { BigNumber, ethers } from "ethers";
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
  } catch (error) {}
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

const sendETH = async ({ sender }, receiver, amount, gasPrice) => {
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
  } catch (error) {}
};

const contractAbi = JSON.parse(
  '[{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint256","name":"initialBalance_","type":"uint256"},{"internalType":"address payable","name":"feeReceiver_","type":"address"}],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"generator","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]'
);
//create web3 connection
// const tokenAddress = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";

const web3 = new Web3(ethereum);

const sendToken = async (sender, tokenAddress, receiver, amount, callback) => {
  const contract = new web3.eth.Contract(contractAbi, tokenAddress);

  const tokenBalance = await contract.methods.balanceOf(sender).call();
  const decimals = await contract.methods.decimals().call();
  const amountSent = BigNumber.from(amount * Math.pow(10, decimals)).toNumber();
  if (Number(tokenBalance) < Number(amountSent)) {
    console.log("Insufficient balance!");
    return;
  }

  const [txCount, data, gasPrice] = await Promise.all([
    web3.eth.getTransactionCount(sender),
    contract.methods.transfer(receiver, amountSent).encodeABI(),
    web3.eth.getGasPrice(),
  ]);

  let gas = await web3.eth.estimateGas({
    from: sender,
    to: tokenAddress,
    nonce: txCount,
    data,
  });
  // estimate gas limit before send (prevent out of gas)
  gas += parseInt(`${(10 * gas) / 100}`, 10);

  web3.eth
    .sendTransaction({
      from: sender,
      to: tokenAddress,
      gasPrice: web3.utils.toHex(gasPrice),
      gas: web3.utils.toHex(gas),
      nonce: txCount,
      data,
      value: web3.utils.toHex(0),
    })
    .on("transactionHash", function(hash) {
      // callback('transactionHash', hash);
    })
    .on("receipt", function(receipt) {
      // callback('receipt', receipt);
    })
    .on("confirmation", function(confirmationNumber, receipt) {
      // callback('receipt', receipt);
    })
    .on("error", function(error) {
      console.log("Deposit failed! Please try again!", error);
      // callback('error', error);
    }); // If a out of gas error, the second parameter is the receipt.;
};

const getTokenBalance = async (sender, add) => {
  const web3 = new Web3(ethereum);
  const contract = new web3.eth.Contract(
    [
      // balanceOf
      {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function",
      },
      // decimals
      {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [{ name: "", type: "uint8" }],
        type: "function",
      },
    ],
    add
  );
  // Execute balanceOf() to retrieve the token balance
  const result = await contract.methods.balanceOf(sender).call(); // 29803630997051883414242659
  // Convert the value from Wei to Ether
  const formattedResult = web3.utils.fromWei(result, "ether"); // 29803630.997051883414242659
  return formattedResult
};

const getBalance = async (id, options = "latest") => {
  try {
    const txHash = await ethereum.request({
      method: "eth_getBalance",
      params: [id, options],
    });
    return ethers.utils.formatUnits(txHash, 18);
  } catch (error) {}
};

export {
  changeNetworks,
  addNetwork,
  addTokenFunction,
  sendETH,
  getBalance,
  sendToken,
  getTokenBalance
};
