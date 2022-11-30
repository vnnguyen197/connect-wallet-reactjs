import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import iconSrc from "../../utils/icon";
import AddIcon from "@mui/icons-material/Add";
import ConnectWallet from "../ConnectWallet";
import { addNetwork } from "../../utils/ethereumMethods";

export default function Chain({
  chain,
  isConnected,
  setIsConnected,
  accountAddress,
  setAccountAddress,
}) {
  const handleOnClick = () => {
    addNetwork(chain)
  };
  return (
    <Card
      sx={{
        minWidth: 275,
        maxWidth: 275,
        display: "flex",
        justifyContents: "center",
        alignItems: "space-between",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContents: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Stack direction={"row"} alignItems="center">
          {chain.icon && (
            <img
              style={{ marginRight: 5 }}
              src={iconSrc(chain.icon)}
              width={20}
              height={20}
              alt=""
            />
          )}
          <Typography variant="h6">{chain.name}</Typography>
        </Stack>
        <Stack mt={3} direction="row" justifyContent="center">
          <Stack>
            <Typography sx={{ fontSize: 10 }}>ChainID:</Typography>
            {chain.chainId}
          </Stack>
          <Stack sx={{ marginLeft: 5 }}>
            <Typography sx={{ fontSize: 10 }}>Currency:</Typography>
            {chain.nativeCurrency?.name}
          </Stack>
        </Stack>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignContent: "flex-end",
        }}
      >
        {!isConnected ? (
          <ConnectWallet
            accountAddress={accountAddress}
            setAccountAddress={setAccountAddress}
            isConnected={isConnected}
            setIsConnected={setIsConnected}
          />
        ) : (
          <Button
            onClick={() => handleOnClick()}
            variant="outlined"
            startIcon={<AddIcon />}
          >
            Add network
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
