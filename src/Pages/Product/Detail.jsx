import {
  Box,
  Typography,
  Stack,
  Rating,
  Button,
  Modal,
  Backdrop,
  IconButton,
} from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { useState, useRef } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Reviews from "./Reviews";

const createMarkup = (html) => {
  return { __html: html };
};

const Detail = ({ product }) => {
  const [showReviews, setShowReviews] = useState(false);
  const [currentImageIndex, setIndex] = useState(0);

  const prev = () => {
    setIndex(
      (currentImageIndex - 1 + product?.image.length) % product?.image.length
    );
  };

  const next = () => {
    setIndex((currentImageIndex + 1) % product?.image.length);
  };

  return (
    <Box sx={{ display: "flex", flex: 2, flexDirection: "column" }}>
      {/* Detail produk */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            flex: 1,
            width: "90%",
            display: "flex",
            p: 2,
            position: "relative",
            justifyContent: "center",
          }}
        >
          <img
            src={product?.image[currentImageIndex]?.link}
            alt={product?.name}
            loading="lazy"
            style={{
              width: "80%",
              height: "300px",
              objectFit: "cover",
              borderRadius: "10px",
              position: "relative",
            }}
          />

          <Box
            sx={{
              width: "90%",
              height: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "absolute",
            }}
          >
            <IconButton onClick={prev}>
              <ArrowLeftIcon fontSize="large" sx={{ color: "gray" }} />
            </IconButton>

            <IconButton onClick={next}>
              <ArrowRightIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
        {/* DETAIL PRODUK */}
        <Box sx={{ display: "flex", flex: 1, p: 2, flexDirection: "column" }}>
          <Typography variant="h6" fontWeight="bold">
            {product?.name}
          </Typography>

          <Typography
            variant="body"
            color="#A9A9A9"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <StarRoundedIcon sx={{ color: "#FFA500" }} />
            <span style={{ marginLeft: "5px", marginRight: "5px" }}>
              {product?.rating || 0} dari ({product?.reviews?.length} rating)
            </span>
          </Typography>

          <Typography
            sx={{ mt: 2 }}
            variant="body2"
            color="#A9A9A9"
          >{`${product?.weight} gram`}</Typography>

          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ mt: 2 }}
          >{`Rp ${parseFloat(product?.price).toLocaleString(
            "id-ID"
          )}`}</Typography>

          <Box sx={{ width: "100%", mt: 2 }}>
            <article dangerouslySetInnerHTML={createMarkup(product?.desc)} />
          </Box>
        </Box>
      </Box>
      {/* Reviews */}
      <Box sx={{ p: 2, display: "flex", flexWrap: "wrap" }}>
        <Button
          fullWidth
          variant="outlined"
          color="success"
          onClick={() => setShowReviews(true)}
        >
          {`Reviews (${product?.reviews.length})`}
        </Button>
      </Box>

      <Modal
        open={showReviews}
        onClose={() => setShowReviews(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 1000 } }}
      >
        <div ref={useRef(null)}>
          <Reviews
            open={showReviews}
            close={() => setShowReviews(false)}
            reviews={product?.reviews}
          />
        </div>
      </Modal>
    </Box>
  );
};

export default Detail;
