import * as actionTypes from "../constants/index";

const initialState = {
  cart: [],
  dateRange: [],
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
        roomVal: action.data,
      };
      case "ADULT_VALUE":
      return {
        ...state,
        adultVal: action.data,
      };
      case "CHILD_VALUE":
      return {
        ...state,
        childVal: action.data,
      };
    case "GET_LIST_PROPERTY":
      console.log(action, "hey");
      return {
        ...state,
        propertyList: action.data,
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
    default:
      return state;
  }
};
//  getProductsReducer;
