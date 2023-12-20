import { Fade, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const createMarkup = (html) => {
  return { __html: html };
};

const Details = ({ open, close }) => {
  const { productLoading, Product } = useSelector((state) => state.product);

  const [currentImageIndex, setIndex] = useState(0);

  const prev = () => {
    setIndex(
      (currentImageIndex - 1 + Product.image.length) % Product.image.length
    );
  };

  const next = () => {
    setIndex((currentImageIndex + 1) % Product.image.length);
  };

  return (
    <React.Fragment>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 300, md: 700 },
            height: 560,
            bgcolor: "#ffff",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
              mb: 2,
            }}
          >
            <IconButton onClick={() => close()}>
              <CloseIcon color='error' />
            </IconButton>
          </Box>
          {productLoading ? (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Loader />
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
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
                    src={Product?.image[currentImageIndex].link}
                    alt={Product?.name}
                    loading='lazy'
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      position: "relative",
                    }}
                  />

                  <Box
                    sx={{
                      width: "115%",
                      height: "200px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      position: "absolute",
                    }}
                  >
                    <IconButton onClick={prev}>
                      <ArrowLeftIcon fontSize='large' sx={{ color: "gray" }} />
                    </IconButton>

                    <IconButton onClick={next}>
                      <ArrowRightIcon fontSize='large' />
                    </IconButton>
                  </Box>
                </Box>

                <Box
                  sx={{
                    flex: 2,
                    width: "90%",
                    display: "flex",
                    p: 2,
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{ width: 120 }}>Nama Produk</Typography>
                    <Typography fontWeight='bold'>: {Product?.name}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", mt: 1 }}>
                    <Typography sx={{ width: 120 }}>kategori</Typography>
                    <Typography fontWeight='bold'>
                      : {Product?.category}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", mt: 1 }}>
                    <Typography sx={{ width: 120 }}>Modal</Typography>
                    <Typography fontWeight='bold'>
                      :{" "}
                      {`Rp ${parseFloat(Product?.capital).toLocaleString(
                        "id-ID"
                      )}`}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", mt: 1 }}>
                    <Typography sx={{ width: 120 }}>Harga</Typography>
                    <Typography fontWeight='bold'>
                      :{" "}
                      {`Rp ${parseFloat(Product?.price).toLocaleString(
                        "id-ID"
                      )}`}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", mt: 1 }}>
                    <Typography sx={{ width: 120 }}>Profit</Typography>
                    <Typography fontWeight='bold'>
                      :{" "}
                      {`Rp ${parseFloat(Product?.profit).toLocaleString(
                        "id-ID"
                      )}`}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", mt: 1 }}>
                    <Typography sx={{ width: 120 }}>Stok</Typography>
                    <Typography fontWeight='bold'>
                      : {Product?.stock}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", mt: 1 }}>
                    <Typography sx={{ width: 120 }}>Berat</Typography>
                    <Typography fontWeight='bold'>
                      : {Product?.weight}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", mt: 1 }}>
                    <Typography sx={{ width: 120 }}>Rating</Typography>
                    <Typography fontWeight='bold'>
                      : {Product?.rating}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", mt: 1 }}>
                    <Typography sx={{ width: 120 }}>Jumlah Rating</Typography>
                    <Typography fontWeight='bold'>
                      : {Product?.ratings}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ width: "100%", mt: 2 }}>
                <Typography
                  sx={{ p: 2 }}
                  variant='body2'
                  dangerouslySetInnerHTML={createMarkup(Product?.desc)}
                />
              </Box>
            </>
          )}
        </Box>
      </Fade>
    </React.Fragment>
  );
};

export default Details;
