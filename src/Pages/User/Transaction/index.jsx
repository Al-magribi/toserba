import { Box } from "@mui/material";
import Navbar from "../../Components/Navbar";
import DetailTransaction from "./DetailTransaction";
import Footer from "../../Components/Footer";
import Title from "../../Title";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMyOrders } from "../../../redux/order/order_action";
import Loader from "../../Components/Loader";
import { toast } from "react-toastify";
import User_protection from "../../../Protection/User";
import { UPDATE_PAYMENT_RESET } from "../../../redux/payment/payment_const";

const Transaction = () => {
  User_protection();

  const dispatch = useDispatch();

  const { myOrder_load, Orders } = useSelector((state) => state.my_orders);
  const { user } = useSelector((state) => state.user);
  const { updateLoaded, isUpdated, payment } = useSelector(
    (state) => state.upPayment
  );
  const { isCreated, created } = useSelector((state) => state.review);

  useEffect(() => {
    if (user) {
      dispatch(getMyOrders(user?._id));
    }

    if (isUpdated) {
      toast.success(payment);

      dispatch({ type: UPDATE_PAYMENT_RESET });
    } else {
      toast.error(payment);
    }

    if (isCreated) {
      toast.success(created);
    }
  }, [dispatch, user, payment, isUpdated, isCreated, created]);
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",

        position: "relative",
      }}
    >
      <Title title={"Orders"} />
      <Navbar />

      {/* Detail transaksi */}

      <Box
        sx={{
          width: "100%",
          position: "absolute",
          top: { xs: 40, md: 80 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "90%",
            m: 1,
            height: { xs: "100vh", md: 615 },
          }}
        >
          {myOrder_load || updateLoaded ? (
            <Loader />
          ) : (
            <DetailTransaction Orders={Orders} />
          )}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Transaction;
