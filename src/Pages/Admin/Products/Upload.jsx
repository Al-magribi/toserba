import { Fade, Box, Input, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../../../redux/product/productAction";
import Loader from "../../Components/Loader";

const Upload = ({ open, close }) => {
  const dispatch = useDispatch();

  const { uploadLoading, isUploaded } = useSelector(
    (state) => state.uploadFile
  );

  const [file, setFile] = useState(null);

  const onChange = (e) => {
    const selectedFile = e.target.files[0];

    if (
      selectedFile.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setFile(selectedFile);
    } else {
      alert("File tidak sesuai, gunakan template yang disediakan!");
      setFile(null);
      close();
    }
  };

  const uploadHandler = () => {
    dispatch(uploadFile(file));
  };

  useEffect(() => {
    if (isUploaded) {
      close();
    }
  }, [isUploaded]);
  return (
    <React.Fragment>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            height: 100,
            bgcolor: "#ffff",
            boxShadow: 24,
            p: 2,
            display: "flex",
            alignItems: "start",
            flexDirection: "column",
          }}
        >
          {uploadLoading ? (
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
            <>
              <Input type='file' accept='.xlxs, .xls' onChange={onChange} />
              <Box sx={{ width: "100%", mt: 2, display: "flex" }}>
                <Button
                  sx={{ m: 1 }}
                  fullWidth
                  color='error'
                  variant='contained'
                  onClick={close}
                >
                  batalkan
                </Button>

                <Button
                  sx={{ m: 1 }}
                  fullWidth
                  color='success'
                  variant='contained'
                  onClick={uploadHandler}
                >
                  Upload File
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Fade>
    </React.Fragment>
  );
};

export default Upload;
