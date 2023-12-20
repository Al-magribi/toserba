import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import React, { useEffect, useState } from "react";
import Navbar from "../../Admin/Components/Navbar";
import Title from "../../Title";
import Footer from "../Components/Footer";
import Admin_protection from "../../../Protection/Admin";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import { changePassword, logout } from "../../../redux/user/userAction";
import { CHANGE_PASSWORD_RESET } from "../../../redux/user/userConst";
import { toast } from "react-toastify";
import {
  getCities,
  getProvinces,
} from "../../../redux/shipping_cost/shippingAction";
import { getStoreData, updateStore } from "../../../redux/Store/Store_action";
import { UPDATE_STORE_RESET } from "../../../redux/Store/Store_cost";

const AdminSetting = () => {
  Admin_protection();

  const dispatch = useDispatch();

  const { user, userLoading } = useSelector((state) => state.user);

  const { changeLoading, isChanged, changeMessage, changeError } = useSelector(
    (state) => state.password
  );

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const adminUpdate = (e) => {
    e.preventDefault();

    const data = {
      name: name,
      username: username,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    dispatch(changePassword(data));
  };

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setUsername(user?.username);
    }
  }, [user]);

  useEffect(() => {
    if (isChanged) {
      toast.success(changeMessage);

      dispatch({ type: CHANGE_PASSWORD_RESET });

      setOldPassword("");
      setNewPassword("");

      dispatch(logout());
    } else {
      toast.error(changeError);

      dispatch({ type: CHANGE_PASSWORD_RESET });
    }
  }, [changeError, changeMessage, isChanged, dispatch]);

  // STORE DATA

  const { loading, data, error } = useSelector((state) => state.store_data);
  const { loadingUpdate, isUpdated, dataUpdate, errorUpdate } = useSelector(
    (state) => state.update_store
  );

  const { provinces } = useSelector((state) => state.provinces);
  const { cities } = useSelector((state) => state.cities);

  const [storeName, setStoreName] = useState("");
  const [storeProvince, setStoreProvince] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [storeCity, setStoreCity] = useState("");
  const [cityId, setCityId] = useState("");
  const [storeAddress, setStoreAddress] = useState("");

  const [logo, setLogo] = useState("");
  const [newLogo, setNewLogo] = useState("");
  const [logoPreviews, setLogoPreviews] = useState("");

  const [slider, setSlider] = useState("");
  const [sliderPreviews, setSliderPreviews] = useState("");
  const [newSlider, setNewSlider] = useState("");

  const [currentImageIndex, setIndex] = useState(0);

  const prev = () => {
    setIndex(
      (currentImageIndex - 1 + data?.slider.length) % data?.slider.length
    );
  };

  const next = () => {
    setIndex((currentImageIndex + 1) % data?.slider.length);
  };

  const logoPreview = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setLogoPreviews(reader.result);
      };

      reader.readAsDataURL(file);
    }

    setNewLogo(file);
  };

  const uploadSlider = (e) => {
    const files = Array.from(e.target.files);

    setSliderPreviews((image) => [
      ...image,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);

    setNewSlider(files);
  };

  const storeUpdate = (e) => {
    e.preventDefault();

    if (newLogo && newSlider) {
      const formData = new FormData();
      formData.append("name", storeName);
      formData.append("province", storeProvince);
      formData.append("provinceId", provinceId);
      formData.append("city", storeCity);
      formData.append("cityId", cityId);
      formData.append("address", storeAddress);

      formData.append("logo", newLogo);

      newSlider.forEach((file) => {
        formData.append("slider", file);
      });

      dispatch(updateStore(formData));
    } else if (newLogo) {
      const formData = new FormData();
      formData.append("name", storeName);
      formData.append("province", storeProvince);
      formData.append("provinceId", provinceId);
      formData.append("city", storeCity);
      formData.append("cityId", cityId);
      formData.append("address", storeAddress);

      formData.append("logo", newLogo);
      dispatch(updateStore(formData));
    } else if (newSlider) {
      const formData = new FormData();
      formData.append("name", storeName);
      formData.append("province", storeProvince);
      formData.append("provinceId", provinceId);
      formData.append("city", storeCity);
      formData.append("cityId", cityId);
      formData.append("address", storeAddress);

      newSlider.forEach((file) => {
        formData.append("slider", file);
      });

      dispatch(updateStore(formData));
    } else {
      const formData = new FormData();
      formData.append("name", storeName);
      formData.append("province", storeProvince);
      formData.append("provinceId", provinceId);
      formData.append("city", storeCity);
      formData.append("cityId", cityId);
      formData.append("address", storeAddress);

      dispatch(updateStore(formData));
    }
  };

  useEffect(() => {
    dispatch(getProvinces());

    if (data) {
      setStoreName(data?.name);
      setStoreProvince(data?.province);
      setProvinceId(data?.provinceId);
      setStoreCity(data?.city);
      setCityId(data?.cityId);
      setStoreAddress(data?.address);
      setLogo(data?.logo);
      setSlider(data?.slider);
    }

    if (provinceId) {
      dispatch(getCities(provinceId));
    }

    if (isUpdated) {
      dispatch(getStoreData());

      toast.success(dataUpdate);

      dispatch({ type: UPDATE_STORE_RESET });
    } else {
      toast.error(errorUpdate);

      dispatch({ type: UPDATE_STORE_RESET });
    }
  }, [dispatch, data, provinceId, isUpdated, dataUpdate, errorUpdate]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      <Title title={"Admin Settings"} />
      <Navbar />

      <Box
        sx={{
          position: "absolute",
          width: "100%",

          top: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "95%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            flexDirection: "column",
            mt: 2,
            mb: 2,
            p: 1,
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ width: "100%" }}>
            Pengaturan
          </Typography>

          {userLoading || changeLoading || loading || loadingUpdate ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Loader />
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                mt: 2,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <form
                onSubmit={storeUpdate}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  padding: "10px",
                  margin: "10px",
                }}
              >
                <TextField
                  fullWidth
                  label="Nama Toko"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                />

                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Provinsi</InputLabel>
                  <Select
                    value={provinceId || ""}
                    label="Provinsi"
                    onChange={(e) => {
                      const selectedProvinceId = e.target.value;
                      const selectedProvince = provinces?.find(
                        (item) => item.province_id === selectedProvinceId
                      );

                      if (selectedProvince) {
                        setProvinceId(selectedProvince.province_id);
                        setStoreProvince(selectedProvince.province);
                      } else {
                        console.log("not found");
                      }
                    }}
                  >
                    {provinces?.map((item) => (
                      <MenuItem key={item.province_id} value={item.province_id}>
                        {item.province}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Kota / Kabupaten</InputLabel>
                  <Select
                    value={cityId || ""}
                    label="Kota / Kabupaten"
                    onChange={(e) => {
                      const selectedCityId = e.target.value;
                      const selectedCity = cities?.find(
                        (item) => item.city_id === selectedCityId
                      );

                      if (selectedCity) {
                        setCityId(selectedCity.city_id);
                        setStoreCity(selectedCity.city_name);
                      } else {
                        console.log("not found");
                      }
                    }}
                  >
                    {cities?.map((item) => (
                      <MenuItem
                        key={item.city_id}
                        value={item.city_id}
                      >{`${item.type} ${item.city_name}`}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <textarea
                  placeholder="Masukan alamat lengkap"
                  style={{
                    marginTop: "20px",
                    minHeight: "100px",
                    padding: "10px",
                  }}
                  value={storeAddress}
                  onChange={(e) => setStoreAddress(e.target.value)}
                />

                {/* Logo */}
                <InputLabel sx={{ mt: 2 }}>Logo</InputLabel>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-evenly",
                    width: "100%",
                  }}
                >
                  <input type="file" aria-label="logo" onChange={logoPreview} />
                  <Box
                    component="img"
                    loading="lazy"
                    src={logoPreviews ? logoPreviews : logo}
                    alt="image"
                    sx={{
                      width: { xs: "200px", md: "220px" },
                      height: { xs: "100px", md: "150px" },
                      objectFit: "contain",
                      mt: { xs: 2, md: 0 },
                    }}
                  />
                </Box>

                {/* SLIDER */}
                <InputLabel sx={{ mt: 2 }}>Slider</InputLabel>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <input
                    multiple
                    accept="image/*"
                    type="file"
                    onChange={uploadSlider}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "start",
                      flexWrap: "wrap",
                      width: "100%",
                      mt: 1,
                    }}
                  >
                    {sliderPreviews ? (
                      sliderPreviews.map((image, index) => (
                        <Box
                          key={index}
                          component="img"
                          loading="lazy"
                          src={image}
                          alt={`img ${index}`}
                          sx={{
                            width: { xs: 150, md: 200 },
                            height: 130,
                            objectFit: "cover",
                            m: 1,
                            "&:hover": { cursor: "pointer" },
                          }}
                        />
                      ))
                    ) : (
                      <Box
                        component="img"
                        loading="lazy"
                        src="https://apptnu.or.id/wp-content/themes/eikra/assets/img/noimage-420x273.jpg"
                        sx={{
                          width: 150,
                          height: 120,
                          objectFit: "contain",
                          m: 1,
                        }}
                      />
                    )}
                  </Box>
                </Box>

                <Button
                  type="submit"
                  variant="outlined"
                  color="success"
                  sx={{ mt: 2 }}
                >
                  Update
                </Button>
              </form>

              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Image Slider */}
                <Box
                  sx={{
                    flex: 1,
                    m: 1,
                    p: 1,
                    width: "90%",
                    borderRadius: 2,
                    boxShadow: 4,
                  }}
                >
                  <Typography fontWeight="bold">Image Slider</Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mt: 2,
                      width: "100%",
                      position: "relative",
                    }}
                  >
                    <Box
                      component="img"
                      loading="lazy"
                      src={data?.slider[currentImageIndex]?.link}
                      alt="image"
                      sx={{
                        width: "80%",
                        height: { xs: 200, md: 300 },
                        objectFit: "cover",
                        mt: { xs: 2, md: 0 },
                        borderRadius: 2,
                      }}
                    />

                    <Box
                      sx={{
                        width: "100%",
                        height: { xs: 200, md: 350 },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        position: "absolute",
                      }}
                    >
                      <IconButton onClick={prev}>
                        <ArrowLeftIcon
                          fontSize="large"
                          sx={{ color: "gray" }}
                        />
                      </IconButton>

                      <IconButton onClick={next}>
                        <ArrowRightIcon fontSize="large" />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>

                <form
                  onSubmit={adminUpdate}
                  style={{
                    width: "90%",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    padding: "10px",
                    margin: "10px",
                  }}
                >
                  <Typography fontWeight="bold">
                    Update Administrator
                  </Typography>
                  <TextField
                    fullWidth
                    label="name"
                    sx={{ mt: 2 }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <TextField
                    fullWidth
                    label="username"
                    sx={{ mt: 2 }}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />

                  <TextField
                    required
                    type="password"
                    fullWidth
                    label="Old password"
                    sx={{ mt: 2 }}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />

                  <TextField
                    required
                    type="password"
                    fullWidth
                    label="New Password"
                    sx={{ mt: 2 }}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />

                  <Button
                    variant="outlined"
                    color="success"
                    type="submit"
                    sx={{ mt: 2 }}
                  >
                    Update
                  </Button>
                </form>
              </Box>
            </Box>
          )}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default AdminSetting;
