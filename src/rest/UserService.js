import axios from "axios";

export const registerUser = () => {
  const url = "http://localhost:8080/v1/football_agent/user/register";
  return axios.get(url);
};

export const authenticateUser = (userLoginRequest) => {
  const url = "http://localhost:8080/v1/football_agent/user/authenticate";
  return axios.post(url, userLoginRequest);
};

export const addSelection = (username, selectionObject) => {
    const config = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };

  const url = `http://localhost:8080/v1/football_agent/user/${username}/add_selection`;
  return axios.post(url, selectionObject, config);
};

export const getAllSelections = (username) => {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  const url = `http://localhost:8080/v1/football_agent/user/${username}/get_all_selections`;
  return axios.get(url, config);
};
