import { Box, Typography } from "@mui/material";
import { Products } from "../../Constant/Products";

const Footer = () => {
  const year = new Date();
  const categories = [...new Set(Products.map((product) => product.category))];

  return (
    <Box sx={{ boxShadow: 4 }}>
      <Box
        sx={{
          width: "100%",
          minHeight: 80,
          display: "flex",

          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            p: 4,
          }}
        >
          <Box>
            <Typography variant="body2">Pilihan Kategori</Typography>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {categories.map((category) => (
              <Typography
                key={category}
                variant="outlined"
                sx={{ m: 1, "&:hover": { cursor: "pointer" } }}
              >
                {category}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <img
            src="/Logo1.png"
            alt="logo"
            style={{
              height: "50px",
              objectFit: "contain",
              marginBottom: "10px",
              minWidth: "150px",
            }}
          />

          <img
            src="https://cdn.dribbble.com/users/1303972/screenshots/3704600/media/420a65f73031a581f03212bc1b1efd1a.png?compress=1&resize=400x300&vertical=top"
            alt="midtrans"
            style={{ height: 100, minWidth: "100px", objectFit: "cover" }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 40,
        }}
      >
        &copy; Almagribi {year.getFullYear()}
      </Box>
    </Box>
  );
};

export default Footer;
