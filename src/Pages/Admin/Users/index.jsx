import { Box } from "@mui/material";
import Navbar from "../Components/Navbar";
import Title from "../../Title";
import Footer from "../Components/Footer";
import UsersList from "./UsersList";
//import { users } from "../../../Constant/Users";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../../../redux/user/userAction";
import Admin_protection from "../../../Protection/Admin";

const Users = () => {
  Admin_protection();

  const dispatch = useDispatch();

  const { userDeleted } = useSelector((state) => state.delUser);

  useEffect(() => {
    dispatch(getUsers());

    if (userDeleted) {
      dispatch(getUsers());
    }
  }, [dispatch, userDeleted]);
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Title title={"Admin Pelanggan"} />
      <Navbar />

      <Box
        sx={{
          position: "absolute",
          width: "100%",
          top: { xs: 80, md: 80 },
          height: { xs: 820, md: 670 },
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: "column",
        }}
      >
        <UsersList />

        <Footer />
      </Box>
    </Box>
  );
};

export default Users;
