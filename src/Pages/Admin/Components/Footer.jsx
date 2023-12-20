import { Box } from "@mui/material";

const Footer = () => {
  const year = new Date();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: "100%",
      }}
    >
      &copy; Almagribi {year.getFullYear()}
    </Box>
  );
};

export default Footer;
