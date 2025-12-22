import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Switch,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Rates", path: "/rates" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Blogs", path: "/blogs" },
  { label: "Contact", path: "/contact" },
];

const Header = ({ darkMode, onThemeToggle }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => setDrawerOpen(open);

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <IconButton sx={{ float: "right", m: 1 }} onClick={() => toggleDrawer(false)}>
        <CloseIcon />
      </IconButton>

      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.label}
            onClick={() => {
              navigate(item.path);
              toggleDrawer(false);
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 1 }} />

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 1 }}>
        <Typography variant="body2" sx={{ mr: 1 }}>
          Dark Mode
        </Typography>
        <Switch checked={darkMode} onChange={onThemeToggle} color="secondary" />
      </Box>
    </Box>
  );

  return (
    <AppBar position="fixed" color="transparent" elevation={4}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <img src={Logo} alt="Logo" style={{ height: 80, width: 110 }} />

        {/* Desktop Nav */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
          {navItems.map((item) => (
            <Button key={item.label} color="primary" onClick={() => navigate(item.path)}>
              {item.label}
            </Button>
          ))}

          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/reservation")}
          >
            Reserve Now
          </Button>

          <Switch checked={darkMode} onChange={onThemeToggle} color="secondary" />
        </Box>

        {/* Mobile Menu */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: "flex", md: "none" } }}
          onClick={() => toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;
