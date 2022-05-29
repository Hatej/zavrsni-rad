import axios from "axios";
import { BACKEND_URL } from "../constants";
const API_URL = BACKEND_URL.concat("/auth/");

const register = (user) => {
  return axios.post(API_URL + "signup", {
    username: user.username,
    email: user.email,
    password: user.password,
  });
};

const login = (user) => {
  return axios
    .post(API_URL + "signin", {
      username: user.username,
      password: user.password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;