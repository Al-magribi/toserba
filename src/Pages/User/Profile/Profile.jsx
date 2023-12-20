import { Box, Button, TextField } from "@mui/material";
import Navbar from "../../Components/Navbar";
import { useEffect, useState } from "react";
import Title from "../../Title";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import { changePassword, changeProfile } from "../../../redux/user/userAction";
import { toast, ToastContainer } from "react-toastify";
import { CHANGE_PASSWORD_RESET } from "../../../redux/user/userConst";
import User_protection from "../../../Protection/User";
import Authenticated from "../../../Protection/Autehnticated";

const Profile = () => {
  User_protection();

  const dispatch = useDispatch();

  const bg =
    "https://teropongmedia.id/wp-content/uploads/2023/02/debuter-ecommerce-2-1024x536-1.jpg";

  const { userLoading, user } = useSelector((state) => state.user);
  const { changeLoading, isChanged, changeMessage, changeError } = useSelector(
    (state) => state.password
  );
  const { profileLoading, profileChanged, profileMessage, profileError } =
    useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setUsername(user?.username);
      setPhone(user?.phone);
      setAvatar(user?.avatar);
    }
  }, [user]);

  useEffect(() => {
    if (isChanged) {
      toast.success(changeMessage);

      dispatch({ type: CHANGE_PASSWORD_RESET });

      setOldPassword("");
      setNewPassword("");
    } else {
      toast.error(changeError);
    }
  }, [changeError, changeMessage, isChanged]);

  useEffect(() => {
    if (profileChanged) {
      toast.success(profileMessage);
    } else {
      toast.error(profileError);
    }
  }, [profileChanged, profileMessage, profileError]);

  const passwordHandler = () => {
    const data = {
      username: username,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    if (oldPassword === "" || newPassword === "") {
      toast.error("Kolom tidak boleh kosong");
    } else {
      console.log(data);
      dispatch(changePassword(data));
    }
  };

  const profileHandler = () => {
    const data = {
      name: name,
      username: username,
      phone: phone,
      avatar: avatar,
    };

    dispatch(changeProfile(data));
  };
  return (
    <>
      <Title title={user?.name} />
      <Box
        sx={{
          position: "relative",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <Navbar />

        {userLoading && changeLoading && profileLoading ? (
          <Loader />
        ) : (
          <Box
            sx={{
              width: { xs: "90%", md: "50%" },
              top: 80,
              height: "auto",
              boxShadow: 4,
              borderRadius: "5px",
              position: "absolute",
            }}
          >
            <Box sx={{ width: "100%", height: 230 }}>
              {/* Background */}
              <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
                <img
                  src={bg}
                  alt="backgrouns"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderTopLeftRadius: "5px",
                    borderTopRightRadius: "5px",
                  }}
                />
              </Box>

              {/* user Icon */}

              <Box
                sx={{
                  width: 120,
                  height: 120,
                  position: "absolute",
                  top: 60,
                  left: { xs: 125, md: 285 },
                }}
              >
                <img
                  src={avatar ? avatar : null}
                  alt="background"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                    border: "3px solid white",
                    background: "white",
                  }}
                />
              </Box>
            </Box>

            {/* Detail */}
            <Box
              sx={{
                width: "100%",
                height: "auto",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <TextField
                fullWidth
                sx={{ m: 1 }}
                label="Name"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                fullWidth
                sx={{ m: 1 }}
                label="email"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                fullWidth
                sx={{ m: 1 }}
                label="No Tlp"
                value={phone || ""}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                fullWidth
                sx={{ m: 1 }}
                type="password"
                label="Password Lama"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />

              <TextField
                fullWidth
                sx={{ m: 1 }}
                type="password"
                label="Password Baru"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Box>

            {/* Tombol */}
            <Box
              sx={{
                width: "100%",
                height: 55,
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Button
                variant="outlined"
                color="success"
                sx={{ mr: 2 }}
                onClick={profileHandler}
              >
                Update Profile
              </Button>

              <Button
                variant="outlined"
                color="error"
                sx={{ mr: 1 }}
                onClick={passwordHandler}
              >
                Update Password
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default Profile;
