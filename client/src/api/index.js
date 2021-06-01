import axios from "axios";
// import { property } from "../../src/actions/index";
// import { roomDetails } from "../../src/actions/index";
export const getproperty = async () => {
  const res = await axios.get("http://localhost:5000/property/Property");
  return res.data;
};
export const getpropertyLocation = async (data) => {
  const res = await axios.get(
    `http://localhost:5000/property/Property/${data}`
  );
  return res.data;
};
export const getFilteredSearch = async (data) => {
  let res = await axios({
    method: "get",
    url: `http://localhost:5000/property/Property/search`,
    headers: {
      "Content-Type": "application/json",
      location: data.location,
      roomsrequired: data.roomsrequired,
    },
  });

  return res;
};
export const getpropertyRoom = async (data) => {
  const res = await axios.get(
    `http://localhost:5000/rooms/getRoomType/${data}`
  );
  return res.data;
};
// const getRooomTypes = async () => {
//   const resp = await axios.get("http://localhost:5000/rooms/getRoomTypes");
//   return resp.data;
// };
// export { getRooomTypes, getproperty };
