import { Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { addTokenFunction } from "../../../utils/ethereumMethods";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";

// const ABI = [
//   {
//     constant: true,
//     inputs: [],
//     name: "name",
//     outputs: [
//       {
//         name: "",
//         type: "string",
//       },
//     ],
//     payable: false,
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: "decimals",
//     outputs: [
//       {
//         name: "",
//         type: "uint8",
//       },
//     ],
//     payable: false,
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: "symbol",
//     outputs: [
//       {
//         name: "",
//         type: "string",
//       },
//     ],
//     payable: false,
//     stateMutability: "view",
//     type: "function",
//   },
// ];

// const { ethereum } = window;

export default function AddToken({ currentChain }) {
  const [tokenAddress, setTokenAddress] = useState("");

  // const [token, setToken] = useState(null);
  // const getToken = async () => {
  //   try {
  //     // const web3 = new Web3("https://cloudflare-eth.com/");
  //     // const contract = new web3.eth.Contract(ABI, tokenAddress);
  //     const provider = await detectEthereumProvider();
  //     const contract = new ethers.Contract(tokenAddress, ABI, provider);
  //     const [name, symbol, decimals] = await Promise.all([
  //       contract.methods.name().call(),
  //       contract.methods.symbol().call(),
  //       contract.methods.decimals().call(),
  //     ]);
  //     setToken({ name, symbol, decimals });
  //     console.log("name", name);
  //     console.log("symbol", symbol);
  //     console.log("decimals", decimals);
  //   } catch {
  //     setToken(false);
  //   }
  // };

  // const addToken = async () => {
  //   try {
  //     const wasAdded = await ethereum.request({
  //       method: "wallet_watchAsset",
  //       params: {
  //         type: "ERC20",
  //         options: {
  //           address: token.tokenAddress,
  //           symbol: token.symbol,
  //           decimals: token.decimals,
  //         },
  //       },
  //     });
  //     if (wasAdded) {
  //       console.log("Thanks for your interest!");
  //     } else {
  //       console.log("Your loss!");
  //     }
  //   } catch (error) {
  //     console.log(error, "errrrr");
  //   }
  // };

  // useEffect(() => {
  //   getToken();
  // }, []);

  return (
    <div style={{ position: "relative", marginLeft: 20, marginBottom: 50 }}>
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
            onChange={(e) => setTokenAddress(e.target.value)}
          />
          <Stack>
            <Button
              style={{ marginTop: 20 }}
              variant="outlined"
              // onClick={addToken}
              onClick={()=> addTokenFunction(tokenAddress)}
            >
              Add your token
            </Button>
          </Stack>
        </Stack>
      </div>
    </div>
  );
}
