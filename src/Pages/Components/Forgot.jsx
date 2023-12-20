import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Title from "../Title";
import Loader from "../Components/Loader";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendEmail } from "../../redux/user/userAction";
import { SEND_EMAIL_RESET } from "../../redux/user/userConst";

const Forgot = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { emailLoading, isSent, emailMessage, emailError } = useSelector(
    (state) => state.email
  );

  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);

  const emailChange = (e) => {
    const value = e.target.value;

    setEmail(value);

    const emailChecked = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailChecked.test(value));
  };

  const emailHandler = () => {
    const data = {
      email: email,
    };
    dispatch(sendEmail(data));
  };

  useEffect(() => {
    if (isSent) {
      toast.success(emailMessage);

      dispatch({ type: SEND_EMAIL_RESET });

      setEmail("");

      setTimeout(navigate("/login", 2000));
    } else {
      toast.error(emailError);

      dispatch({ type: SEND_EMAIL_RESET });

      setEmail("");
    }
  }, [dispatch, isSent, emailMessage, emailError]);
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
      <Title title="Konfirmasi Email" />
      {emailLoading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            width: { xs: 300, md: 600 },
            height: { xs: 300, md: 220 },
            borderRadius: "10px",
            boxShadow: 4,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6">
            Masukan email terdaftar dan aktif
          </Typography>

          <Typography mt={2} color="gray">
            * Perika pesan di inbox atau spam di email anda, email berisi link
            untuk mereset password anda, aktif dalam 5 jam
          </Typography>

          <TextField
            type="email"
            fullWidth
            sx={{ mt: 2 }}
            label="email"
            value={email}
            onChange={emailChange}
          />

          <Box sx={{ width: "100%", mt: 2 }}>
            <Button
              disabled={!isValid}
              fullWidth
              color="success"
              variant="contained"
              onClick={emailHandler}
            >
              Kirim Email
            </Button>
          </Box>
        </Box>
      )}

      <ToastContainer autoClose={2000} />
    </Box>
  );
};

export default Forgot;
