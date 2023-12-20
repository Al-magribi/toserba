import React, { useState, useEffect } from "react";
import {
  Backdrop,
  Box,
  IconButton,
  Input,
  Modal,
  Stack,
  Rating,
  Typography,
} from "@mui/material";
import Details from "./Details";
import Review from "./Review";
import Add from "./Add";
import Edit from "./Edit";
import Upload from "./Upload";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  deleteProducts,
  getProduct,
  getProducts,
} from "../../../redux/product/productAction";
import {
  DELETE_PRODUCTS_RESET,
  DELETE_PRODUCT_RESET,
  UPDATE_PRODUCT_RESET,
} from "../../../redux/product/productConst";

const ProductsList = ({ load, products }) => {
  const dispatch = useDispatch();

  const name = "";

  const { loading, isDeleted, allDeleted, deleted, error, isUpdated, updated } =
    useSelector((state) => state.upDelProduct);

  const [showDetail, setShowDetail] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const search_function = (e) => {
    setSearchTerm(e.target.value);
  };

  const filtered = (product) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const filteredProduct = products?.filter(filtered);

  const detailHandler = (name) => {
    setShowDetail(true);
    dispatch(getProduct(name));
  };

  const reviewsHandler = (name) => {
    setShowReviews(true);
    dispatch(getProduct(name));
  };

  const editHandler = (name) => {
    setShowEdit(true);
    dispatch(getProduct(name));
  };

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const deleteAllProducts = () => {
    dispatch(deleteProducts());
  };

  useEffect(() => {
    if (isDeleted) {
      toast.success(deleted);

      dispatch(getProducts(name));

      dispatch({ type: DELETE_PRODUCT_RESET });
    } else {
      toast.error(error);

      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    if (allDeleted) {
      toast.success(deleted);

      dispatch(getProducts(name));

      dispatch({ type: DELETE_PRODUCTS_RESET });
    } else {
      toast.error(error);

      dispatch({ type: DELETE_PRODUCTS_RESET });
    }

    if (isUpdated) {
      toast.success(updated);

      dispatch(getProducts(name));

      dispatch({ type: UPDATE_PRODUCT_RESET });
    } else {
      toast.error(updated);

      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [isDeleted, allDeleted, deleted, isUpdated, updated, error, dispatch]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "99%",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
          mt: 2,
        }}
      >
        <Box>
          <Input
            sx={{ p: 1 }}
            type='text'
            placeholder='Search'
            onChange={search_function}
            value={searchTerm}
          />
        </Box>

        <Box>
          <IconButton onClick={() => setShowAdd(true)}>
            <AddIcon sx={{ color: "#2192FF" }} />
          </IconButton>

          <IconButton onClick={() => setShowUpload(true)}>
            <UploadFileIcon sx={{ color: "#29b932" }} />
          </IconButton>
          <IconButton onClick={() => deleteAllProducts()}>
            <DeleteOutlineIcon color='error' />
          </IconButton>
        </Box>
      </Box>

      {load || loading ? (
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            height: "99%",
            width: "99%",
            overflow: "auto",
          }}
        >
          {filteredProduct?.map((item, index) => (
            <Box
              key={item._id}
              sx={{
                width: { xs: 170, md: 180 },

                p: 1,
                m: 1,
                boxShadow: 4,
                borderRadius: 2,
              }}
            >
              <img
                key={item.image && item.image[0] ? item.image[0]._id : null}
                loading='lazy'
                src={
                  item.image && item.image[0]
                    ? item.image[0].link
                    : "http://dummyimage.com/650x650.png/ff4444/ffffff"
                }
                alt={item.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography fontWeight='bold'>{item.name}</Typography>

                <Typography
                  variant='body2'
                  fontStyle='italic'
                  fontWeight='bold'
                >
                  Rp {parseFloat(item.price).toLocaleString("id-ID")}
                </Typography>

                <Stack spacing={1}>
                  <Rating value={item.rating} readOnly />
                </Stack>
              </Box>

              <Box
                sx={{
                  mt: 1,

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <IconButton onClick={() => detailHandler(item.name)}>
                  <MoreVertIcon sx={{ color: "#2192FF" }} />
                </IconButton>

                <IconButton onClick={() => reviewsHandler(item.name)}>
                  <ChatOutlinedIcon sx={{ color: "#29b932" }} />
                </IconButton>

                <IconButton onClick={() => editHandler(item.name)}>
                  <CreateOutlinedIcon sx={{ color: "orange" }} />
                </IconButton>

                <IconButton onClick={() => deleteHandler(item._id)}>
                  <DeleteOutlineIcon sx={{ color: "red" }} />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      <Modal
        open={showDetail}
        onClose={() => setShowDetail(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <div ref={React.useRef(null)}>
          <Details open={showDetail} close={() => setShowDetail(false)} />
        </div>
      </Modal>

      <Modal
        open={showReviews}
        onClose={() => setShowReviews(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <div ref={React.useRef(null)}>
          <Review open={showReviews} close={() => setShowReviews(false)} />
        </div>
      </Modal>

      <Modal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <div ref={React.useRef(null)}>
          <Add open={showAdd} close={() => setShowAdd(false)} />
        </div>
      </Modal>

      <Modal
        open={showEdit}
        onClose={() => setShowEdit(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <div ref={React.useRef(null)}>
          <Edit open={showEdit} close={() => setShowEdit(false)} />
        </div>
      </Modal>

      <Modal
        open={showUpload}
        onClose={() => setShowUpload(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <div ref={React.useRef(null)}>
          <Upload open={showUpload} close={() => setShowUpload(false)} />
        </div>
      </Modal>
    </Box>
  );
};

export default ProductsList;
