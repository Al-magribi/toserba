import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import Title from "../Title";
import Loader from "./Loader";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/user/userAction";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userLoading, isAuthenticated, userError, user } = useSelector(
    (state) => state.user
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);

  const emailChange = (e) => {
    const value = e.target.value;

    setEmail(value);

    const emailChecked = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailChecked.test(value));
  };

  const loginHandler = () => {
    const data = {
      username: email,
      password: password,
    };

    dispatch(userLogin(data));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    } else if (user?.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user?.role === "user") {
      navigate("/");
    } else {
      toast.error(userError);
    }
  }, [isAuthenticated, userError]);

  const signUp = () => {
    navigate("/daftar");
  };

  const forgotHandler = () => {
    navigate("/lupa-password");
  };

  const googleLogin = () => {
    location.href = `${import.meta.env.VITE_DOMAIN_API}/auth/google`;

    localStorage.setItem("token", JSON.stringify("Login"));
  };
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
      <Title title='Login' />
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
              height: 500,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src='https://static.vecteezy.com/system/resources/thumbnails/005/638/554/small_2x/illustration-isometric-concept-putting-shopping-items-in-online-cart-free-vector.jpg'
              alt='login'
              style={{
                width: "90%",
                height: "90%",
                objectFit: "cover",
              }}
            />
          </Box>
          <Box
            sx={{
              width: { xs: 390, md: 500 },
              height: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "80%",
                height: "80%",
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant='h6' fontWeight='bold'>
                Login
              </Typography>
              <Typography color='grey'>
                Belum punya akun?{" "}
                <span
                  onClick={signUp}
                  style={{ color: "black", cursor: "pointer" }}
                >
                  Daftar
                </span>
              </Typography>

              <form onSubmit={loginHandler}>
                <TextField
                  type='emial'
                  sx={{ mt: 2 }}
                  fullWidth
                  label='Email'
                  value={email}
                  onChange={emailChange}
                />

                <TextField
                  type='password'
                  sx={{ mt: 2 }}
                  fullWidth
                  label='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Box sx={{ width: "100%", mt: 2, mb: 2 }}>
                  <Button
                    fullWidth
                    type='submit'
                    variant='contained'
                    color='success'
                    disabled={!isValid}
                  >
                    Login
                  </Button>
                </Box>

                <Typography align='center' color='grey' variant='body1'>
                  Atau login dengan
                </Typography>

                <Box sx={{ width: "100%", mt: 2 }}>
                  <Button
                    fullWidth
                    variant='contained'
                    color='error'
                    startIcon={<GoogleIcon />}
                    onClick={googleLogin}
                  >
                    Google
                  </Button>
                </Box>

                <Typography mt={2} align='center' color='grey' variant='body1'>
                  Lupa Password?
                  <span
                    onClick={forgotHandler}
                    style={{ cursor: "pointer", color: "black" }}
                  >
                    Klik Di Sini
                  </span>
                </Typography>
              </form>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Login;
