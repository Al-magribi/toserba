import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Title from "../Title";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Loader from "../Components/Loader";
import { googleRegister, userRegister } from "../../redux/user/userAction";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userLoading, isAuthenticated, user, userError } = useSelector(
    (state) => state.user
  );

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);

  const emailChange = (e) => {
    const value = e.target.value;

    setEmail(value);

    const emailChecked = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailChecked.test(value));
  };

  const registerHandler = (e) => {
    e.preventDefault();

    const data = {
      name: name,
      username: email,
      password: password,
      phone: phone,
    };

    dispatch(userRegister(data));
  };

  const googleHandler = () => {
    location.href = `${import.meta.env.VITE_DOMAIN_API}/auth/google`;
    localStorage.setItem("token", JSON.stringify("Login"));
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } else {
      toast.error(userError);
    }
  }, [user, navigate, userError, isAuthenticated]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Title title="Pendaftaran" />

      {userLoading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: 4,
          }}
        >
          <Box
            sx={{
              width: 500,
              height: 600,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="https://img.freepik.com/free-vector/seasonal-sale-discounts-presents-purchase-visiting-boutiques-luxury-shopping-price-reduction-promotional-coupons-special-holiday-offers-vector-isolated-concept-metaphor-illustration_335657-2766.jpg"
              alt="login"
              style={{
                width: "90%",
                height: "90%",
                objectFit: "cover",
              }}
            />
          </Box>
          <Box
            sx={{
              width: { xs: 380, md: 500 },
              height: 560,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "80%",
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Sign Up
              </Typography>
              <Typography variant="body2" color="grey">
                * Kami menjaga data anda, No Handphone digunakan untuk
                mengkonfirmasi pengiriman barang
              </Typography>

              <form onSubmit={registerHandler}>
                <TextField
                  type="text"
                  sx={{ mt: 2 }}
                  fullWidth
                  label="Nama Lengkap"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <TextField
                  type="email"
                  sx={{ mt: 2 }}
                  fullWidth
                  label="Email"
                  value={email}
                  onChange={emailChange}
                />

                <TextField
                  type="password"
                  sx={{ mt: 2 }}
                  fullWidth
                  label="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <TextField
                  type="number"
                  sx={{ mt: 2 }}
                  fullWidth
                  label="No Hp"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <Box sx={{ width: "100%", mt: 2, mb: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    type="submit"
                    disabled={!isValid}
                  >
                    Daftar
                  </Button>
                </Box>
              </form>

              <Typography align="center" color="grey" variant="body1">
                Atau Daftar dengan
              </Typography>

              <Box sx={{ width: "100%", mt: 2 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  startIcon={<GoogleIcon />}
                  onClick={googleHandler}
                >
                  Google
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      <ToastContainer autoClose={2000} />
    </Box>
  );
};

export default SignUp;
