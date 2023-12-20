import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import LoginIcon from "@mui/icons-material/Login";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user/userAction";
import { getMyCart } from "../../redux/cart/cart_action";

const Navbar = () => {
  const dispatch = useDispatch();
  //   User Login
  const { isAuthenticated: authUser, user } = useSelector(
    (state) => state.user
  );

  const { loading, data } = useSelector((state) => state.store_data);

  const role = user?.role;

  const { isAdded } = useSelector((state) => state.addCart);
  const { success, myCart } = useSelector((state) => state.my_cart);

  const [cartItem, setCartItem] = React.useState(0);

  //   Login page
  const navigate = useNavigate();

  const loginHandler = () => {
    navigate("/login");
  };

  //   Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logoutHandler = () => {
    dispatch(logout());
    handleMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {role === "admin" ? (
        <div key="admin">
          <MenuItem
            onClick={handleMenuClose}
            component={Link}
            to="/admin-settings"
          >
            Setting
          </MenuItem>
          <MenuItem
            onClick={handleMenuClose}
            component={Link}
            to="/admin-dashboard"
          >
            Dashboard
          </MenuItem>
          <MenuItem onClick={logoutHandler}>Logout</MenuItem>{" "}
        </div>
      ) : (
        <div key="user">
          <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
            Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/orders">
            Orders
          </MenuItem>
          <MenuItem onClick={logoutHandler}>Logout</MenuItem>
        </div>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClick={handleMobileMenuClose}
    >
      {role === "admin" ? (
        <div key={"admin"}>
          {/* Profile */}
          <MenuItem component={Link} to="/admin-settings">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle
                sx={{
                  color: "#29b932",
                }}
              />
            </IconButton>
            <p>Setting</p>
          </MenuItem>
          {/* Dashboard */}
          <MenuItem component={Link} to="/admin-dashboard">
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <ShoppingCartOutlinedIcon
                sx={{
                  color: "#29b932",
                }}
              />
            </IconButton>
            <p>Dashboard</p>
          </MenuItem>
          {/* Logout */}
          <MenuItem onClick={logoutHandler}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <LogoutOutlinedIcon
                sx={{
                  color: "#29b932",
                }}
              />
            </IconButton>
            <p>Logout</p>
          </MenuItem>
        </div> ? (
          role === "user"
        ) : (
          <div key="user">
            {/* Profile */}
            <MenuItem component={Link} to="/profile">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle
                  sx={{
                    color: "#29b932",
                  }}
                />
              </IconButton>
              <p>Profile</p>
            </MenuItem>
            {/* Keranjang */}
            <MenuItem component={Link} to="/cart">
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={cartItem} color="error">
                  <ShoppingCartOutlinedIcon
                    sx={{
                      color: "#29b932",
                    }}
                  />
                </Badge>
              </IconButton>
              <p>Cart</p>
            </MenuItem>
            {/* Transaksi */}
            <MenuItem component={Link} to="/orders">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <RequestQuoteOutlinedIcon
                  sx={{
                    color: "#29b932",
                  }}
                />
              </IconButton>
              <p>Orders</p>
            </MenuItem>
            {/* Logout */}
            <MenuItem onClick={logoutHandler}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <LogoutOutlinedIcon
                  sx={{
                    color: "#29b932",
                  }}
                />
              </IconButton>
              <p>Logout</p>
            </MenuItem>
          </div>
        )
      ) : (
        <div key="user">
          <MenuItem onClick={logoutHandler}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <LogoutOutlinedIcon
                sx={{
                  color: "#29b932",
                }}
              />
            </IconButton>
            <p>Login</p>
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  // KEMBALI KE HOME
  const homeHandler = () => {
    navigate("/");
  };

  React.useEffect(() => {
    if (role === "user") {
      dispatch(getMyCart());
    }

    if (isAdded) {
      dispatch(getMyCart());
    }
  }, [dispatch, isAdded, role]);

  React.useEffect(() => {
    if (success) {
      setCartItem(myCart?.products?.length);
    }
  }, [success, myCart]);
  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "#29b932",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* LOGO MOBILE */}
          <Box
            onClick={homeHandler}
            sx={{
              display: { xs: "flex", md: "none" },
              "&:hover": { cursor: "pointer" },
            }}
          >
            <img
              src={data?.logo}
              alt={data?.name}
              style={{ width: 38, height: 38, objectFit: "contain" }}
            />
          </Box>

          {/* LOGO  */}
          <Box
            onClick={homeHandler}
            sx={{
              display: { xs: "none", md: "flex" },
              "&:hover": { cursor: "pointer" },
            }}
          >
            <img
              src={data?.logo}
              alt={data?.name}
              style={{ width: 150, height: 45, objectFit: "contain" }}
            />
          </Box>

          {/* KOLOM LOGIN */}
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
                justifyContent: "space-evenly",
              },
            }}
          >
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              component={Link}
              to="/cart"
            >
              <Badge badgeContent={cartItem} color="error">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>

            {authUser ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                onClick={handleProfileMenuOpen}
              >
                <AccountCircle />
              </IconButton>
            ) : (
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                onClick={loginHandler}
              >
                <LoginIcon />
              </IconButton>
            )}
          </Box>

          {/* MENU MOBILE */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Navbar;
