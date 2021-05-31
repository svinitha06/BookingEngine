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
    method: "GET",
    url: `http://localhost:5000/property/Property/search`,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": sessionStorage.getItem("token"),
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
export const getRoomRates = async (data) => {
  await axios({
    method: "GET",
    url: `http://localhost:3000/rate/getplan`,
    headers: {
      "Content-Type": "application/json",
      // 'x-access-token': sessionStorage.getItem('token')
      propertyId: data.propertyId,
      checkInDate: data.checkInDate,
    },
  });
};
// const getRooomTypes = async () => {
//   const resp = await axios.get("http://localhost:5000/rooms/getRoomTypes");
//   return resp.data;
// };
// export { getRooomTypes, getproperty };
