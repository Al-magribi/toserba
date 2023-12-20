import { Box, Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProduct } from "../../../redux/product/productAction";
import Detail from "./Detail";

const Confirmation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.user);

  const confirm = JSON.parse(localStorage.getItem("process"));

  const cancel = () => {
    localStorage.removeItem("process");
    navigate("/");
  };

  useEffect(() => {
    if (confirm) {
      dispatch(getProduct(confirm?.product));
    }
  }, []);

  useEffect(() => {
    if (confirm === null || isAuthenticated === false) {
      navigate("/");
    }
  }, [confirm, isAuthenticated]);

  return (
    <>
      {confirm && (
        <Box
          sx={{
            width: "90%",
            display: "flex",
            alignItems: "center",
            p: 2,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Detail Produk */}
          <Box
            sx={{
              flex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              p: 2,
              m: 2,
              borderRadius: "5px",
              boxShadow: 4,
              width: "100%",
            }}
          >
            <Detail />
          </Box>

          {/* KONFIRMASI */}
          <Box
            sx={{
              flex: 1,
              width: "100%",
              borderRadius: "5px",
              boxShadow: 4,
              p: 2,
              m: 2,
            }}
          >
            <TextField
              fullWidth
              label="Total Harga Produk"
              value={`Rp ${parseFloat(confirm.subtotal).toLocaleString(
                "id-ID"
              )}`}
              sx={{ mt: 2 }}
              inputProps={{ readOnly: true }}
            />

            <TextField
              fullWidth
              label="Ongkir"
              value={`Rp ${parseFloat(confirm.shippingCost).toLocaleString(
                "id-ID"
              )}`}
              sx={{ mt: 2 }}
              inputProps={{ readOnly: true }}
            />

            <TextField
              fullWidth
              label="Total tagihan"
              value={`Rp ${parseFloat(confirm.totalCost).toLocaleString(
                "id-ID"
              )}`}
              sx={{ mt: 2 }}
              inputProps={{ readOnly: true }}
            />

            <Box sx={{ mt: 2, width: "100%" }}>
              <textarea
                style={{
                  width: "95%",
                  minHeight: "70px",
                  outline: "none",
                  padding: "10px",
                }}
                readOnly
              >
                {confirm.shippingAddress}
              </textarea>
            </Box>

            <Box sx={{ width: "100%", mt: 2 }}>
              <Button
                sx={{
                  width: "100%",
                  bgcolor: "#29b932",
                  color: "#fff",
                  "&:hover": { bgcolor: "#29b932" },
                }}
              >
                Proses Pembayaran
              </Button>

              <Button
                variant="contained"
                color="error"
                sx={{
                  width: "100%",
                  mt: 2,
                }}
                onClick={cancel}
              >
                Batalkan pembayaran
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Confirmation;
