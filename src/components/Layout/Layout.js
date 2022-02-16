import React from "react";
import "./Layout.css";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import icon from "../../Images/fb-icon.png";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "../ProfileMenu";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from '@mui/icons-material/Close';


const Layout = () => {
  const navigate = useNavigate();



  


  const handleInfoButtonClick = () => {
    navigate("/explain");
  };



 
  return (
    <div>
      {/* Change padding  */}
      <AppBar position="sticky" style={{ background: "white" }}>
        <Toolbar>
          
          <img src={icon} width={60} height={60}></img>
          <div
            onClick={() => navigate("/")}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Typography
              style={{
                flexGrow: 1,
                color: "#455d58",
                fontFamily: "MyFont",
                textAlign: "center",
                fontSize: "1.5rem",
              }}
            >
              THE
            </Typography>
            <Typography
              style={{
                flexGrow: 1,
                color: "#455d58",
                fontFamily: "MyFont",
                textAlign: "left",
                fontSize: "1.5rem",
              }}
            >
              PREDICTOR
            </Typography>
          </div>
          {/* <Button
            style={{
              backgroundColor: "#455d58",
              color: "white",
              position: "absolute",
              right: "20px",
            }}
            color="inherit"

            // onClick={handleBack}
          >
            Contact US
          </Button> */}
          <IconButton  aria-label="upload picture" onClick={handleInfoButtonClick} style={{position:'absolute', right: '80px'}}>
            <InfoIcon />
          </IconButton>

          <div style={{ position: "absolute", right: "20px" }}>
            <ProfileMenu />
          </div>
        </Toolbar>
      </AppBar>

      {/* <Drawer anchor={"left"} open={drawerOpen} onClose={() => toggleDrawer()}>
        {list()}
      </Drawer> */}


      
    </div>
  );
};

export default Layout;
