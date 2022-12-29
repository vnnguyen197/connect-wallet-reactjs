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
  connectWallet,
  disabled,
}) {
  const handleOnClick = () => {
    addNetwork(chain);
  };
  return (
    <Card
      sx={{
        minWidth: 248,
        maxWidth: 248,
        display: "flex",
        marginLeft: 2,
        marginBottom: 2,
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
          <img
            style={{ marginRight: 10 }}
            src={iconSrc(chain.icon)}
            width={20}
            height={20}
            alt=""
          />
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              fontWeight: 600,
            }}
            variant="h6"
          >
            {chain.name}
          </Typography>
        </Stack>
        <Stack mt={3} direction="row" justifyContent="center">
          <Stack>
            <Typography
              sx={{
                fontSize: 10,
              }}
            >
              ChainID:
            </Typography>
            <strong>{chain.chainId}</strong>
          </Stack>
          <Stack sx={{ marginLeft: 5 }}>
            <Typography sx={{ fontSize: 10 }}>Currency:</Typography>
            <strong>{chain.nativeCurrency?.symbol}</strong>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "auto",
          padding: 2,
        }}
      >
        {!isConnected ? (
          <ConnectWallet
            accountAddress={accountAddress}
            setAccountAddress={setAccountAddress}
            isConnected={isConnected}
            setIsConnected={setIsConnected}
            connectWallet={connectWallet}
          />
        ) : (
          <Button
            onClick={() => handleOnClick()}
            variant="outlined"
            disabled={disabled}
            startIcon={<AddIcon />}
          >
            Add network
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
