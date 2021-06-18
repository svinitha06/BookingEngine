import axios from "axios";
// import { property } from "../../src/actions/index";
// import { roomDetails } from "../../src/actions/index";
// let host="http://localhost:5000"

var env = process.env.NODE_ENV || "production";
var host =
  env === "development"
    ? "http://localhost:5000"
    : "http://9a9e6e820483.ngrok.io";

export const getproperty = async () => {
  console.log("zedge", process.env.NODE_ENV);
  const res = await axios.get(`${host}/property/Property`);
  return res.data;
};

export const getpropertyLocation = async (data) => {
  const res = await axios.get(`${host}/property/Property/${data}`);

  return res.data;
};
export const getFilteredSearch = async (data) => {
  let res = await axios({
    method: "get",
    url: `${host}/property/Property/search`,
    headers: {
      "Content-Type": "application/json",
      location: data.location,
      roomsrequired: data.roomsrequired,
    },
  });

  return res;
};
export const getpropertyRoom = async (data) => {
  const res = await axios.get(`${host}/rooms/getRoomType/${data}`);
  return res.data;
};
export const getPostHotelDetails = async (data) => {
  console.log(data, "hotel");
  const res = await axios.post(`${host}/book/Book`, data);
  return res;
};

// const getRooomTypes = async () => {
//   const resp = await axios.get("http://localhost:5000/rooms/getRoomTypes");
//   return resp.data;
// };
// export { getRooomTypes, getproperty };
