import { Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { addTokenFunction } from "../../../utils/ethereumMethods";
import * as Web3 from "web3";
import { getAddressesBalances } from "eth-balance-checker/lib/ethers";
import * as Ethers from "ethers";
const ABI = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    type: "function",
  },
];
const tokenList = [
  {
    name: "Binance USD",
    token: "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
    symbol: "BUSD",
  },
  {
    name: "Matic Token",
    token: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    symbol: "MATIC",
  },
  {
    name: "SHIBA INU",
    token: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
    symbol: "SHIB",
  },
];
export default function AddToken({
  sender,
  currentChain,
  currentBlance,
  symbol,
}) {
  const [tokenAddress, setTokenAddress] = useState("");
  const [token, setToken] = useState({ name: "", symbol: "", decimals: "" });
  const [three, setThree] = useState();
  const ethers = Ethers.getDefaultProvider();
  const getToken = async (e) => {
    setTokenAddress(e);
    try {
      const web3 = new Web3("https://cloudflare-eth.com/");
      const contract = new web3.eth.Contract(ABI, e);
      const [name, symbol, decimals] = await Promise.all([
        contract.methods.name().call(),
        contract.methods.symbol().call(),
        contract.methods.decimals().call(),
      ]);
      setToken({ name, symbol, decimals });
    } catch (error) {
      setToken({
        name: "",
        symbol: "",
        decimals: "",
      });
    }
  };
  useEffect(() => {
    if (!three) {
      getAddressesBalances(
        ethers,
        [sender],
        tokenList.map((x) => x.token)
      ).then((balances) => {
        setThree(balances[sender]);
        console.log(balances);
      });
    }
  }, [ethers]);
  return (
    <div>
      <div
        style={{
          background: "#cecece",
          padding: 30,
          borderRadius: 10,
        }}
      >
        <Stack mt={0}>
          <Typography>Current Networks:</Typography>
          <Typography>{currentChain}</Typography>
        </Stack>
        <Stack mt={1}>
          <Typography>Current Balance:</Typography>
          <Typography>
            {currentBlance} {symbol}
          </Typography>
        </Stack>
        <Stack mt={1}>
          <Typography>3 Random Token Balance:</Typography>
          {three &&
            tokenList.map((x, index) => (
              <Stack key={index} ml={2} mt={1}>
                <Typography sx={{ fontSize: 11 }}>
                  Token Address: {tokenList[index].token.slice(0, 3)}...
                  {tokenList[index].token.slice(-3)}
                </Typography>
                <Typography sx={{ fontSize: 11 }}>
                  {three[tokenList[index].token]} {tokenList[index].symbol}
                </Typography>
              </Stack>
            ))}
        </Stack>
      </div>
      <div
        style={{
          background: "#cecece",
          padding: 30,
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <Stack mt={3}>
          <Typography>
            <strong style={{ fontSize: "18px" }}>ADD TOKEN YOUR WALLET</strong>
          </Typography>
          <TextField
            style={{ marginTop: 5 }}
            id="standard-basic"
            label="Token contract address"
            variant="standard"
            value={tokenAddress}
            onChange={(e) => getToken(e.target.value)}
          />
          <TextField
            style={{ marginTop: 5 }}
            id="standard-basic"
            label="Decimals"
            variant="standard"
            value={token.decimals}
            disabled
          />
          <TextField
            style={{ marginTop: 5 }}
            id="standard-basic"
            label="Symbols"
            variant="standard"
            value={token.symbol}
            disabled
          />
          <Stack>
            <Button
              style={{ marginTop: 20 }}
              variant="outlined"
              // onClick={addToken}
              onClick={() => addTokenFunction(tokenAddress, token)}
            >
              Add your token
            </Button>
          </Stack>
        </Stack>
      </div>
    </div>
  );
}
