import {
  Fade,
  Box,
  Typography,
  Stack,
  Rating,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useSelector } from "react-redux";

const Review = ({ open, close }) => {
  const { productLoading, Product } = useSelector((state) => state.product);

  return (
    <React.Fragment>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 350, md: 600 },
            height: 500,
            bgcolor: "#ffff",
            boxShadow: 24,
            p: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          <Box sx={{ width: "95%", display: "flex", justifyContent: "end" }}>
            <IconButton onClick={() => close()}>
              <CloseIcon color="error" />
            </IconButton>
          </Box>
          {Product?.reviews.length <= 1 ? (
            <Typography>Belum ada review</Typography>
          ) : (
            Product?.reviews?.map((review, index) => (
              <Box
                key={index + 1}
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
                <Typography>{review.user.name}</Typography>
                <Stack spacing={1}>
                  <Rating value={review.rating} readOnly />
                </Stack>
                <Typography>{review.comment}</Typography>
              </Box>
            ))
          )}
        </Box>
      </Fade>
    </React.Fragment>
  );
};

export default Review;
