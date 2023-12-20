import {
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_REQ,
  CHANGE_PASSWORD_RESET,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PROFILE_FAIL,
  CHANGE_PROFILE_REQ,
  CHANGE_PROFILE_RESET,
  CHANGE_PROFILE_SUCCESS,
  DELETE_USERS_FAIL,
  DELETE_USERS_REQ,
  DELETE_USERS_RESET,
  DELETE_USERS_SUCCESS,
  GET_USERS_FAIL,
  GET_USERS_REQ,
  GET_USERS_SUCCESS,
  GOOGLE_LOGIN_FAIL,
  GOOGLE_LOGIN_REQ,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_REGISTER_FAIL,
  GOOGLE_REGISTER_REQ,
  GOOGLE_REGISTER_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQ,
  RESET_PASSWORD_RESET,
  RESET_PASSWORD_SUCCESS,
  RESET_STORE,
  SEND_EMAIL_FAIL,
  SEND_EMAIL_REQ,
  SEND_EMAIL_RESET,
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

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQ:
    case USER_LOGIN_REQ:
    case USER_LOAD_REQ:
    case USER_LOGOUT_REQ:
    case GOOGLE_REGISTER_REQ:
    case GOOGLE_LOGIN_REQ:
      return { userLoading: true, isAuthenticated: false };

    case USER_REGISTER_SUCCESS:
    case USER_LOGIN_SUCCESS:
    case USER_LOAD_SUCCESS:
    case GOOGLE_REGISTER_SUCCESS:
    case GOOGLE_LOGIN_SUCCESS:
      return {
        userLoading: false,
        isAuthenticated: true,
        logout: false,
        user: action.payload,
      };

    case USER_LOGOUT_SUCCESS:
      return {
        userLoading: false,
        isAuthenticated: false,
        logout: true,
        user: action.payload,
      };

    case USER_REGISTER_FAIL:
    case USER_LOGIN_FAIL:
    case USER_LOAD_FAIL:
    case USER_LOGOUT_FAIL:
    case GOOGLE_REGISTER_FAIL:
    case GOOGLE_LOGIN_FAIL:
      return {
        userLoading: false,
        isAuthenticated: false,
        logout: false,
        userError: action.payload,
      };

    case RESET_STORE:
      return state;
    default:
      return state;
  }
};

export const changePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQ:
      return { changeLoding: true };

    case CHANGE_PASSWORD_SUCCESS:
      return {
        changeLoding: false,
        isChanged: true,
        changeMessage: action.payload,
      };

    case CHANGE_PASSWORD_FAIL:
      return {
        changeLoding: false,
        isChanged: false,
        changeError: action.payload,
      };

    case CHANGE_PASSWORD_RESET:
      return {};

    default:
      return state;
  }
};

export const changeProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_PROFILE_REQ:
      return { profileLoading: true };

    case CHANGE_PROFILE_SUCCESS:
      return {
        profileLoading: false,
        profileChanged: true,
        profileMessage: action.payload,
      };

    case CHANGE_PROFILE_FAIL:
      return {
        profileLoading: false,
        profileChanged: false,
        profileError: action.payload,
      };

    case CHANGE_PROFILE_RESET:
      return {};

    default:
      return state;
  }
};

export const sendEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_EMAIL_REQ:
      return { emailLoading: true };

    case SEND_EMAIL_SUCCESS:
      return {
        emailLoading: false,
        isSent: true,
        emailMessage: action.payload,
      };

    case SEND_EMAIL_FAIL:
      return { emailLoading: false, isSent: false, emailError: action.payload };

    case SEND_EMAIL_RESET:
      return {};

    default:
      return state;
  }
};

export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQ:
      return { resetLoading: true };

    case RESET_PASSWORD_SUCCESS:
      return {
        resetLoading: false,
        isReseted: true,
        resetMessage: action.payload,
      };

    case RESET_PASSWORD_FAIL:
      return {
        resetLoading: false,
        isReseted: false,
        resetError: action.payload,
      };

    case RESET_PASSWORD_RESET:
      return {};

    default:
      return state;
  }
};

export const getUsersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USERS_REQ:
      return { loadUsers: true };

    case GET_USERS_SUCCESS:
      return { loadUsers: false, users: action.payload };

    case GET_USERS_FAIL:
      return { loadUsers: false, users: action.payload };

    default:
      return state;
  }
};

export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USERS_REQ:
      return { delUser: true };

    case DELETE_USERS_SUCCESS:
      return { delUser: false, userDeleted: true, message: action.payload };

    case DELETE_USERS_FAIL:
      return { delUser: false, userDeleted: true, message: action.payload };

    case DELETE_USERS_RESET:
      return {};

    default:
      return state;
  }
};
