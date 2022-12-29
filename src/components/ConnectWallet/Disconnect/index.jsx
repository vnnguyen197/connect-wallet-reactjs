import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./styles.css";
import useLocalStorage from "../../../hooks/useLocalStorage";

export default function Disconnect() {
  const [open, setOpen] = React.useState(false);
  const [_,setValue] = useLocalStorage("login");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const logout = () => {
    setValue(null)
    window.location.reload(false);
  };
  return (
    <div style={{marginLeft: 20}}>
      <Button
        variant="outlined"
        className="btn-logout"
        onClick={handleClickOpen}
      >
        Logout
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to logout?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={logout} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
