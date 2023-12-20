import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import Loader from "../../Components/Loader";

const columns = [
  {
    field: "order",
    headerName: "Order",
    headerAlign: "center",
    align: "center",
    width: 150,
  },
  {
    field: "user",
    headerName: "Pelanggan",
    headerAlign: "center",
    width: 200,
    renderCell: (params) => {
      return (
        <Typography align="center" sx={{ width: "100%" }}>
          {params.row.user.name}
        </Typography>
      );
    },
  },
  {
    field: "payment",
    headerName: "Tagihan",
    headerAlign: "center",
    align: "center",
    width: 180,
    renderCell: (params) => {
      return (
        <p>{`Rp ${parseFloat(params.row.payment).toLocaleString("id-ID")}`}</p>
      );
    },
  },

  {
    field: "createdAt",
    headerName: "Tanggal",
    headerAlign: "center",
    align: "center",
    width: 200,
    renderCell: (params) => {
      return (
        <p>
          {new Date(params.row.createdAt).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      );
    },
  },
  {
    field: "status",
    headerName: "Status Tagihan",
    headerAlign: "center",
    align: "center",
    width: 200,
    renderCell: (params) => {
      return (
        <Typography
          fontWeight="bold"
          sx={{
            color:
              params.row.status === "settlement"
                ? "green"
                : params.row.status === "pending"
                ? "orange"
                : "red",
          }}
        >
          {params.row.status.toUpperCase()}
        </Typography>
      );
    },
  },
  {
    field: "status_order",
    headerName: "Status Pengiriman",
    headerAlign: "center",
    align: "center",
    width: 200,
    renderCell: (params) => {
      return (
        <Typography
          fontWeight="bold"
          style={{
            color:
              params.row.status_order === "processing"
                ? "orange"
                : params.row.status_order === "delivered"
                ? "red"
                : "green",
          }}
        >
          {params.row.status_order.toUpperCase()}
        </Typography>
      );
    },
  },
  {
    field: "address",
    headerName: "Alamat Pengiriman",
    headerAlign: "center",
    align: "center",
    width: 200,
  },
];

const OrdersData = () => {
  const { loadingOrders, Orders } = useSelector((state) => state.Orders);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "start",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography fontSize={16} fontWeight="bold">
        Pesanan Terbaru
      </Typography>

      <Box sx={{ maxWidth: "100%", height: 400, mt: 2 }}>
        {loadingOrders ? (
          <Box>
            <Loader />
          </Box>
        ) : (
          <DataGrid
            rows={Orders ? Orders : []}
            getRowId={(row) => row._id}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 50,
                },
              },
            }}
            pageSizeOptions={[50]}
          />
        )}
      </Box>
    </Box>
  );
};

export default OrdersData;
