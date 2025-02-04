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
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { yellow } from "@mui/material/colors";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,

    position: "relative",
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginRight: 0,
        },
      },
    ],
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  backgroundImage:
    "linear-gradient(to right, lightpink,#e6b3e0,#d1acdb,lightblue)",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function PersistentDrawerRight({ changePage }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            sx={{ flexGrow: 1, color: "purple", fontWeight: "bold" }}
            component="div"
          >
            <img
              src="caution2.webp"
              style={{
                height: "20px",
                width: "20px",

                marginRight: "10px",
              }}
            />
            Road Safety
          </Typography>
          <IconButton
            /*  color="inherit"*/
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={[open && { display: "none" }]}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}></Main>
      <Drawer
        sx={{
          width: drawerWidth,
          backgroundColor: "rgba(0,0,255,0.5)",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            color: "white",
            backgroundImage: "linear-gradient(to right, #f4b8da, #d2afff)",
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
        <List>
          {["Home", "Prediction", "News", "Profile"].map((text, index) => (
            <Link to={`/${text.toLowerCase()}`}>
              {" "}
              <ListItem
                key={text}
                disablePadding
                onClick={() => changePage(text)}
              >
                <ListItemButton>
                  <ListItemIcon sx={{ color: "black" }}>
                    {index === 0 ? (
                      <HomeIcon />
                    ) : index === 1 ? (
                      <OnlinePredictionIcon />
                    ) : index === 2 ? (
                      <HistoryEduIcon />
                    ) : (
                      <PersonSearchIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ color: "black" }} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {["Map", "Contact"].map((text, index) => (
            <Link to={`/${text.toLowerCase()}`}>
              <ListItem
                key={text}
                disablePadding
                onClick={() => changePage(text)}
              >
                <ListItemButton>
                  <ListItemIcon sx={{ color: "black" }}>
                    {index === 0 ? <AddLocationIcon /> : <ContactMailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ color: "black" }} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
