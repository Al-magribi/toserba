import * as React from "react";
import {
  Box,
  IconButton,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../../redux/user/userAction";
import { DELETE_USERS_RESET } from "../../../redux/user/userConst";
import Loader from "../../Components/Loader";

const Headers = [
  { name: "Id" },
  { name: "Avatar" },
  { name: "Name" },
  { name: "Email" },
  { name: "Phone" },
  { name: "Action" },
];

const UsersList = () => {
  const dispatch = useDispatch();

  const { delUser, userDeleted, message } = useSelector(
    (state) => state.delUser
  );

  const { users, loadUsers } = useSelector((state) => state.users);

  const [searchTerm, setSearchTerm] = React.useState("");

  const search_function = (e) => {
    setSearchTerm(e.target.value);
  };

  const filtered = (user) => {
    return user.name.toLowerCase().includes(searchTerm.toLocaleLowerCase());
  };

  const filteredUser = users?.filter(filtered);

  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
  };

  React.useEffect(() => {
    if (userDeleted) {
      toast.success(message);

      dispatch({ type: DELETE_USERS_RESET });
    } else {
      toast.error(message);

      dispatch({ type: DELETE_USERS_RESET });
    }
  }, [userDeleted, message, users]);

  return (
    <Box sx={{ width: "99%", height: "100%" }}>
      {/* Search */}
      <Box sx={{ mb: 1 }}>
        <Input
          type='text'
          placeholder='Search'
          sx={{ p: 1 }}
          onChange={search_function}
          value={searchTerm}
        />
      </Box>

      {loadUsers ? (
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader />
        </Box>
      ) : (
        <Paper sx={{ p: 1, width: "99%", overflow: "hidden" }}>
          {loadUsers ? (
            <Box
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Loader />
            </Box>
          ) : (
            <TableContainer sx={{ maxHeight: { xs: 700, md: 560 } }}>
              <Table stickyHeader aria-label='sticky table'>
                <TableHead sx={{ bgcolor: "blue" }}>
                  <TableRow>
                    {Headers?.map((item, index) => (
                      <TableCell key={index + 1} align='center'>
                        {item.name}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredUser?.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell align='center'>{user._id}</TableCell>
                      <TableCell sx={{ width: 100 }}>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          <img
                            src={user.avatar}
                            alt={user.name}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell align='center'>{user.name}</TableCell>
                      <TableCell align='center'>{user.username}</TableCell>
                      <TableCell align='center'>{user.phone}</TableCell>
                      <TableCell align='center'>
                        <Box>
                          <IconButton onClick={() => deleteHandler(user._id)}>
                            <DeleteOutlineIcon color='error' />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      )}
      <ToastContainer autoClose={2000} />
    </Box>
  );
};

export default UsersList;
