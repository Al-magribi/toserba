import { Box, Paper } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useSelector } from "react-redux";

const Hero = () => {
  const hero = [
    {
      image:
        "https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      image:
        "https://images.pexels.com/photos/3965548/pexels-photo-3965548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      image:
        "https://images.pexels.com/photos/3951790/pexels-photo-3951790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      image:
        "https://images.pexels.com/photos/4226269/pexels-photo-4226269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  const { data } = useSelector((state) => state.store_data);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ mt: 9, width: "100%" }}
    >
      <Carousel sx={{ width: "90%" }} animation="slide" duration={1500}>
        {data?.slider.map((item, index) => (
          <Paper
            key={index}
            sx={{
              width: "100%",
              height: { xs: 150, md: 300 },
            }}
          >
            <img
              src={item.link}
              alt={`Hero - ${index}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              loading="lazy"
            />
          </Paper>
        ))}
      </Carousel>
    </Box>
  );
};

export default Hero;
