import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { users } from "../../../Constant/Users";
import { useSelector } from "react-redux";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Cards = () => {
  const { productsLoading, Products } = useSelector((state) => state.products);
  const { loadingOrders, Orders } = useSelector((state) => state.Orders);

  const completedOrders = Orders?.filter(
    (order) => order.status === "settlement"
  );

  const totalIncome = completedOrders?.reduce(
    (acc, order) =>
      acc +
      order.products.reduce(
        (accProduct, product) => accProduct + product.total_price,
        0
      ),
    0
  );

  const totalProfit = completedOrders?.reduce(
    (acc, order) =>
      acc +
      order.products.reduce(
        (accProduct, product) => accProduct + product.total_profit,
        0
      ),
    0
  );

  return (
    <>
      <Card
        sx={{
          width: { xs: 150, md: 200 },
          m: 1,
          maxHeight: 90,
          bgcolor: getRandomColor(),
        }}
      >
        <CardActionArea>
          <CardContent sx={{ color: "white" }}>
            <Typography variant="body2">Pendapatan</Typography>
            <Typography
              fontWeight="bold"
              letterSpacing={1.5}
              sx={{ mt: 1, fontSize: { xs: 12, md: 16 } }}
            >
              {`Rp ${parseFloat(totalIncome).toLocaleString("id-ID")}`}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card
        sx={{
          width: { xs: 150, md: 200 },
          m: 1,
          maxHeight: 90,
          bgcolor: getRandomColor(),
        }}
      >
        <CardActionArea>
          <CardContent sx={{ color: "white" }}>
            <Typography variant="body2">Profit</Typography>
            <Typography
              fontWeight="bold"
              letterSpacing={1.5}
              sx={{ mt: 1, fontSize: { xs: 12, md: 16 } }}
            >
              {`Rp ${parseFloat(totalProfit).toLocaleString("id-ID")}`}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card
        sx={{
          width: { xs: 150, md: 200 },
          m: 1,
          maxHeight: 90,
          bgcolor: getRandomColor(),
        }}
      >
        <CardActionArea>
          <CardContent sx={{ color: "white" }}>
            <Typography variant="body2">Total Transaksi</Typography>
            <Typography
              fontWeight="bold"
              letterSpacing={1.5}
              sx={{ mt: 1, fontSize: { xs: 12, md: 16 } }}
            >
              {loadingOrders ? "--" : Orders?.length}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card
        sx={{
          width: { xs: 150, md: 200 },
          m: 1,
          maxHeight: 90,
          bgcolor: getRandomColor(),
        }}
      >
        <CardActionArea>
          <CardContent sx={{ color: "white" }}>
            <Typography variant="body2">Transaksi Berhasil</Typography>
            <Typography
              fontWeight="bold"
              letterSpacing={1.5}
              sx={{ mt: 1, fontSize: { xs: 12, md: 16 } }}
            >
              {loadingOrders ? "--" : completedOrders?.length}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card
        sx={{
          width: { xs: 150, md: 200 },
          m: 1,
          maxHeight: 90,
          bgcolor: getRandomColor(),
        }}
      >
        <CardActionArea>
          <CardContent sx={{ color: "white" }}>
            <Typography variant="body2">Pelanggan</Typography>
            <Typography
              fontWeight="bold"
              letterSpacing={1.5}
              sx={{ mt: 1, fontSize: { xs: 14, md: 16 } }}
            >
              {users?.length}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card
        sx={{
          width: { xs: 150, md: 200 },
          m: 1,
          maxHeight: 90,
          bgcolor: getRandomColor(),
        }}
      >
        <CardActionArea>
          <CardContent sx={{ color: "white" }}>
            <Typography variant="body2">Produk</Typography>
            <Typography
              fontWeight="bold"
              letterSpacing={1.5}
              sx={{ mt: 1, fontSize: { xs: 12, md: 16 } }}
            >
              {productsLoading ? "--" : Products?.length}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default Cards;
