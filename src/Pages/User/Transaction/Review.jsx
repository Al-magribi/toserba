import {
  Box,
  Button,
  Fade,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { createReview } from "../../../redux/product/productAction";
import Loader from "../../Components/Loader";
import { CREATE_REVIEW_RESET } from "../../../redux/product/productConst";
import { toast } from "react-toastify";

const Review = ({ open, close }) => {
  const dispatch = useDispatch();

  const { detail } = useSelector((state) => state.detailOrder);
  const { user } = useSelector((state) => state.user);
  const { loadingReview, isCreated, created } = useSelector(
    (state) => state.review
  );

  const [productStates, setProductStates] = useState([
    { ratings: 0, review: "" },
    { ratings: 0, review: "" },
  ]);

  const reviewHandler = (productId, index, e) => {
    e.preventDefault();

    const data = {
      user: user?._id,
      rating: productStates[index].ratings,
      comment: productStates[index].review,
    };

    dispatch(createReview(productId, data));
  };

  useEffect(() => {
    if (isCreated) {
      close();

      dispatch({ type: CREATE_REVIEW_RESET });
    } else {
      toast.error(created);

      dispatch({ type: CREATE_REVIEW_RESET });
    }
  }, [dispatch, isCreated, created]);

  return (
    <div>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 350, md: 500 },
            maxHeight: 600,
            overflow: "auto",
            bgcolor: "#ffff",
            boxShadow: 24,
            p: 2,
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {loadingReview ? (
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
            <>
              <Box sx={{ display: "flex", justifyContent: "end", m: 1 }}>
                <IconButton sx={{ color: "red" }} onClick={() => close()}>
                  <CloseIcon />
                </IconButton>
              </Box>

              {detail
                ? detail?.products.map((item, index) => (
                    <Box
                      key={item._id}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        m: 1,
                        height: 240,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flex: 1,
                          alignItems: "center",
                          flexDirection: "column",
                          height: "100%",
                        }}
                      >
                        <img
                          src={item.productId.image[0].link}
                          alt={item.productId.name}
                          loading="lazy"
                          style={{
                            height: "120px",
                            width: "120px",
                            objectFit: "cover",
                            flex: "1",
                          }}
                        />

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                            height: "100%",
                            flex: "1",
                            m: 1,
                          }}
                        >
                          <Typography fontWeight="bold">
                            {item.productId.name}
                          </Typography>
                          <Typography variant="body">
                            {item.qty} Barang
                          </Typography>
                          <Typography
                            fontWeight="bold"
                            variant="body"
                            fontStyle="italic"
                          >
                            Rp
                            {parseFloat(item.total_price).toLocaleString(
                              "id-ID"
                            )}
                          </Typography>
                        </Box>
                      </Box>

                      <form
                        onSubmit={(e) =>
                          reviewHandler(item.productId._id, index, e)
                        }
                        style={{
                          flex: 1,
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-around",
                          flexDirection: "column",
                        }}
                      >
                        <Rating
                          name={`rating-controlled-${index}`}
                          size="large"
                          value={productStates[index].ratings}
                          onChange={(event, newRating) =>
                            setProductStates((prev) => {
                              const newProductStates = [...prev];
                              newProductStates[index].ratings = newRating;
                              return newProductStates;
                            })
                          }
                        />

                        <textarea
                          style={{
                            height: "100px",
                            width: "88%",
                            padding: "10px",
                          }}
                          value={productStates[index].review}
                          onChange={(e) =>
                            setProductStates((prev) => {
                              const newProductStates = [...prev];
                              newProductStates[index].review = e.target.value;
                              return newProductStates;
                            })
                          }
                          placeholder="Tulis Review kamu di sini"
                        />

                        <Button
                          fullWidth
                          type="submit"
                          variant="contained"
                          color="error"
                        >
                          Send
                        </Button>
                      </form>
                    </Box>
                  ))
                : null}
            </>
          )}
        </Box>
      </Fade>
    </div>
  );
};

export default Review;
