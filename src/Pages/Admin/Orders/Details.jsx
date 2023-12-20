import React from "react";
import { Fade, Box, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import Loader from "../../Components/Loader";

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

const Details = ({ open, close }) => {
  const { detailLoad, detail: order } = useSelector(
    (state) => state.detailOrder
  );

  return (
    <React.Fragment>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 350, md: 500 },
            bgcolor: "#ffff",
            boxShadow: 24,
            p: 2,
            display: "flex",
            alignItems: "start",
            flexDirection: "column",
          }}
          onClick={close}
        >
          {detailLoad ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "100%",
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
                }}
              >
                <Typography sx={{ width: "30%", p: 1 }}>Pelanggan</Typography>
                <Typography sx={{ width: "70%", p: 1 }}>
                  {order?.user.name}
                </Typography>
              </Box>

              <Typography sx={{ mt: 2 }} fontWeight="bold">
                Order
              </Typography>

              {order?.products.map((item) => (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    mt: 2,
                  }}
                >
                  <Typography sx={{ width: "30%", p: 1 }}>
                    {item.productId.name}
                  </Typography>
                  <Typography sx={{ width: "70%", p: 1, textAlign: "center" }}>
                    {item.qty} item
                  </Typography>
                </Box>
              ))}

              <Typography sx={{ mt: 2 }} fontWeight="bold">
                Shipment
              </Typography>

              <Typography sx={{ mt: 2, mb: 2 }}>{order?.address}</Typography>

              <Button
                fullWidth
                variant="contained"
                color="error"
                onClick={() => close()}
              >
                Tutup
              </Button>
            </>
          )}
        </Box>
      </Fade>
    </React.Fragment>
  );
};

export default Details;
