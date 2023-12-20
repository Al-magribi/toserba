import { Box, Typography, IconButton, Button } from "@mui/material";
import { useEffect, useState } from "react";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import AddIcon from "@mui/icons-material/Add";
import Shipment from "./Shipment";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createPayment, getToken } from "../../redux/payment/payment_action";
import { CREATE_PAYMENT_RESET } from "../../redux/payment/payment_const";
import { addToCart } from "../../redux/cart/cart_action";
import { ADD_TO_CART_RESET } from "../../redux/cart/cart_const";

const Counter = ({ product }) => {
  const dispatch = useDispatch();

  const { loadToken, success, token } = useSelector((state) => state.token);
  const { new_payment, payment_success, payment } = useSelector(
    (state) => state.new_payment
  );
  const { add_cartLoad, isAdded, cart } = useSelector((state) => state.addCart);

  const { user, isAuthenticated } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const [stock, setStock] = useState(1);
  const [subtotal, setSubtotal] = useState(product?.price);

  const decreaseStock = () => {
    if (stock > 1) {
      setStock(stock - 1);
      setSubtotal(product?.price * (stock - 1));
    }
  };

  const increaseStock = () => {
    if (stock < product?.stock) {
      setStock(stock + 1);
      setSubtotal(product?.price * (stock + 1));
    }
  };

  //   PENGIRIMAN
  const [cost, setCost] = useState(0);
  const [shipping, setShipping] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");

  // JUMLAH TOTAL
  const total = subtotal + cost;

  const cartHandeler = () => {
    if (isAuthenticated) {
      const process = {
        user: user?._id,
        products: {
          productId: product?._id,
          qty: stock,
        },
      };

      dispatch(addToCart(process));
    } else {
      toast.warning("Login terlebih dahulu");
    }
  };

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
            products: [
              {
                productId: product?._id,
                qty: stock,
                total_price: total,
                total_profit: product?.profit,
              },
            ],
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
            products: [
              {
                productId: product?._id,
                qty: stock,
                total_price: total,
                total_profit: product?.profit,
              },
            ],
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

  useEffect(() => {
    if (payment_success) {
      toast.success(payment);

      dispatch({ type: CREATE_PAYMENT_RESET });
    } else {
      toast.error(payment);

      dispatch({ type: CREATE_PAYMENT_RESET });
    }

    if (isAdded) {
      toast.success(cart);

      dispatch({ type: ADD_TO_CART_RESET });
    } else {
      toast.error(cart);

      dispatch({ type: ADD_TO_CART_RESET });
    }
  }, [payment, payment_success, dispatch, isAdded, cart]);

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
        width: 360,
        height: 550,
        border: "1px solid #ccc",
        position: { xs: "relative", md: "fixed" },
        borderRadius: "10px",
        display: "flex",
        justifyContent: "start",
        flexDirection: "column",
        p: 2,
        overflow: "auto",
      }}
    >
      <Typography fontWeight='bold'>Atur Jumlah</Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          mt: 2,
        }}
      >
        {/* STOCK COUNTER */}
        <Box
          sx={{
            borderRadius: "5px",
            height: 35,
            width: "50%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton onClick={decreaseStock}>
            <RemoveRoundedIcon />
          </IconButton>
          <span>{stock}</span>
          <IconButton onClick={increaseStock}>
            <AddIcon />
          </IconButton>
        </Box>

        {/* STOCK */}
        <Typography
          variant='body2'
          sx={{ width: "45%" }}
        >{`Total Stok: ${product?.stock}`}</Typography>
      </Box>

      {/* SUBTOTAL */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Typography fontSize={16} sx={{ color: "gray", width: "30%" }}>
          subtotal
        </Typography>

        <Typography fontSize={18} fontWeight='bold' sx={{ width: "50%" }}>
          {`Rp ${parseFloat(subtotal).toLocaleString("id-ID")}`}
        </Typography>
      </Box>

      <Box sx={{ width: "100%", mt: 2 }}>
        <Shipment
          cost={(cost) => setCost(cost)}
          shipping={(shipping) => setShipping(shipping)}
          province={(province) => setProvince(province)}
          city={(city) => setCity(city)}
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

        <Typography fontSize={18} fontWeight='bold' sx={{ width: "50%" }}>
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

        <Typography fontSize={18} fontWeight='bold' sx={{ width: "50%" }}>
          {`Rp ${parseFloat(total).toLocaleString("id-ID")}`}
        </Typography>
      </Box>

      {/* TOMBOL */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          mt: 2,
        }}
      >
        <Button
          sx={{
            bgcolor: "#29b932",
            color: "#fff",
            "&:hover": { bgcolor: "#29b932" },
          }}
          startIcon={<AddIcon />}
          onClick={cartHandeler}
        >
          Keranjang
        </Button>
        <Button
          sx={{
            mt: 2,
            border: " 0.5px solid #29b932",
            color: "#29b932",
            fontWeight: "bold",
          }}
          onClick={buyHandler}
        >
          Beli
        </Button>
      </Box>
      <ToastContainer autoClose={2000} />
    </Box>
  );
};

export default Counter;
