import { Box } from "@mui/material";
import React from "react";
import BounceLoader from "react-spinners/BounceLoader";

const Loader = () => {
  return (
    <Box>
      <BounceLoader color='green' />
    </Box>
  );
};

export default Loader;
