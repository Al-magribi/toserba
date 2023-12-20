import { Box, Typography } from "@mui/material";
import React from "react";

const Detail = () => {
  const confirm = JSON.parse(localStorage.getItem("process"));

  return (
    <Box sx={{ display: "flex", width: "100%", minHeight: 440 }}>
      {/* IMAGE */}
      <Box sx={{ flex: 1 }}>
        <img
          src={confirm?.image}
          alt={confirm?.product}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      {/* DETAIL */}
      <Box sx={{ flex: 1, p: 1, display: "flex", flexDirection: "column" }}>
        <Typography fontWeight="bold">{confirm.product}</Typography>
        <Typography>{confirm.product}</Typography>
        <Typography>{confirm.product}</Typography>
        <Typography>{confirm.product}</Typography>
        <Typography>{confirm.product}</Typography>
        <Typography>{confirm.product}</Typography>
      </Box>
    </Box>
  );
};

export default Detail;
