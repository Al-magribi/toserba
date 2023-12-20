import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { useSelector, useDispatch } from "react-redux";

import { getProducts } from "../../redux/product/productAction";

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { productsLoading, Products } = useSelector((state) => state.products);

  const categories = [...new Set(Products?.map((product) => product.category))];
  const [selectedCategory, setSelectedCategory] = useState("");

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getProducts(search, selectedCategory));
  }, [search, selectedCategory]);

  const onChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const productDetailHandler = (name) => {
    navigate(`/produk/${name}`);
  };

  // PAGINATION
  const [productPerPage, setProductPerPage] = useState(60);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * productPerPage;
  const endIndex = startIndex + productPerPage;
  const paginatedProduct = Products && Products.slice(startIndex, endIndex);

  const pageCount = Math.ceil((Products && Products.length) / productPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "start",
        justifyContent: "space-evenly",
      }}
    >
      {/* FITUR PENCARIAN DAN KATEGORI */}
      <Box
        sx={{
          m: 1,
          width: "100%",
          height: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* PENCARIAN */}
        <Box
          sx={{
            width: { xs: "100%", md: "25%" },
            height: 40,
            backgroundColor: "#dddddd",
            borderRadius: "5px",
            display: "flex",
            mb: { xs: 2, md: 0 },
          }}
        >
          {/* ICON */}
          <Box
            sx={{
              width: "10%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SearchOutlinedIcon sx={{ color: "#ffff" }} />
          </Box>
          <Box
            sx={{
              width: "90%",
              height: "100%",
            }}
          >
            <input
              placeholder="Cari sesuatu ..."
              style={{
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
                width: "100%",
                height: "100%",
              }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
        </Box>

        {/* KATEGORI */}
        <Box sx={{ width: { xs: "100%", md: "25%" } }}>
          <FormControl fullWidth>
            <InputLabel id="category">Kategori</InputLabel>
            <Select
              label="kategori"
              value={selectedCategory}
              onChange={onChange}
            >
              <MenuItem value={""}>Semua Produk</MenuItem>
              {categories.map((category) => {
                const product = Products.find(
                  (product) => product.category === category
                );
                return (
                  <MenuItem key={product._id} value={category}>
                    {category}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* DAFTAR SEMUA PRODUK */}
      {paginatedProduct?.map((product) => (
        <Card
          key={product._id}
          sx={{
            width: { xs: 145, md: 210 },
            minHeight: { xs: 270, md: 280 },
            m: { xs: 0.5, md: 1 },
            "&:hover": { cursor: "pointer" },
          }}
          onClick={() => productDetailHandler(product.name)}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              alt={product.name}
              image={product.image[0] ? product.image[0].link : null}
              sx={{ minHeight: { xs: 150, md: 200 } }}
            />
            <CardContent>
              <Typography
                sx={{ display: { xs: "none", md: "flex" } }}
                variant="body2"
              >{`${product.name.slice(0, 20)} ...`}</Typography>

              <Typography
                sx={{ display: { xs: "flex", md: "none" } }}
                variant="body2"
              >{`${product.name.slice(0, 10)} ...`}</Typography>
              <Typography
                fontWeight="bold"
                fontSize={16}
                variant="body2"
              >{`Rp ${parseFloat(product.price).toLocaleString(
                "id-ID"
              )}`}</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ display: "flex", alignItems: "center" }}>
                  <StarRoundedIcon sx={{ color: "#FFA500" }} />
                  <span style={{ marginLeft: "5px" }}>{product.rating}</span>
                </Typography>
                <Typography>
                  <span>Stok</span> : {product.stock}
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}

      <Box
        sx={{
          width: "100%",
          mt: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pagination
          count={pageCount || 1}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default ProductList;
