import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgress from "@mui/material/LinearProgress";
import { authenticateUser, registerUser } from "../rest/UserService";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loginModalOpen, setLoginModalOpen] = React.useState(false);
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);
  const [showSpinner, setShowSpinner] = React.useState(false);
  const [username, setUsername] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const navigate = useNavigate();

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarOpen(false);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginLogout = () => {
    if (!localStorage.getItem("token")) {
      setShowSpinner(true);
      const userLoginRequest = {
        username: username,
        password: password,
      };
      authenticateUser(userLoginRequest).then((response) => {
        localStorage.setItem("token", `Bearer ${response.data.token}`);
        localStorage.setItem("username", username);
        setLoginModalOpen(false);
        setShowSpinner(false);
      });
    }
  };

  const handleusernameFieldChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordFieldChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailFieldChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRegisterModalClose = () => {
    setRegisterModalOpen(false);
  };

  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    handleClose();
  };

  const handleMySelectionsClick = () => {
    handleClose();
    navigate(`/saved-selections/${localStorage.getItem("username")}`);
  };

  const handleUserRegister = () => {
    let userObject = {
      username: username,
      password: password,
      email: email,
    };
    registerUser(userObject).then(() => {
      setSnackBarOpen(true)
      setUsername(null);
      setPassword(null);
      setShowSpinner(false);
      setRegisterModalOpen(false);
    });
  };
  return (
    <div>
      {/* <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button> */}

      <IconButton size="large" onClick={handleClick}>
        <PersonIcon fontSize="inherit" />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {localStorage.getItem("token") && (
          <MenuItem onClick={handleMySelectionsClick}>
            SAVED SELECTIONS
          </MenuItem>
        )}
        {localStorage.getItem("token") && (
          <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
        )}
        {!localStorage.getItem("token") && (
          <MenuItem onClick={() => setLoginModalOpen(true)}>LOGIN</MenuItem>
        )}
        {!localStorage.getItem("token") && (
          <MenuItem onClick={() => setRegisterModalOpen(true)}>
            REGISTER
          </MenuItem>
        )}
      </Menu>

      <Dialog
        open={loginModalOpen}
        aria-labelledby="form-dialog-title"
        onClose={handleLoginModalClose}
      >
        <DialogTitle id="form-dialog-title">Login!</DialogTitle>
        <DialogContent>
          {showSpinner && <LinearProgress />}
          <DialogContentText>Enter username and password!</DialogContentText>
          <TextField
            onChange={handleusernameFieldChange}
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="name"
            fullWidth
            variant="outlined"
          />
          <TextField
            onChange={handlePasswordFieldChange}
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button> */}
          <Button
            onClick={handleLoginLogout}
            color="primary"
            variant="outlined"
            disabled={
              username === null ||
              username === "" ||
              password === null ||
              password === ""
            }
          >
            LOGIN
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={registerModalOpen}
        aria-labelledby="form-dialog-title"
        onClose={handleRegisterModalClose}
      >
        <DialogTitle id="form-dialog-title">Register!</DialogTitle>
        <DialogContent>
          {showSpinner && <LinearProgress />}
          <DialogContentText>Enter Details!</DialogContentText>
          <TextField
            onChange={handleusernameFieldChange}
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="name"
            fullWidth
            variant="outlined"
          />
          <TextField
            onChange={handlePasswordFieldChange}
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
          />
          <TextField
            onChange={handleEmailFieldChange}
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button> */}
          <Button
            onClick={handleUserRegister}
            color="primary"
            variant="outlined"
            disabled={
              username === null ||
              username === "" ||
              password === null ||
              password === "" ||
              email === null ||
              email === ""
            }
          >
            REGISTER
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          User registered successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}
