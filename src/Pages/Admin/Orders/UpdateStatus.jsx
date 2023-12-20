import React, { useEffect, useState } from "react";
import {
  Fade,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import { updateOrder } from "../../../redux/order/order_action";
import { toast } from "react-toastify";

const UpdateStatus = ({ open, close }) => {
  const dispatch = useDispatch();

  const { detailLoad, detail: order } = useSelector(
    (state) => state.detailOrder
  );

  const { loading, isUpdated, updated } = useSelector(
    (state) => state.upDelOrder
  );

  const [status, setStatus] = useState("");
  const [resi, setResi] = useState("");

  const updateHandler = (e) => {
    e.preventDefault();

    const data = {
      resi: resi,
      status: status,
    };

    dispatch(updateOrder(order?._id, data));
  };

  useEffect(() => {
    if (order) {
      setStatus(order?.status_order);
      setResi(order?.resi);
    }

    if (isUpdated) {
      close();
    } else {
      toast.error(updated);
    }
  }, [order, isUpdated, updated]);

  return (
    <React.Fragment>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            height: 220,
            bgcolor: "#ffff",
            boxShadow: 24,
            p: 4,
            display: "flex",
            alignItems: "start",
            flexDirection: "column",
          }}
        >
          {detailLoad || loading ? (
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
            <form onSubmit={updateHandler}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  label="Status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="processing">Diproses</MenuItem>
                  <MenuItem value="delivered">Dikirim</MenuItem>
                </Select>
              </FormControl>

              <TextField
                required
                sx={{ mt: 2 }}
                label="Nomor Resi"
                fullWidth
                value={resi}
                onChange={(e) => setResi(e.target.value)}
              />

              <Box sx={{ width: "100%", mt: 2 }}>
                <Button
                  fullWidth
                  color="error"
                  variant="contained"
                  onClick={close}
                >
                  Batalkan
                </Button>
              </Box>

              <Box sx={{ width: "100%", mt: 2 }}>
                <Button
                  fullWidth
                  color="success"
                  variant="contained"
                  type="submit"
                >
                  Update
                </Button>
              </Box>
            </form>
          )}
        </Box>
      </Fade>
    </React.Fragment>
  );
};

export default UpdateStatus;
