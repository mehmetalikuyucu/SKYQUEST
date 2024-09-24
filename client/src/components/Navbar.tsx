import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../router/hoooks/useAuthStore";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FlightIcon from "@mui/icons-material/Flight";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const navItems = [
    { to: "/", label: "Home", icon: HomeIcon },
    { to: "/dashboard", label: "Dashboard", icon: DashboardIcon },
    { to: "/my-flights", label: "My Flights", icon: FlightIcon },
  ];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#001F3F" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: "flex",
              fontWeight: 700,
              color: "#EAD8B1",
              textDecoration: "none",
              alignItems: "center",
              "&:hover": { color: "#6A9AB0" },
              transition: "color 0.3s",
            }}
          >
            <AirplanemodeActiveIcon sx={{ mr: 1 }} />
            SkyQuest
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {isMobile ? (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {navItems.map((item) => (
                  <MenuItem
                    key={item.to}
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={item.to}
                  >
                    <item.icon sx={{ mr: 1 }} />
                    <Typography textAlign="center">{item.label}</Typography>
                  </MenuItem>
                ))}
                {isAuthenticated ? (
                  <MenuItem
                    onClick={() => {
                      logout();
                      handleCloseNavMenu();
                    }}
                  >
                    <LogoutIcon sx={{ mr: 1 }} />
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                ) : (
                  <MenuItem
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to="/auth"
                  >
                    <LoginIcon sx={{ mr: 1 }} />
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                )}
              </Menu>
            </>
          ) : (
            <Box sx={{ display: "flex" }}>
              {navItems.map((item) => (
                <Button
                  key={item.to}
                  component={Link}
                  to={item.to}
                  startIcon={<item.icon />}
                  sx={{
                    my: 2,
                    color: "#EAD8B1",
                    display: "flex",
                    borderRadius: "4px",
                    textTransform: "none",
                    "&:hover": { bgcolor: "#3A6D8C", color: "white" },
                    ...(location.pathname === item.to && {
                      bgcolor: "#3A6D8C",
                      color: "white",
                    }),
                  }}
                >
                  {item.label}
                </Button>
              ))}
              {isAuthenticated ? (
                <Button
                  onClick={logout}
                  startIcon={<LogoutIcon />}
                  sx={{
                    my: 2,
                    color: "#EAD8B1",
                    display: "flex",
                    borderRadius: "4px",
                    textTransform: "none",
                    "&:hover": { bgcolor: "#3A6D8C", color: "white" },
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  component={Link}
                  to="/auth"
                  startIcon={<LoginIcon />}
                  sx={{
                    my: 2,
                    color: "#EAD8B1",
                    display: "flex",
                    borderRadius: "4px",
                    textTransform: "none",
                    "&:hover": { bgcolor: "#3A6D8C", color: "white" },
                  }}
                >
                  Login
                </Button>
              )}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
