import {
  Box,
  Typography,
  Stack,
  Rating,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import Navbar from "../Components/Navbar";
import Counter from "./Counter";
import Footer from "../Components/Footer";
import Title from "../Title";
import { useEffect, useState } from "react";
import Detail from "./Detail";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../redux/product/productAction";
import Loader from "../Components/Loader";
import { getProvinces } from "../../redux/shipping_cost/shippingAction";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const productName = params.name;

  const { Product, productLoading } = useSelector((state) => state.product);

  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    dispatch(getProduct(productName));

    dispatch(getProvinces());
  }, [dispatch]);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Title title={Product?.name} />
      <Navbar />

      {productLoading ? (
        <Box
          sx={{
            top: "70px",
            position: "absolute",
            width: "98%",
            height: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader />
        </Box>
      ) : (
        <Box
          sx={{
            top: "70px",
            position: "absolute",
            width: "98%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              minHeight: "83vh",
            }}
          >
            {/* PRODUK */}
            <Detail product={Product} />

            {/* Counter */}
            <Box
              sx={{ display: "flex", flex: 1, p: 2, justifyContent: "center" }}
            >
              <Counter product={Product} />
            </Box>
          </Box>

          <Box sx={{ mt: 1 }}>
            <Footer />
          </Box>
        </Box>
      )}

      <Modal
        open={showReviews}
        onClose={() => setShowReviews(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 1000 } }}
      >
        <Fade in={showReviews}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 340,
              height: 500,
              bgcolor: "#ffff",
              boxShadow: 24,
              p: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              flexDirection: "column",
              overflowY: "scroll",
            }}
            onClick={() => setShowReviews(false)}
          >
            {Product?.reviews?.map((review) => (
              <Box
                key={review.user}
                sx={{
                  width: "90%",
                  display: "flex",
                  flexDirection: "column",
                  m: 1,
                  boxShadow: 2,
                  p: 2,
                  borderRadius: "5px",
                }}
              >
                <Typography>{review.name}</Typography>
                <Stack spacing={1}>
                  <Rating defaultValue={review.rating} readOnly />
                </Stack>
                <Typography>{review.comment}</Typography>
              </Box>
            ))}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default ProductDetail;
