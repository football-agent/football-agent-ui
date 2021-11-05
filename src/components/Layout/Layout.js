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

const Layout = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  function toggleDrawer() {
    setDrawerOpen(!drawerOpen);
  }

  const list = () => {
    return (
      <List style={{ backgroundColor: "#f2f2f2" }}>
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
      <AppBar position="sticky" style={{ background: "#008080" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => toggleDrawer()}
          >
            <MenuIcon />
          </IconButton>
          <Typography style={{ flexGrow: 1 }} variant="h5">
            Football Agent
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor={"left"} open={drawerOpen} onClose={() => toggleDrawer()}>
        {list()}
      </Drawer>
    </div>
  );
};

export default Layout;
