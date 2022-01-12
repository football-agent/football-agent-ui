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
import LinearProgress from '@mui/material/LinearProgress';
import { authenticateUser } from "../rest/UserService";


export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loginModalOpen, setLoginModalOpen]= React.useState(false)
  const [showSpinner, setShowSpinner]= React.useState(false)
  const [username, setUsername]= React.useState(null)
  const [password, setPassword] = React.useState(null)

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginLogout = () => {
    if (!localStorage.getItem("token")) {
        setShowSpinner(true)
        const userLoginRequest = {
            username: username,
            password: password
        }
        authenticateUser(userLoginRequest).then(response=>{
            localStorage.setItem('token', `Bearer ${response.data.token}`)
            setLoginModalOpen(false)
            setShowSpinner(false)
        })
    }
  };

  const handleusernameFieldChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordFieldChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginModalClose=()=>{
      setLoginModalOpen(false)
  }

  const handleLogout=()=>{
      localStorage.removeItem('token')
      handleClose()
  }


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
          <MenuItem onClick={handleClose}>My Selections</MenuItem>
        )}
        {
            localStorage.getItem('token') && <MenuItem  onClick={handleLogout}>LOGOUT</MenuItem>
        }
        {
            !localStorage.getItem("token") &&  <MenuItem onClick={()=>setLoginModalOpen(true)}>LOGIN</MenuItem>
        }
          
      </Menu>

      <Dialog open={loginModalOpen} aria-labelledby="form-dialog-title" onClose={handleLoginModalClose}>
        <DialogTitle id="form-dialog-title">Login!</DialogTitle>
        <DialogContent>
          {showSpinner && <LinearProgress />}
          <DialogContentText>
            Enter username and password!
          </DialogContentText>
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
    </div>
  );
}
