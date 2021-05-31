// import * as actionTypes from '../constants/products'
// import * as api from '../api/index'

export const date = (data) => ({ type: "DATE_PICKER", data });
export const room = (data) => ({ type: "ROOM_PICKER", data });
export const property = (data) => ({ type: "GET_LIST_PROPERTY", data });
export const roomDetails = (data) => ({ type: "GET_ROOM_DETAILS", data });
export const roomTypesRate = (data) => ({ type: "GET_ROOM_TYPES_RATE", data });
export const propRoomType = (data) => ({ type: "GET_PROPROOM_TYPE", data });
