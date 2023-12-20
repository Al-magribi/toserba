import { Box, Typography, Checkbox, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import Counter from "./Counter";
import { useDispatch, useSelector } from "react-redux";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SyncIcon from "@mui/icons-material/Sync";
import { deleteItem, getMyCart } from "../../../redux/cart/cart_action";
import { toast } from "react-toastify";
import { DELETE_ITEM_RESET } from "../../../redux/cart/cart_const";
import Loader from "../../Components/Loader";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const { delItem } = useSelector((state) => state.delItem);

  const initialStock = item.qty;
  const initialPrice = item.qty * item.productId.price;
  const initialWeight = item.productId.weight;
  const [stock, setStock] = useState(initialStock);
  const [subtotal, setSubtotal] = useState(initialPrice);
  const [weight, setWeight] = useState(initialWeight);

  const decreaseStock = () => {
    if (stock > 1) {
      setStock(stock - 1);
      setSubtotal(item.productId.price * (stock - 1));
      setWeight(item.productId.weight * (stock - 1));

      // Ambil data cart dari localStorage
      const cart = JSON.parse(localStorage.getItem("cart"));

      // Cari indeks item yang sesuai dalam cart
      const itemIndex = cart.findIndex((cartItem) => cartItem._id === item._id);

      if (itemIndex !== -1) {
        // Perbarui nilai price, qty, dan weight pada item yang sesuai
        cart[itemIndex].total_price = item.productId.price * (stock - 1);
        cart[itemIndex].total_profit = item.productId.profit * (stock - 1);
        cart[itemIndex].qty = stock - 1;
        cart[itemIndex].weight = item.productId.weight * (stock - 1);

        // Simpan kembali data cart yang telah diperbarui ke localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }
  };

  const increaseStock = () => {
    if (stock < item.productId.stock) {
      setStock(stock + 1);
      setSubtotal(item.productId.price * (stock + 1));
      setWeight(item.productId.weight * (stock + 1));

      // Ambil data cart dari localStorage
      const cart = JSON.parse(localStorage.getItem("cart"));

      // Cari indeks item yang sesuai dalam cart
      const itemIndex = cart.findIndex((cartItem) => cartItem._id === item._id);

      if (itemIndex !== -1) {
        // Perbarui nilai price, qty, dan weight pada item yang sesuai
        cart[itemIndex].total_price = item.productId.price * (stock + 1);
        cart[itemIndex].total_profit = item.productId.profit * (stock + 1);
        cart[itemIndex].qty = stock + 1;
        cart[itemIndex].weight = item.productId.weight * (stock + 1);
        // Simpan kembali data cart yang telah diperbarui ke localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }
  };

  const deleteProduct = (id) => {
    dispatch(deleteItem(id));
  };

  const selectHandler = (e, item) => {
    const isChecked = e.target.checked;

    let items = JSON.parse(localStorage.getItem("cart")) || [];

    if (isChecked) {
      const newItem = {
        _id: item._id,
        productId: item.productId._id,
        name: item.productId.name,
        weight: item.productId.weight,
        total_price: subtotal,
        qty: stock,
        total_profit: item.productId.profit * stock,
      };

      const existingItemIndex = items.findIndex(
        (cartItem) => cartItem._id === newItem._id
      );

      if (existingItemIndex !== -1) {
        items[existingItemIndex] = newItem;
      } else {
        items.push(newItem);
      }
    } else {
      items = items.filter((cartItem) => cartItem._id !== item._id);
    }

    localStorage.setItem("cart", JSON.stringify(items));
  };

  return (
    <Box key={item._id} sx={{ mt: 2, mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", boxShadow: 2, p: 1 }}>
        <Checkbox onClick={(e) => selectHandler(e, item)} />
        <img
          src={item.productId.image[0].link}
          alt={item.productId.name}
          style={{
            width: "120px",
            height: "120px",
            objectFit: "cover",
          }}
          loading="lazy"
        />
        <Box sx={{ ml: 3, width: "70%" }}>
          <Typography>{item.productId.name}</Typography>
          <Typography fontWeight="bold">
            Rp
            {parseFloat(subtotal).toLocaleString("id-ID")}
          </Typography>
          <Typography fontSize={12} fontStyle="italic">
            {weight} gram
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <IconButton onClick={() => deleteProduct(item._id)}>
              {delItem ? <SyncIcon /> : <DeleteOutlineIcon />}
            </IconButton>
            <Box
              sx={{
                borderRadius: "5px",
                height: 45,
                width: "23%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                ml: 2,
              }}
            >
              <IconButton onClick={decreaseStock}>
                <RemoveRoundedIcon />
              </IconButton>
              <span>{stock}</span>
              <IconButton
                onClick={increaseStock}
                sx={{ border: "1px solid green", color: "green" }}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const DetailCart = () => {
  const dispatch = useDispatch();

  const { myCart, myCart_Load } = useSelector((state) => state.my_cart);

  const { isDeleted, message } = useSelector((state) => state.delItem);

  const items = myCart?.products;

  const [process, setProcess] = useState([]);
  const [total, setTotal] = useState(0);
  const [weight, setWeight] = useState(0);

  const updateData = () => {
    const updatedProcess = JSON.parse(localStorage.getItem("cart")) || [];
    setProcess(updatedProcess);
  };

  const calculateData = () => {
    const data = JSON.parse(localStorage.getItem("cart"));

    if (data) {
      const { total, weight } = data.reduce(
        (acc, item) => {
          return {
            weight: acc.weight + item.weight,
            total: acc.total + item.total_price,
          };
        },
        { weight: 0, total: 0 }
      );

      setWeight(weight);
      setTotal(total);
    }
  };

  useEffect(() => {
    updateData();

    const intervalId = setInterval(() => {
      updateData();
      calculateData();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (isDeleted) {
      toast.success(message);

      dispatch({ type: DELETE_ITEM_RESET });

      dispatch(getMyCart());
    } else {
      toast.error(message);

      dispatch({ type: DELETE_ITEM_RESET });
    }
  }, [isDeleted, message, dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignitems: "start",
        justifyContent: "start",
        height: "100%",
      }}
    >
      <Typography variant="h6" sx={{ height: "7%" }}>
        Keranjang Belanja
      </Typography>
      {/* Cart */}
      <Box sx={{ display: "flex", height: "93%" }}>
        <Box sx={{ flex: 2, height: "100%" }}>
          {myCart_Load ? (
            <Box
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Loader />
            </Box>
          ) : (
            <Box sx={{ p: 1 }}>
              {items?.length === 0 ? (
                <Typography fontStyle="italic">
                  Tidak ada item yang dipilih
                </Typography>
              ) : (
                items?.map((item) => <CartItem key={item._id} item={item} />)
              )}
            </Box>
          )}
        </Box>
        {/* Counter */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <Counter items={process} subtotal={total} weight={weight} />
        </Box>
      </Box>
    </Box>
  );
};

export default DetailCart;
