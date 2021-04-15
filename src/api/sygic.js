import axios from "axios";

const sygicAxios = axios.create({
  baseURL: "https://api.sygictravelapi.com/1.1/en/",
  headers: {
    "x-api-key": "6wUobpvnF73eGNRbOnMH82ADUxbbgIZm4TOW3cOK",
  },
});

export default sygicAxios;

// https://api.sygictravelapi.com/1.1/en/collections
