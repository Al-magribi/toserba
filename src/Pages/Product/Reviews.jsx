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

const Reviews = ({ open, close, reviews }) => {
  return (
    <div>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 350, md: 800 },
            height: 500,
            bgcolor: "#ffff",
            boxShadow: 24,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            flexDirection: "column",
            overflow: "auto",
            borderRadius: "10px",
          }}
        >
          <Box sx={{ width: "95%", display: "flex", justifyContent: "end" }}>
            <IconButton onClick={() => close()}>
              <CloseIcon color="error" />
            </IconButton>
          </Box>
          {reviews.length <= 0 ? (
            <Typography>Belum ada review</Typography>
          ) : (
            reviews?.map((review, index) => (
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
                <Typography>
                  {review.user ? review.user.name : "User Dummy"}
                </Typography>
                <Stack spacing={1}>
                  <Rating defaultValue={review.rating || 0} readOnly />
                </Stack>

                <Typography>{review.comment}</Typography>
              </Box>
            ))
          )}
        </Box>
      </Fade>
    </div>
  );
};

export default Reviews;
