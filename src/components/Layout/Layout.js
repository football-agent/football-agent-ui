import React from "react";
import "./Layout.css";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PlaceIcon from "@mui/icons-material/Place";
import icon from "../../Images/fb-icon.png";

const Layout = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  function toggleDrawer() {
    setDrawerOpen(!drawerOpen);
  }

  const list = () => {
    return (
      <List style={{ backgroundImage: "#f2f2f2" }}>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <ListItem button onClick={() => toggleDrawer()}>
            <ListItemIcon>
              <PlaceIcon />
            </ListItemIcon>
            <ListItemText primary={"Option"} />
          </ListItem>
        </Link>
      </List>
    );
  };
  return (
    <div>
      <AppBar position="sticky" style={{ background: "white" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => toggleDrawer()}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <img src={icon} width={50} height={50}></img>
          <div style={{ marginLeft: "20px", display: "flex", flexDirection: "column" }}>
            <Typography
              style={{
                flexGrow: 1,
                color: "#455d58",
                fontFamily: "MyFont",
                textAlign: "center",
                fontSize: "1.2rem",
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
                fontSize: "1.2rem",
              }}
            >
              PREDICTOR
            </Typography>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer anchor={"left"} open={drawerOpen} onClose={() => toggleDrawer()}>
        {list()}
      </Drawer>
    </div>
  );
};

export default Layout;
