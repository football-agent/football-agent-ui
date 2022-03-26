import axios from "axios";

export const registerUser = (userObject) => {
  const url = "https://football-agent-services.herokuapp.com/v1/football_agent/user/register";
  return axios.post(url, userObject);
};

export const authenticateUser = (userLoginRequest) => {
  const url = "https://football-agent-services.herokuapp.com/v1/football_agent/user/authenticate";
  return axios.post(url, userLoginRequest);
};

export const addSelection = (username, selectionObject) => {
    const config = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };

  const url = `https://football-agent-services.herokuapp.com/v1/football_agent/user/${username}/add_selection`;
  return axios.post(url, selectionObject, config);
};

export const getAllSelections = (username) => {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  const url = `https://football-agent-services.herokuapp.com/v1/football_agent/user/${username}/get_all_selections`;
  return axios.get(url, config);
};
