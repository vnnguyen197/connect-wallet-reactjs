import { Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  addTokenFunction,
  getTokenBalance,
} from "../../../utils/ethereumMethods";
import * as Web3 from "web3";
import useLocalStorage from "../../../hooks/useLocalStorage";

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
    name: "Wrapped Ether",
    token: "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
    symbol: "WETH",
  },
  {
    name: "Zeta",
    token: "0xcc7bb2d219a0fc08033e130629c2b854b7ba9195",
    symbol: "Zeta",
  },
  {
    name: "UNISWAP",
    token: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    symbol: "UNI",
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
  const [tokens, setTokens] = useState();
  const [storedValue, setValue] = useLocalStorage("login");
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
    if (sender) {
      const newList = tokenList.map(async (x) => ({
        ...x,
        balance: await getTokenBalance(sender, x.token),
      }));
      Promise.all(newList).then((values) => {
        setTokens(values);
      }).catch(setTokens());
    }
  }, [ sender, currentChain]);
  useEffect(() => {
 
  }, [tokens]);
  return (
    <div>
      <div
        style={{
          background: "#CECECE",
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
          <Typography>Tokens:</Typography>
          {sender &&
            tokens &&
            tokens.map((x, index) => {
              return (
                <Stack key={index} ml={2} mt={1}>
                  <Typography sx={{ fontSize: 11 }}>Token: {x.name}</Typography>
                  <Typography sx={{ fontSize: 11 }}>
                    Token Address: {x.token.slice(0, 3)}...
                    {x.token.slice(-3)}
                  </Typography>
                  <Typography sx={{ fontSize: 11 }}>
                    {(+x.balance).toFixed(5)} {x.symbol}
                  </Typography>
                </Stack>
              );
            })}
        </Stack>
      </div>
      <div
        style={{
          background: "#CECECE",
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
