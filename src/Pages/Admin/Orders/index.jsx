import { Box } from "@mui/material";
import Navbar from "../Components/Navbar";
import Title from "../../Title";
import Footer from "../Components/Footer";
import OrdersList from "./OrdersList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../redux/order/order_action";
import Loader from "../../Components/Loader";
import { toast } from "react-toastify";
import { DELETE_ORDER_RESET } from "../../../redux/order/order_const";
import Admin_protection from "../../../Protection/Admin";

const Orders = () => {
  Admin_protection();

  const dispatch = useDispatch();

  const { Orders, loadingOrders } = useSelector((state) => state.Orders);
  const { loading, isUpdated, updated, isDeleted, deleted } = useSelector(
    (state) => state.upDelOrder
  );

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  useEffect(() => {
    if (isUpdated) {
      dispatch(getOrders());

      toast.success(updated);
    } else {
      toast.error(updated);
    }

    if (isDeleted) {
      dispatch(getOrders());

      toast.success(deleted);

      dispatch({ type: DELETE_ORDER_RESET });
    } else {
      toast.error(deleted);

      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, isUpdated, updated, isDeleted, deleted]);
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Title title={"Admin Pesanan"} />
      <Navbar />
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          minHeight: { xs: 900, md: 670 },
          top: { xs: 60, md: 80 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {loadingOrders || loading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Loader />
          </Box>
        ) : (
          <OrdersList Orders={Orders} />
        )}

        <Footer />
      </Box>
    </Box>
  );
};

export default Orders;
