import { Fade, Box, TextField, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { addNewProduct } from "../../../redux/product/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Add = ({ open, close }) => {
  const dispatch = useDispatch();

  const { addLoading, isAdded } = useSelector((state) => state.addProduct);

  const formRef = useRef(null);
  const inputRef = useRef(null);

  const [previewImages, setPreviewImages] = useState([]);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [capital, setCapital] = useState(0);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [weight, setWeight] = useState(0);
  const [images, setImages] = useState(null);

  const handleQuillChange = (value) => {
    setDesc(value);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);

    setPreviewImages((prevImages) => [
      ...prevImages,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);

    setImages(files);
  };

  const upImage = (e) => {
    const files = Array.from(e.target.files);

    setPreviewImages((prevImages) => [
      ...prevImages,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);

    setImages(files);
  };

  const handleImageClick = (index) => {
    setPreviewImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("price", price);
    formData.append("capital", capital);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("weight", weight);

    // Append each file to the FormData
    if (images) {
      images.forEach((file, index) => {
        formData.append(`image`, file);
      });
    }

    dispatch(addNewProduct(formData));
  };

  useEffect(() => {
    if (isAdded) {
      close();
    }
  }, [isAdded]);

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
          {addLoading ? (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
                required
                fullWidth
                type='text'
                name='name'
                label='Nama Produk'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                required
                fullWidth
                type='text'
                name='category'
                label='Kategori'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={{ mt: 2 }}
              />

              <TextField
                required
                fullWidth
                type='number'
                name='price'
                label='Harga'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                sx={{ mt: 2 }}
              />

              <TextField
                required
                fullWidth
                type='number'
                name='capital'
                label='Modal'
                value={capital}
                onChange={(e) => setCapital(e.target.value)}
                sx={{ mt: 2 }}
              />

              <TextField
                required
                fullWidth
                type='number'
                name='stock'
                label='Stok'
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                sx={{ mt: 2 }}
              />

              <TextField
                required
                fullWidth
                type='number'
                name='weight'
                label='Berat'
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                sx={{ mt: 2 }}
                placeholder='dalam satuan gram'
              />

              <Box sx={{ width: "100%", mt: 2, height: 300 }}>
                <ReactQuill
                  theme='snow'
                  name='desc'
                  value={desc}
                  onChange={handleQuillChange}
                  style={{ height: "250px" }}
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
                onDrop={handleDrop}
                onDragOver={handleDragOver}
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
                      type='file'
                      multiple
                      accept='image/*'
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
                    {previewImages.map((image, index) => (
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
                    ))}
                  </Box>
                )}
              </Box>

              <Box sx={{ width: "100%", mt: 2, display: "flex" }}>
                <Button
                  fullWidth
                  color='success'
                  variant='contained'
                  type='submit'
                >
                  tambahkan produk
                </Button>
              </Box>

              <Box sx={{ width: "100%", mt: 2, display: "flex" }}>
                <Button
                  fullWidth
                  color='error'
                  variant='contained'
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

export default Add;
