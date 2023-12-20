import { Box } from "@mui/material";
import Navbar from "../Components/Navbar";
import Title from "../../Title";
import Footer from "../Components/Footer";
import ProductsList from "./ProductsList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../../../redux/product/productAction";
import { toast } from "react-toastify";
import {
  ADD_PRODUCT_RESET,
  UPLOAD_FILE_RESET,
} from "../../../redux/product/productConst";
import Admin_protection from "../../../Protection/Admin";

const Products = () => {
  Admin_protection();

  const dispatch = useDispatch();

  const { productsLoading, Products } = useSelector((state) => state.products);
  const { isAdded, added } = useSelector((state) => state.addProduct);
  const { isUploaded, uploaded } = useSelector((state) => state.uploadFile);

  const name = "";

  useEffect(() => {
    dispatch(getProducts(name));
  }, [dispatch]);

  useEffect(() => {
    if (isAdded) {
      toast.success(added);

      dispatch({ type: ADD_PRODUCT_RESET });

      dispatch(getProducts(name));

      close();
    } else {
      toast.error(added);

      dispatch({ type: ADD_PRODUCT_RESET });
    }
  }, [isAdded, added, dispatch]);

  useEffect(() => {
    if (isUploaded) {
      toast.success(uploaded);

      dispatch(getProducts(name));

      dispatch({ type: UPLOAD_FILE_RESET });
    } else {
      toast.error(uploaded);

      dispatch({ type: UPLOAD_FILE_RESET });
    }
  }, [isUploaded, uploaded, dispatch]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Title title={"Admin Produk"} />
      <Navbar />
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: { xs: 820, md: 645 },
          top: 60,
        }}
      >
        <ProductsList load={productsLoading} products={Products} />

        <Footer />
      </Box>
    </Box>
  );
};

export default Products;
