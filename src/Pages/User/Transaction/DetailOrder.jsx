import { Box, Fade, IconButton, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

const DetailOrder = ({ open, close }) => {
  const { detail } = useSelector((state) => state.detailOrder);
  return (
    <div>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: { xs: 350, md: 500 },
            bgcolor: "#ffff",
            boxShadow: 24,
            p: 2,
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "end", m: 1 }}>
            <IconButton sx={{ color: "red" }} onClick={() => close()}>
              <CloseIcon />
            </IconButton>
          </Box>

          {detail
            ? detail?.products.map((item) => (
                <Box
                  key={item._id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    m: 1,
                    height: 100,
                  }}
                >
                  <img
                    src={item.productId.image[0].link}
                    alt={item.productId.name}
                    loading="lazy"
                    style={{
                      height: "100px",
                      width: "100px",
                      objectFit: "cover",
                      marginRight: "20px",
                    }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-evenly",
                      height: "100%",
                    }}
                  >
                    <Typography fontWeight="bold">
                      {item.productId.name}
                    </Typography>
                    <Typography variant="body">{item.qty} Barang</Typography>
                    <Typography
                      fontWeight="bold"
                      variant="body"
                      fontStyle="italic"
                    >
                      Rp {parseFloat(item.total_price).toLocaleString("id-ID")}
                    </Typography>
                  </Box>
                </Box>
              ))
            : null}
        </Box>
      </Fade>
    </div>
  );
};

export default DetailOrder;
