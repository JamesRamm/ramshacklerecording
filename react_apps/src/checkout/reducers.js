/*
 * Reducers for updating the state based on actions
 */
import { constants } from './actions';


const initialState = {
    basketData: { count: 0, results: [] },
    shippingData: { rate: null,
                    address: {} },
    order: {
        id: null,
        error: false,
        errorData: null
    },
    basketUi: {
        loading: false,
        showModal: false,
        page: 1
    }
};

export function basketData(state = initialState.basketData, action) {
    switch (action.type) {
        case constants.RECEIVE_BASKET:
            return { ...state, ...action.data };

        case constants.RECEIVE_SUBMIT_ORDER:
            return { ...state, results: [], count: 0 };

        case constants.RECEIVE_SUBMIT_BASKET_ITEM:
            console.log(action.data)
            return { ...state, results: action.data }

        case constants.RECEIVE_REMOVE_BASKET_ITEM:
            return {
                ...state,
                results: action.data
            };

        case constants.RECEIVE_TOTAL_ITEMS:
            return { ...state, count: action.data.quantity };

        default:
            return state;
    }
}

export function order(state = initialState.order, action) {
    switch (action.type) {
        case constants.RECEIVE_SUBMIT_ORDER:
            return { ...state, id: action.data.order_id };

        case constants.ORDER_ERROR:
            return { ...state, error: true, errorData: action.error };

        default:
            return state;
    }
}
export function shippingData(state = initialState.shippingData, action) {
    switch (action.type) {
        case constants.RECEIVE_SHIPPING:
            return {...state, ...action.data }

        case constants.ADDRESS_COMPLETED:
            return { ...state, address: action.data}

        default:
            return state;
    }
}

export function basketUi(state = initialState.basketUi, action) {
    switch (action.type) {
        case constants.REQUEST_BASKET:
            return { ...state, loading: true, showModal: true }

        case constants.REQUEST_SHIPPING:
        case constants.REQUEST_SUBMIT_ORDER:
        case constants.REQUEST_SUBMIT_BASKET_ITEM:
        case constants.REQUEST_REMOVE_BASKET_ITEM:
            return { ...state, loading: true }

        case constants.RECEIVE_BASKET:
        case constants.RECEIVE_SUBMIT_BASKET_ITEM:
        case constants.RECEIVE_REMOVE_BASKET_ITEM:
        case constants.RECEIVE_SHIPPING:
        case constants.RECEIVE_SUBMIT_ORDER:
            return { ...state, loading: false }

        case constants.NEXT_PAGE:
            return { ...state, page: state.page + 1}

        case constants.CLOSE_MODAL:
            return { ...state, showModal: false, page: 1, loading: false }

        default:
            return state;
    }
}
