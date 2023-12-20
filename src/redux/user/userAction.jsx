import axios from "axios";
import {
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_REQ,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PROFILE_FAIL,
  CHANGE_PROFILE_REQ,
  CHANGE_PROFILE_SUCCESS,
  DELETE_USERS_FAIL,
  DELETE_USERS_REQ,
  DELETE_USERS_SUCCESS,
  GET_USERS_FAIL,
  GET_USERS_REQ,
  GET_USERS_SUCCESS,
  GOOGLE_REGISTER_FAIL,
  GOOGLE_REGISTER_REQ,
  GOOGLE_REGISTER_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQ,
  RESET_PASSWORD_SUCCESS,
  SEND_EMAIL_FAIL,
  SEND_EMAIL_REQ,
  SEND_EMAIL_SUCCESS,
  USER_LOAD_FAIL,
  USER_LOAD_REQ,
  USER_LOAD_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQ,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQ,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQ,
  USER_REGISTER_SUCCESS,
} from "./userConst";

const axiosUrl = axios.create({ baseURL: import.meta.env.VITE_DOMAIN_API });

export const userRegister = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axiosUrl.post(
      "/api/user/register",
      userData,
      config
    );

    localStorage.setItem("token", JSON.stringify("Login"));

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data.user });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const googleRegister = () => async (dispatch) => {
  try {
    dispatch({ type: GOOGLE_REGISTER_REQ });

    const { data } = await axiosUrl.get("/auth/google", config);

    dispatch({ type: GOOGLE_REGISTER_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: GOOGLE_REGISTER_FAIL, payload: error.message });
  }
};

export const userLogin = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axiosUrl.post("/api/user/login", userData, config);

    localStorage.setItem("token", JSON.stringify("Login"));

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOAD_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axiosUrl.get(`/api/user/profile`, config);

    dispatch({ type: USER_LOAD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_LOAD_FAIL, payload: error.response.data.message });
  }
};

export const changePassword = (userData) => async (dispatch) => {
  try {
    dispatch({ type: CHANGE_PASSWORD_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axiosUrl.post(
      `/api/user/change-password`,
      userData,
      config
    );

    dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: CHANGE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const changeProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: CHANGE_PROFILE_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axiosUrl.put(
      "/api/user/change-profile",
      userData,
      config
    );

    dispatch({ type: CHANGE_PROFILE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: CHANGE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const sendEmail = (email) => async (dispatch) => {
  try {
    dispatch({ type: SEND_EMAIL_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.post(
      "/api/user/send-email-token",
      email,
      config
    );

    dispatch({ type: SEND_EMAIL_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: SEND_EMAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.put(
      `/api/user/reset-password/${token}`,
      password,
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.message.data,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGOUT_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axiosUrl.get("/api/user/logout", config);

    localStorage.removeItem("token");

    dispatch({ type: USER_LOGOUT_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: USER_LOGOUT_FAIL, payload: error.message });
  }
};

// USERS

export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USERS_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axiosUrl.get("/api/user/get-all", config);

    dispatch({ type: GET_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USERS_FAIL, payload: error.message });
  }
};

export const deleteUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USERS_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axiosUrl.delete(`/api/user/${user}/delete`, config);

    dispatch({ type: DELETE_USERS_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: DELETE_USERS_FAIL, payload: error.message });
  }
};
