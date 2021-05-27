import * as actionTypes from "../constants/index";

const initialState = {
  cart: [],
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case "DATE_PICKER":
      return {
        ...state,
        dateRange: action.data,
      };
    case "ROOM_PICKER":
      return {
        ...state,
        roomRange: action.data,
      };
    case "GET_LIST_PROPERTY":
      console.log(action, "hey");
      return {
        ...state,
        propertyList: action.data,
      };
    case "GET_ROOM_DETAILS":
      console.log("REDUCER ROOM DETAILS");
      return {
        ...state,
        roomDetailsList: action.data,
      };
    case "GET_PROPROOM_TYPE":
      return {
        ...state,
        roomTypes: action.data,
      };
    default:
      return state;
  }
};
//  getProductsReducer;
