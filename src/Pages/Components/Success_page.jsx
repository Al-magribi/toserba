import { Box, Link, Typography } from "@mui/material";
import Navbar from "./Navbar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCart } from "../../redux/cart/cart_action";
import { DELETE_MY_CART_RESET } from "../../redux/cart/cart_const";
import Loader from "../Components/Loader";
import User_protection from "../../Protection/User";

const Success_page = () => {
  User_protection();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isDeleted, deleteCartLoad } = useSelector((state) => state.delCart);
  const { user } = useSelector((state) => state.user);

  const getIds = JSON.parse(localStorage.getItem("cart"));

  const ids = getIds?.map((item) => item._id);

  useEffect(() => {
    if (ids) {
      const data = {
        ids: ids,
      };

      const delay = 5000;

      const timeOut = setTimeout(() => {
        dispatch(deleteCart(data, user._id));
      }, delay);

      return () => clearTimeout(timeOut);
    }
  }, [dispatch, ids, user]);

  useEffect(() => {
    if (isDeleted) {
      dispatch({ type: DELETE_MY_CART_RESET });

      localStorage.removeItem("cart");

      navigate("/");
    }
  }, [isDeleted]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Navbar />

      <Box
        sx={{
          position: "absolute",
          top: 80,
          width: "95%",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {deleteCartLoad ? (
          <Loader />
        ) : (
          <Box
            sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
          >
            <Box>
              <CheckCircleIcon sx={{ fontSize: 200, color: "green" }} />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Pembayaran Berhasil</Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Success_page;
