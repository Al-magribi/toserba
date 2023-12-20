import { Box, Button, IconButton, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Shipment from "./Shipment";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createPayment, getToken } from "../../../redux/payment/payment_action";
import {
  CREATE_PAYMENT_RESET,
  GET_TOKEN_RESET,
} from "../../../redux/payment/payment_const";

const Counter = ({ items, subtotal, weight }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loadToken, success, token } = useSelector((state) => state.token);
  const { new_payment, payment_success, payment } = useSelector(
    (state) => state.new_payment
  );

  const [cost, setCost] = useState(0);
  const [shipping, setShipping] = useState("");

  const total = subtotal + cost;

  const dataProducts = JSON.parse(localStorage.getItem("cart"));
  const getIds = JSON.parse(localStorage.getItem("cart"));

  const ids = getIds?.map((item) => item._id);

  const buyHandler = () => {
    if (isAuthenticated) {
      if (cost === 0 || shipping === "") {
        toast.error("Ongkir dan alamat tidak boleh kosong");
      } else {
        if (user?.phone === "-") {
          toast.warning("Masukan no Hp pada profil");
        } else {
          const data = {
            orderId: Date.now(),
            payment: total,
            name: user?.name,
            email: user?.username,
          };

          dispatch(getToken(data));
        }
      }
    } else {
      toast.warning("Silahkan login terlebih dahulu");
    }
  };

  useEffect(() => {
    if (payment_success) {
      toast.success(payment);

      navigate("/status-payment");

      dispatch({ type: CREATE_PAYMENT_RESET });
      dispatch({ type: GET_TOKEN_RESET });
    } else {
      toast.error(payment);

      dispatch({ type: CREATE_PAYMENT_RESET });
    }
  }, [payment, payment_success, dispatch]);

  useEffect(() => {
    if (success) {
      window.snap.pay(token, {
        onSuccess: (result) => {
          const process = {
            user: user?._id,
            order: result.order_id,
            address: shipping,
            phone: user?.phone,
            subtotal: subtotal,
            payment: result.gross_amount,
            shipping_cost: cost,
            status: result.transaction_status,
            products: dataProducts,
          };

          dispatch(createPayment(process));

          dispatch({ type: CREATE_PAYMENT_RESET });
        },
        onPending: (result) => {
          const process = {
            user: user?._id,
            order: result.order_id,
            address: shipping,
            phone: user?.phone,
            subtotal: subtotal,
            payment: result.gross_amount,
            shipping_cost: cost,
            status: result.transaction_status,
            products: dataProducts,
          };

          dispatch(createPayment(process));

          dispatch({ type: CREATE_PAYMENT_RESET });
        },
        onError: (error) => {
          toast.error(error);

          dispatch({ type: CREATE_PAYMENT_RESET });
        },
        onClose: () => {
          toast.error(
            "Anda belum menyelesaikaan pembayaran, pembayaran dibatalkan"
          );
        },
      });
    } else {
      toast.error(token);
    }
  }, [success, token]);

  const deleteHandler = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const itemIndex = cart.findIndex((item) => item._id === id);

    if (itemIndex !== -1) {
      const updateCart = [
        ...cart.slice(0, itemIndex),
        ...cart.slice(itemIndex + 1),
      ];

      localStorage.setItem("cart", JSON.stringify(updateCart));
    }
  };

  useEffect(() => {
    const midtrans_url = import.meta.env.VITE_MIDTRANS_URL;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtrans_url;

    const midtrans_client_key = import.meta.env.VITE_MIDTRANS_KEY;
    scriptTag.setAttribute("data-client-key", midtrans_client_key);

    document.body.appendChild(scriptTag);

    return () => document.body.removeChild(scriptTag);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
        borderRadius: "10px",
        boxShadow: 4,
        p: 2,
        width: 350,
        height: 550,
        position: "fixed",
      }}
    >
      <Typography fontWeight="bold" sx={{ mb: 1 }}>
        Buat Pesanan
      </Typography>
      {items?.map((item) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Typography sx={{ width: "30%" }}>{item.name}</Typography>
          <Typography align="center" sx={{ width: "20%" }}>
            {item.qty} item
          </Typography>
          <Typography align="center" sx={{ width: "35%" }}>
            Rp {parseFloat(item.total_price).toLocaleString("id-ID")}
          </Typography>
          <Typography
            align="center"
            sx={{ "&:hover": { cursor: "pointer" }, width: "5%" }}
            onClick={() => deleteHandler(item._id)}
          >
            -
          </Typography>
        </Box>
      ))}

      <Box
        sx={{ width: "100%", mt: 2, display: weight === 0 ? "none" : "block" }}
      >
        <Shipment
          cost={(cost) => setCost(cost)}
          shipping={(shipping) => setShipping(shipping)}
          weight={weight}
        />
      </Box>

      {/* Ongkir */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Typography fontSize={16} sx={{ color: "gray", width: "30%" }}>
          ongkir
        </Typography>

        <Typography fontSize={18} fontWeight="bold" sx={{ width: "50%" }}>
          {`Rp ${parseFloat(cost).toLocaleString("id-ID")}`}
        </Typography>
      </Box>

      {/* TOTAL */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Typography fontSize={16} sx={{ color: "gray", width: "30%" }}>
          total
        </Typography>

        <Typography fontSize={18} fontWeight="bold" sx={{ width: "50%" }}>
          {`Rp ${parseFloat(total).toLocaleString("id-ID")}`}
        </Typography>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Button
          fullWidth
          sx={{
            mt: 2,
            border: " 0.5px solid #29b932",
            color: "#29b932",
            fontWeight: "bold",
          }}
          onClick={buyHandler}
        >
          {loadToken || new_payment ? "memporses" : "selesaikan pembayaran"}
        </Button>
      </Box>
    </Box>
  );
};

export default Counter;
