import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Title from "../Title";

import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/user/userAction";
import { RESET_PASSWORD_RESET } from "../../redux/user/userConst";
import Loader from "../Components/Loader";

const Reset = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { resetLoading, isReseted, resetMessage, resetError } = useSelector(
    (state) => state.resetPassword
  );

  const token = params.token;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordHandler = () => {
    if (password === "" || confirmPassword === "") {
      toast.warning("Kolom tidak boleh kosong");
    } else {
      const data = {
        password: password,
      };

      dispatch(resetPassword(token, data));
    }
  };

  useEffect(() => {
    if (isReseted) {
      toast.success(resetMessage);

      setPassword("");
      setConfirmPassword("");

      dispatch({ type: RESET_PASSWORD_RESET });

      setTimeout(navigate("/login"), 2000);
    } else {
      toast.error(resetError);

      setPassword("");
      setConfirmPassword("");

      dispatch({ type: RESET_PASSWORD_RESET });
    }
  }, [dispatch, isReseted, resetMessage, resetError]);
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
      <Title title="Reset Password" />

      {resetLoading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            width: { xs: 300, md: 600 },

            borderRadius: "10px",
            boxShadow: 4,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6">Masukan Password Baru</Typography>

          <Typography mt={2} color="gray">
            * Pastikan passwor sesuai
          </Typography>

          <TextField
            type="password"
            fullWidth
            sx={{ mt: 2 }}
            label="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            type="password"
            fullWidth
            sx={{ mt: 2 }}
            label="Konfirmasi Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Box sx={{ width: "100%", mt: 2 }}>
            <Button
              disabled={password === confirmPassword ? false : true}
              fullWidth
              color="success"
              variant="contained"
              onClick={resetPasswordHandler}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
      )}

      <ToastContainer autoClose={2000} />
    </Box>
  );
};

export default Reset;
