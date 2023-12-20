import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCities,
  getServices,
} from "../../redux/shipping_cost/shippingAction";

const Shipment = ({ cost, shipping, province, city }) => {
  const dispatch = useDispatch();

  const { Product } = useSelector((state) => state.product);
  const { provinces } = useSelector((state) => state.provinces);
  const { cities } = useSelector((state) => state.cities);
  const { services } = useSelector((state) => state.couriers);
  const { data } = useSelector((state) => state.store_data);

  const [shipmentCost, setShipmentCost] = useState(0);
  const [shipmentAddress, setShipmentAddress] = useState("");

  const [provinceId, setProvinceId] = useState("");
  const [cityId, setCityId] = useState("");
  const [shipper, setShipper] = useState("");

  useEffect(() => {
    if (provinceId) {
      dispatch(getCities(provinceId));
    }
  }, [dispatch, provinceId]);

  const Services = (courier) => {
    const origin = data?.cityId;
    dispatch(getServices(origin, cityId, Product?.weight, courier));
  };

  useEffect(() => {
    cost(shipmentCost);
    shipping(shipmentAddress);
  }, [shipmentCost, shipmentAddress]);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography fontWeight="bold">Pengiriman</Typography>
      {/* Provinsi */}
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Provinsi</InputLabel>
        <Select
          value={provinceId}
          label="Provinsi"
          onChange={(e) => {
            setProvinceId(e.target.value);
            province(e.target.value);
          }}
        >
          {provinces?.map((item) => (
            <MenuItem key={item.province_id} value={item.province_id}>
              {item.province}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Kota / kabupaten */}
      <FormControl
        fullWidth
        sx={{ mt: 2, display: provinceId === "" ? "none" : "flex" }}
      >
        <InputLabel>Kota / Kabupaten</InputLabel>
        <Select
          value={cityId}
          label="Kota / Kabupaten"
          onChange={(e) => {
            setCityId(e.target.value);
            city(e.target.value);
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

      {/* Kurir */}
      <FormControl
        fullWidth
        sx={{ mt: 2, display: cityId === "" ? "none" : "flex" }}
      >
        <InputLabel>Kurir</InputLabel>
        <Select
          value={shipper}
          label="Kurir"
          onChange={(e) => {
            setShipper(e.target.value);
            Services(e.target.value);
          }}
        >
          <MenuItem value="jne">JNE</MenuItem>
          <MenuItem value="pos">POS</MenuItem>
          <MenuItem value="tiki">tiki</MenuItem>
        </Select>
      </FormControl>

      {/* Layanan */}
      <FormControl
        fullWidth
        sx={{ mt: 2, display: shipper === "" ? "none" : "flex" }}
      >
        <InputLabel>Layanan</InputLabel>
        <Select
          value={shipmentCost}
          label="Layanan"
          onChange={(e) => {
            setShipmentCost(e.target.value);
          }}
        >
          {services?.map((item) => (
            <MenuItem key={item.service} value={item.cost[0].value}>
              {`${item.service} Rp ${parseFloat(
                item.cost[0].value
              ).toLocaleString("id-ID")} Estimasi: ${item.cost[0].etd}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Almat Pengiriman */}
      <FormControl fullWidth sx={{ mt: 2 }}>
        <textarea
          placeholder="Masukan alamat lengkap ..."
          style={{ outline: "none", padding: "10px", minHeight: "80px" }}
          value={shipmentAddress}
          onChange={(e) => setShipmentAddress(e.target.value)}
        />
      </FormControl>
    </Box>
  );
};

export default Shipment;
