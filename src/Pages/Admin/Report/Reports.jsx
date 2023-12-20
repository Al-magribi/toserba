import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import * as React from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";

const DatePickerInput = React.forwardRef(({ value, onClick }, ref) => {
  return (
    <Button color="primary" variant="contained" onClick={onClick} ref={ref}>
      {value}
    </Button>
  );
});

const Reports = () => {
  const { Orders } = useSelector((state) => state.Orders);

  // KONFIGURASI TANGGAL
  const [today, setToday] = React.useState(new Date());
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  React.useEffect(() => {
    setToday(new Date());
  }, []);

  const dateString = format(today, "dd MMMM yyyy", { locale: idLocale });
  const startString = format(startDate, "dd MMMM yyyy", { locale: idLocale });

  const completedOrders = Orders?.filter(
    (order) => order.status === "settlement"
  );

  const ordersByDate = () => {
    const filtered = completedOrders?.filter((order) => {
      const orderDate = new Date(order.createdAt);

      return orderDate >= startDate && orderDate <= endDate;
    });

    return filtered;
  };

  const filteredOrders = ordersByDate();

  const componentRef = React.useRef(null);
  const print = useReactToPrint({ content: () => componentRef.current });

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 2,
          mb: 2,
          zIndex: 1000,
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              mr: 2,
            }}
          >
            <Typography fontWeight="bold" sx={{ width: 70 }}>
              Dari
            </Typography>
            <DatePicker
              closeOnScroll={true}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              customInput={<DatePickerInput />}
              maxDate={today}
              dateFormat="dd MM yyyy"
            />
          </Box>

          {/* SAMPAI TANGGAL */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <Typography fontWeight="bold" sx={{ width: 70 }}>
              Sampai
            </Typography>
            <DatePicker
              closeOnScroll={true}
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              customInput={<DatePickerInput />}
              maxDate={today}
              dateFormat="dd MM yyyy"
            />
          </Box>
        </Box>

        <Button variant="contained" color="success" onClick={print}>
          donwload
        </Button>
      </Box>

      <Paper sx={{ p: 1, width: "98%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: { xs: 700, md: 560 } }}>
          <Table stickyHeader aria-label="sticky table" ref={componentRef}>
            <TableHead sx={{ bgcolor: "blue" }}>
              <TableRow>
                <TableCell>Order</TableCell>
                <TableCell>Tanggal</TableCell>
                <TableCell>Pelanggan</TableCell>
                <TableCell>Produk</TableCell>
                <TableCell>Jumlah</TableCell>
                <TableCell>Harga</TableCell>
                <TableCell>Ongkir</TableCell>
                <TableCell>Total Harga</TableCell>
                <TableCell>Profit</TableCell>
                <TableCell>Total Profit</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredOrders?.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.order}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString("id-ID")}
                  </TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>
                    <Box sx={{ width: "100%" }}>
                      {order.products.map((product) => (
                        <p key={product.productId._id}>
                          {product.productId.name}
                        </p>
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ width: "100%" }}>
                      {order.products.map((product) => (
                        <p key={product._id}>{product.qty}</p>
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ width: "100%" }}>
                      {order.products.map((product) => (
                        <p key={product.productId._id}>{`Rp ${parseFloat(
                          product.productId.price
                        ).toLocaleString("id-ID")}`}</p>
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ width: "100%" }}>
                      {`Rp ${parseFloat(order.shipping_cost).toLocaleString(
                        "id-ID"
                      )}`}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ width: "100%" }}>
                      {order.products.map((product) => (
                        <p key={product._id}>{`Rp ${parseFloat(
                          product.total_price
                        ).toLocaleString("id-ID")}`}</p>
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ width: "100%" }}>
                      {order.products.map((product) => (
                        <p key={product._id}>{`Rp ${parseFloat(
                          product.productId.profit
                        ).toLocaleString("id-ID")}`}</p>
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ width: "100%" }}>
                      {order.products.map((product) => (
                        <p key={product._id}>{`Rp ${parseFloat(
                          product.total_profit
                        ).toLocaleString("id-ID")}`}</p>
                      ))}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={10}>
                  <Box
                    sx={{
                      width: "100%",
                      height: 100,
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "space-evenly",
                      flexDirection: "column",
                    }}
                  >
                    <p>
                      Tanggal: <span>{startString}</span> -
                      <span>{dateString}</span>
                    </p>
                    <p>
                      Pendapatan:
                      <span>
                        {` Rp ${parseFloat(
                          filteredOrders?.reduce(
                            (acc, order) =>
                              acc +
                              order.products.reduce(
                                (accProduct, product) =>
                                  accProduct + product.total_price,
                                0
                              ),
                            0
                          )
                        ).toLocaleString("id-ID")}`}
                      </span>
                    </p>
                    <p>
                      Profit:
                      <span>
                        {` Rp ${parseFloat(
                          filteredOrders?.reduce(
                            (acc, order) =>
                              acc +
                              order.products.reduce(
                                (accProduct, product) =>
                                  accProduct + product.total_profit,
                                0
                              ),
                            0
                          )
                        ).toLocaleString("id-ID")}`}
                      </span>
                    </p>
                    <p>
                      Jumlah Transaksi: <span>{filteredOrders?.length}</span>
                    </p>
                  </Box>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Reports;
