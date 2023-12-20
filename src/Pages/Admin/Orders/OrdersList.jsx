import {
  Box,
  Typography,
  IconButton,
  Modal,
  Backdrop,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Input,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import Details from "./Details";
import UpdateStatus from "./UpdateStatus";
import { useDispatch } from "react-redux";
import { deleteOrder, getOrderDetail } from "../../../redux/order/order_action";

const Headers = [
  { name: "Order" },
  { name: "Customer" },
  { name: "Bill" },
  { name: "Date" },
  { name: "Status" },
  { name: "Shipment" },
  { name: "Resi" },
  { name: "Phone" },
  { name: "Action" },
];

const OrdersList = ({ Orders }) => {
  const dispatch = useDispatch();

  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const search_function = (e) => {
    setSearchTerm(e.target.value);
  };

  const filtered = (order) => {
    return order.order.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const filteredOrder = Orders?.filter(filtered);

  const detailHandler = (userId, orderId) => {
    dispatch(getOrderDetail(userId, orderId));

    setShowDetail(true);
  };

  const editHandler = (userId, orderId) => {
    dispatch(getOrderDetail(userId, orderId));
    setShowEdit(true);
  };

  const deleteHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        mb: 2,
      }}
    >
      <Box sx={{ mb: 2, width: "99%" }}>
        <Input
          sx={{ p: 1 }}
          type="text"
          placeholder="Search Order"
          onChange={search_function}
          value={searchTerm}
        />
      </Box>

      <Paper sx={{ width: "99%", overflow: "hidden" }}>
        <TableContainer sx={{ height: { xs: 720, md: 550 } }}>
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
              {filteredOrder?.map((item) => (
                <TableRow key={item._id}>
                  <TableCell align="center">{item.order}</TableCell>
                  <TableCell align="center">{item.user.name}</TableCell>
                  <TableCell align="center">
                    Rp {parseFloat(item.payment).toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell align="center">
                    {new Date(item.createdAt).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell
                    sx={{
                      color:
                        item.status === "settlement"
                          ? "green"
                          : item.status === "pending"
                          ? "orange"
                          : item.status === "expired"
                          ? "red"
                          : null,
                    }}
                    align="center"
                  >
                    {item.status.toUpperCase()}
                  </TableCell>
                  <TableCell
                    sx={{
                      color:
                        item.status_order === "processing"
                          ? "orange"
                          : item.status_order === "delivered"
                          ? "red"
                          : "green",
                    }}
                    align="center"
                  >
                    {item.status_order.toUpperCase()}
                  </TableCell>
                  <TableCell align="center">
                    {item.resi ? item.resi : "not available"}
                  </TableCell>
                  <TableCell align="center">{item.phone}</TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <IconButton
                        onClick={() => detailHandler(item.user._id, item.order)}
                      >
                        <MoreVertIcon sx={{ color: "#2192FF" }} />
                      </IconButton>

                      <IconButton
                        onClick={() => editHandler(item.user._id, item.order)}
                      >
                        <CreateOutlinedIcon sx={{ color: "orange" }} />
                      </IconButton>

                      <IconButton onClick={() => deleteHandler(item._id)}>
                        <DeleteOutlineIcon sx={{ color: "red" }} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Modal
        open={showDetail}
        onClose={() => setShowDetail(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 1000 } }}
      >
        <div ref={React.useRef(null)}>
          <Details open={showDetail} close={() => setShowDetail(false)} />
        </div>
      </Modal>

      <Modal
        open={showEdit}
        onClose={() => setShowEdit(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 1000 } }}
      >
        <div ref={React.useRef(null)}>
          <UpdateStatus open={showEdit} close={() => setShowEdit(false)} />
        </div>
      </Modal>
    </Box>
  );
};

export default OrdersList;
