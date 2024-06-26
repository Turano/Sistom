import {
  Typography,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  Container,
  Box,
  IconButton,
  Avatar,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../global/logo.png";
import { usePocket } from "contexts/PocketContext";
import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

const Header = () => {
  const { logout, pb, getDataById } = usePocket();

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const queryClient = useQueryClient();

  const { isLoading, isError, data } = getDataById({
    table: "users",
    id: pb?.authStore?.model?.id,
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["users", pb?.authStore?.model?.id]);
    };
  }, [queryClient, pb?.authStore?.model?.id]);

  const checkForInactivity = () => {
    const expireTime = localStorage.getItem("expireTime");

    if (expireTime < Date.now()) {
      logout();
    }
  };

  const updateExpireTime = () => {
    const expireTime = Date.now() + 600000; //10 minutos

    localStorage.setItem("expireTime", expireTime);
  };

  useEffect(() => {
    const interval = setInterval(checkForInactivity, 600000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updateExpireTime();

    window.addEventListener("click", updateExpireTime);
    window.addEventListener("keypress", updateExpireTime);
    window.addEventListener("mousemove", updateExpireTime);
    window.addEventListener("scroll", updateExpireTime);

    return () => {
      window.removeEventListener("click", updateExpireTime);
      window.removeEventListener("keypress", updateExpireTime);
      window.removeEventListener("mousemove", updateExpireTime);
      window.removeEventListener("scroll", updateExpireTime);
    };
  }, []);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "primary.main",
        pt: 2,
        pb: 1,
        displayPrint: "none",
      }}
    >
      <Container>
        <Toolbar
          disableGutters
          sx={{
            justifyContent: pb.authStore.isValid ? "flex-start" : "center",
            mx: 1,
          }}
        >
          <Link to="/">
            <Box component="img" alt="Logo" src={Logo} height={65} />
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h4"
              noWrap
              color="white"
              sx={{
                ml: 1,
                fontFamily: "Varela Round",
                fontWeight: 700,
              }}
            >
              Sistom
            </Typography>
          </Link>
          {pb.authStore.isValid ? (
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Typography
                align="center"
                variant="h6"
                color="initial"
                sx={{ mr: 1, color: "white" }}
              >
                {data?.name}
              </Typography>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Foto do usuário"
                  src={
                    isLoading || isError
                      ? "#"
                      : `https://sistom.pockethost.io/api/files/_pb_users_auth_/${pb.authStore.model.id}/${data?.avatar}`
                  }
                />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={() => {
                    logout();
                    handleCloseUserMenu();
                  }}
                  key={"Logout"}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <></>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
