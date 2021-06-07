import * as actionTypes from "../constants/index";

const initialState = {
  cart: [],
  dateRange: [],
  roomVal: 1,
  adultVal: 1,
  childVal: 0,
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case "DATE_PICKER":
      return {
        ...state,
        dateRange: action.data,
      };
    case "ROOM_VALUE":
      return {
        ...state,
        roomVal: action.data.roomValue,
      };
    case "ADULT_VALUE":
      return {
        ...state,
        adultVal: action.data.adultValue,
      };
    case "CHILD_VALUE":
      return {
        ...state,
        childVal: action.data.childValue,
      };
    case "GET_LIST_PROPERTY":
      console.log(action, "hey");
      return {
        ...state,
        propertyList: action.data,
      };
    case "EMPTY_LIST_PROPERTY":
      console.log(action, "hey");
      return {
        ...state,
        propertyEmptyList: action.data,
      };
    case "GET_ROOM_DETAILS":
      return {
        ...state,
        roomDetailsList: action.data,
      };
    case "GET_PROPROOM_TYPE":
      return {
        ...state,
        roomTypes: action.data,
      };
    case "GET_ROOM_TYPES_RATE":
      return {
        ...state,
        roomTypeRatesData: action.data,
      };
    case "HOTEL_CUSTOMER_DETAILS":
      return {
        ...state,
        customerDetails: action.data,
      };
    case "ROOM_BOOKING_DETAIL":
      return {
        ...state,
        bookedRoomDetails: action.data,
      };
    case "TOTAL_PRICE_ROOMS":
      return {
        ...state,
        totalPriceInState: action.data,
      };
    default:
      return state;
  }
};
//  getProductsReducer;
