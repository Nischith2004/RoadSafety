// PersistentDrawerRight.jsx
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LogoutIcon from "@mui/icons-material/Logout";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { Link } from "react-router-dom";
import { supabase } from "./supabaseClient";

const drawerWidth = 240;

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
}));

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: "#3d405b",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function PersistentDrawerRight({ changePage, session }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            sx={{ flexGrow: 1, color: "white", fontWeight: "bold" }}
            component="div"
          >
            <img
              src="../src/assets/roadsafetylogo.webp"
              alt="Road Safety"
              style={{ height: "20px", width: "20px", marginRight: "10px" }}
            />
            Road Safety
          </Typography>
          <IconButton
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={open ? { display: "none" } : {}}
          >
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}></Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            color: "white",
            backgroundColor: " #8d8c86",
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ color: "black" }}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        {/* Main Navigation */}
        <List>
          {[
            { text: "Home", icon: <HomeIcon />, path: "/home" },
            {
              text: "Prediction",
              icon: <OnlinePredictionIcon />,
              path: "/prediction",
            },
            { text: "News", icon: <NewspaperIcon />, path: "/news" },
            // Updated the Profile route to "/profilepage"
            {
              text: "Profile",
              icon: <AccountCircleIcon />,
              path: "/profilepage",
            },
            { text: "Map", icon: <AddLocationAltIcon />, path: "/map" },
            { text: "Contact", icon: <ContactMailIcon />, path: "/contact" },
          ].map(({ text, icon, path }) => (
            <Link
              to={path}
              key={text}
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={() => changePage(text)}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>

        <Divider />

        {/* Authentication Links */}
        <List>
          {!session ? (
            <>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary="Login" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <AppRegistrationIcon />
                    </ListItemIcon>
                    <ListItemText primary="Signup" />
                  </ListItemButton>
                </ListItem>
              </Link>
            </>
          ) : (
            <ListItem disablePadding onClick={handleLogout}>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>
    </Box>
  );
}
