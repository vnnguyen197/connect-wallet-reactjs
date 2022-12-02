import { Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { addTokenFunction, sendTransaction } from "../../utils/ethereumMethods";

export default function Infomation({ currentChain, sender }) {
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenDecimals, setTokenDecimals] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [gasPrice, setGasPrice] = useState("");
  return (
    <div style={{ position: "relative", marginLeft: 20 }}>
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
          <Typography>Add token your wallet</Typography>
          <TextField
            style={{ marginTop: 10 }}
            id="standard-basic"
            label="Token contract address"
            variant="standard"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
          />
          <TextField
            style={{ marginTop: 5 }}
            id="standard-basic"
            label="Token symbol"
            variant="standard"
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.target.value)}
          />
          <TextField
            style={{ marginTop: 5 }}
            id="standard-basic"
            label="Token decimals"
            variant="standard"
            value={tokenDecimals}
            onChange={(e) => setTokenDecimals(e.target.value)}
          />
          <Stack>
            <Button
              style={{ marginTop: 20 }}
              variant="outlined"
              onClick={() =>
                addTokenFunction(tokenAddress, tokenSymbol, tokenDecimals)
              }
            >
              Add your token
            </Button>
          </Stack>
        </Stack>
      </div>
      <div
        style={{
          background: "#cecece",
          padding: 30,
          borderRadius: 10,
          marginTop: 20
        }}
      >
        <Stack>
          <Typography>Send ETH payment</Typography>
          <TextField
            style={{ marginTop: 10 }}
            id="standard-basic"
            label="Receiver"
            variant="standard"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />
          <TextField
            style={{ marginTop: 5 }}
            id="standard-basic"
            label="Amount"
            variant="standard"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
           <TextField
            style={{ marginTop: 5 }}
            id="standard-basic"
            label="Gas Price"
            variant="standard"
            value={gasPrice}
            onChange={(e) => setGasPrice(e.target.value)}
          />
          <Button
            style={{ marginTop: 20 }}
            variant="outlined"
            onClick={() => sendTransaction(sender, receiver, amount, gasPrice)}
          >
            Send
          </Button>
        </Stack>
      </div>
    </div>
  );
}
