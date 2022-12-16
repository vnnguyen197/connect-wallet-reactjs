import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { sendTransaction } from "../../../utils/ethereumMethods";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ padding: 0 }}
    >
      {value === index && (
        <Box sx={{ p: 2 }} style={{ padding: 5 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SendToken({sender}) {
  const [value, setValue] = useState(0);
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [gasPrice, setGasPrice] = useState("");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
    style={{
      background: "#cecece",
      padding: 30,
      borderRadius: 10,
      marginTop: 20,
    }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Send ETH"
            {...a11yProps(0)}
            style={{ fontWeight: "bold" }}
          />
          <Tab
            label="Send Token"
            {...a11yProps(1)}
            style={{ fontWeight: "bold" }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {/* <div
          style={{
            background: "#cecece",
            padding: 30,
            borderRadius: 10,
          }}
        > */}
          <Stack>
            <TextField
              style={{ marginTop: 5 }}
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
              onClick={() =>
                sendTransaction(sender, receiver, amount, gasPrice)
              }
            >
              Send ETH
            </Button>
          </Stack>
        {/* </div> */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <div
          style={{
            background: "#cecece",
            padding: 30,
            borderRadius: 10,
          }}
        >
          <Stack>
            <TextField
              style={{ marginTop: 5 }}
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
              onClick={() =>
                sendTransaction(sender, receiver, amount, gasPrice)
              }
            >
              Send Token
            </Button>
          </Stack>
        </div> */}
        <main/>
      </TabPanel>
    </Box>
  );
}
