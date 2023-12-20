import {
  Backdrop,
  Box,
  IconButton,
  Input,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState, useRef } from "react";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import MessageIcon from "@mui/icons-material/Message";
import { green, orange, red, yellow } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { getOrderDetail } from "../../../redux/order/order_action";
import DetailOrder from "./DetailOrder";
import Review from "./Review";
import { upPayment } from "../../../redux/payment/payment_action";

const Headers = [
  { name: "Order" },
  { name: "Detail" },
  { name: "Bill" },
  { name: "Date" },
  { name: "Status" },
  { name: "Shipment" },
  { name: "Cost" },
  { name: "Resi" },
  { name: "Action" },
];

const DetailTransaction = ({ Orders }) => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrder, setFiltered] = useState(Orders);

  const search_function = (e) => {
    const input_value = e.target.value;

    setSearchTerm(input_value);

    const filered = Orders?.filter((item) =>
      item.order.toLowerCase().includes(input_value.toLowerCase())
    );

    setFiltered(filered);
  };

  const [detail, setDetail] = useState(false);
  const [review, setReview] = useState(false);

  const detailOrder = (user, orderId) => {
    dispatch(getOrderDetail(user, orderId));

    setDetail(true);
  };

  const reviewOrder = (user, orderId) => {
    dispatch(getOrderDetail(user, orderId));

    setReview(true);
  };

  const updatePayment = (id) => {
    dispatch(upPayment(id));
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box
        sx={{
          height: "10%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Pesanan Kamu</Typography>

        <Input
          type="text"
          sx={{ p: 1 }}
          placeholder="Search by oder"
          onChange={search_function}
          value={searchTerm}
        />
      </Box>
      <Box sx={{ display: "flex" }}>
        {Orders?.length <= 0 ? (
          <Typography fontStyle="italic">* Belum ada pesanan</Typography>
        ) : (
          <Box sx={{ width: { xs: "95%", md: "100%" }, m: 1 }}>
            <Paper>
              <TableContainer sx={{ maxHeight: 538 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {Headers?.map((item, index) => (
                        <TableCell key={index + 1} align="center">
                          {item.name}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredOrder?.map((item) => {
                      // Konversi item.createdAt ke objek tanggal (Date)
                      const createdAtDate = new Date(item.createdAt);

                      // Buat pilihan format tanggal
                      const options = {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      };

                      // Format tanggal
                      const formattedDate = createdAtDate.toLocaleDateString(
                        "id-ID",
                        options
                      );

                      return (
                        <TableRow key={item._id}>
                          <TableCell align="center">{item.order}</TableCell>
                          <TableCell align="center">
                            <IconButton
                              onClick={() => detailOrder(item.user, item.order)}
                            >
                              <LocalMallIcon sx={{ color: green[500] }} />
                            </IconButton>
                          </TableCell>
                          <TableCell align="center">
                            Rp
                            {parseFloat(item.payment).toLocaleString("id-ID")}
                          </TableCell>
                          <TableCell align="center">{formattedDate}</TableCell>
                          <TableCell align="center">
                            <Typography
                              fontWeight="bold"
                              sx={{
                                color:
                                  item.status === "settlement"
                                    ? green[800]
                                    : item.status === "pending"
                                    ? orange[500]
                                    : red[600],
                              }}
                            >
                              {item.status.toUpperCase()}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography
                              fontWeight="bold"
                              sx={{
                                color:
                                  item.status_order === "processing"
                                    ? yellow[800]
                                    : red[500],
                              }}
                            >
                              {item.status_order.toUpperCase()}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            Rp
                            {parseFloat(item.shipping_cost).toLocaleString(
                              "id-ID"
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {item.resi ? item.resi : "JNE12345678910"}
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              disabled={
                                item.status === "expire" ||
                                item.status === "settlement"
                              }
                              onClick={() => updatePayment(item.order)}
                            >
                              <CloudSyncIcon
                                sx={{
                                  color:
                                    item.status === "expire" ||
                                    item.status === "settlement"
                                      ? "grey"
                                      : green[500],
                                }}
                              />
                            </IconButton>

                            <IconButton
                              disabled={item.status === "expire" ? true : false}
                              onClick={() => reviewOrder(item.user, item.order)}
                            >
                              <MessageIcon
                                sx={{
                                  color:
                                    item.status === "expire"
                                      ? "grey"
                                      : red[500],
                                }}
                              />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        )}

        <Modal
          open={detail}
          onClose={() => setDetail(false)}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{ backdrop: { timeout: 500 } }}
        >
          <div ref={useRef(null)}>
            <DetailOrder open={detail} close={() => setDetail(false)} />
          </div>
        </Modal>

        <Modal
          open={review}
          onClose={() => setReview(false)}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{ backdrop: { timeout: 500 } }}
        >
          <div ref={useRef(null)}>
            <Review open={review} close={() => setReview(false)} />
          </div>
        </Modal>
      </Box>
    </Box>
  );
};

export default DetailTransaction;
