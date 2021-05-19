import * as actionTypes from '../constants/index'

const initialState = {
    cart: []
};

export default (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case 'DATE_PICKER':
             return {
            ...state,
            dateRange: action.data
        };
        case 'ROOM_PICKER':
             return {
            ...state,
            roomRange: action.data
        };
        default:
            return state
    }
}
//  getProductsReducer;