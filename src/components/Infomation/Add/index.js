import { Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { addTokenFunction } from "../../../utils/ethereumMethods";
import { ethers } from "ethers";
import * as Web3 from 'web3'

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

export default function AddToken({ currentChain, currentBlance }) {
  const { ethereum } = window;
  const [tokenAddress, setTokenAddress] = useState("");

  const [token, setToken] = useState(null);
  const getToken = async (e) => {
    setTokenAddress(e);
    
    try {
      const web3 = new Web3("https://cloudflare-eth.com/");
      const contract = new web3.eth.Contract(ABI, '0x8c75F05B81df7A8f026D124A2Fe630ddDFc120e9');
      const [name, symbol, decimals] = await Promise.all([
        contract.methods.name().call(),
        contract.methods.symbol().call(),
        contract.methods.decimals().call(),
      ]);
      setToken({ name, symbol, decimals });
      console.log("name", name);
      console.log("symbol", symbol);
      console.log("decimals", decimals);
    } catch (error) {
      console.log(error);
      setToken(false);
    }
  };
  console.log(token);


  return (
    <div >
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
          <Typography>{currentBlance}</Typography>
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
          <Stack>
            <Button
              style={{ marginTop: 20 }}
              variant="outlined"
              // onClick={addToken}
              onClick={() => addTokenFunction(tokenAddress)}
            >
              Add your token
            </Button>
          </Stack>
        </Stack>
      </div>
    </div>
  );
}
