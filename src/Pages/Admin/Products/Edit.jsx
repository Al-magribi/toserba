import { Fade, Box, TextField, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import "react-quill/dist/quill.snow.css";
import Loader from "../../Components/Loader";
import { updateProduct } from "../../../redux/product/productAction";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Edit = ({ open, close }) => {
  const dispatch = useDispatch();

  const { productLoading, Product } = useSelector((state) => state.product);
  const { loading, isUpdated } = useSelector((state) => state.upDelProduct);

  const formRef = useRef(null);
  const inputRef = useRef(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [capital, setCapital] = useState(0);
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [weight, setWeight] = useState(0);
  const [previewImages, setPreviewImages] = useState([]);
  const [newImages, setNewImages] = useState(null);

  const handleQuillChange = (value) => {
    setDesc(value);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const upImage = (e) => {
    const files = Array.from(e.target.files);

    setPreviewImages((prevImages) => [
      ...prevImages,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);

    setNewImages(files);
  };

  const handleImageClick = (index) => {
    setPreviewImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (newImages) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("price", price);
      formData.append("capital", capital);
      formData.append("category", category);
      formData.append("stock", stock);
      formData.append("weight", weight);

      // Append each file to the FormData
      if (newImages) {
        newImages.forEach((file, index) => {
          formData.append(`image`, file);
        });
      }

      dispatch(updateProduct(formData, Product._id));
    } else {
      const data = {
        name: name,
        price: price,
        capital: capital,
        desc: desc,
        category: category,
        stock: stock,
        weight: weight,
        image: Product?.image,
      };

      dispatch(updateProduct(data, Product._id));
    }
  };

  useEffect(() => {
    if (Product) {
      setName(Product?.name);
      setPrice(Product?.price);
      setCapital(Product?.capital);
      setDesc(Product?.desc);
      setCategory(Product?.category);
      setStock(Product?.stock);
      setWeight(Product?.weight);
      setPreviewImages(Product?.image);
    }

    if (isUpdated) {
      close();
    }
  }, [Product, isUpdated]);
  return (
    <React.Fragment>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            height: 500,
            bgcolor: "#ffff",
            boxShadow: 24,
            p: 4,
            display: "flex",
            alignItems: "start",
            overflowY: "scroll",
          }}
        >
          {productLoading || loading ? (
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
            <form
              ref={formRef}
              style={{ width: "100%" }}
              onSubmit={submitHandler}
            >
              <TextField
                fullWidth
                type="text"
                name="name"
                label="Nama Produk"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                fullWidth
                type="text"
                name="category"
                label="Kategori"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={{ mt: 2 }}
              />

              <TextField
                fullWidth
                name="price"
                label="Harga"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                sx={{ mt: 2 }}
              />

              <TextField
                fullWidth
                name="capital"
                label="Modal"
                value={capital}
                onChange={(e) => setCapital(e.target.value)}
                sx={{ mt: 2 }}
              />

              <TextField
                fullWidth
                type="number"
                name="stock"
                label="Stok"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                sx={{ mt: 2 }}
              />

              <TextField
                fullWidth
                type="number"
                name="weight"
                label="Berat"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                sx={{ mt: 2 }}
                placeholder="dalam satuan gram"
              />

              <Box sx={{ width: "100%", mt: 2 }}>
                <ReactQuill
                  theme="snow"
                  name="desc"
                  value={desc}
                  onChange={handleQuillChange}
                />
              </Box>

              <Box
                sx={{
                  width: "91%",
                  mt: 2,
                  p: 2,
                  height: 300,
                  border: "2px dashed #ccc",
                  display: "flex",
                  alignItems: "start",
                  overflow: "auto",
                }}
              >
                {previewImages <= 1 ? (
                  <>
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        "&:hover": { cursor: "pointer" },
                      }}
                      onClick={handleClick}
                    >
                      <CloudUploadIcon sx={{ fontSize: 100, color: "#ccc" }} />
                      <p>Drag your images here</p>
                    </Box>

                    <input
                      ref={inputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={upImage}
                    />
                  </>
                ) : (
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    {newImages
                      ? previewImages.map((image, index) => (
                          <Box
                            key={index}
                            sx={{
                              m: 1,
                            }}
                          >
                            <img
                              src={image}
                              alt={`Preview ${index}`}
                              style={{
                                width: 140,
                                height: 140,
                                cursor: "pointer",
                                objectFit: "cover",
                              }}
                              onClick={() => handleImageClick(index)}
                            />
                          </Box>
                        ))
                      : previewImages.map((img, index) => (
                          <Box
                            key={index}
                            sx={{
                              m: 1,
                            }}
                          >
                            <img
                              src={img.link}
                              alt={`Preview ${index}`}
                              style={{
                                width: 140,
                                height: 140,
                                cursor: "pointer",
                                objectFit: "cover",
                              }}
                              onClick={() => handleImageClick(index)}
                            />
                          </Box>
                        ))}
                  </Box>
                )}
              </Box>

              <Box sx={{ width: "100%", mt: 2, display: "flex" }}>
                <Button
                  fullWidth
                  color="success"
                  variant="contained"
                  type="submit"
                >
                  perbarui produk
                </Button>
              </Box>

              <Box sx={{ width: "100%", mt: 2, display: "flex" }}>
                <Button
                  fullWidth
                  color="error"
                  variant="contained"
                  onClick={close}
                >
                  batalkan
                </Button>
              </Box>
            </form>
          )}
        </Box>
      </Fade>
    </React.Fragment>
  );
};

export default Edit;
