import axios from "axios";

const sygicAxios = axios.create({
  baseURL: "https://api.sygictravelapi.com/1.1/en/",
  headers: {
    "x-api-key": "6wUobpvnF73eGNRbOnMH82ADUxbbgIZm4TOW3cOK",
  },
});

export default sygicAxios;

// https://api.opentripmap.com/0.1/en/places/bbox?lon_min=-179&lon_max=179&lat_min=-89&lat_max=89&format=json&limit=501&apikey=5ae2e3f221c38a28845f05b60e132bbb8b03ad56bd9df79f02aa693e

// https://api.sygictravelapi.com/1.1/en/collections
