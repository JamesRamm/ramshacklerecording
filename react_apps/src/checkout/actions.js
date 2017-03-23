import { get_basket, get_shipping, post_order, add_to_basket, get_total_items, remove_from_basket } from '../api';

export const constants = {
    REQUEST_BASKET: 'REQUEST_BASKET',
    RECEIVE_BASKET: 'RECEIVE_BASKET',
    REQUEST_SHIPPING: 'REQUEST_SHIPPING',
    RECEIVE_SHIPPING: 'RECEIVE_SHIPPING',
    CLOSE_MODAL: 'CLOSE_MODAL',
    REQUEST_SUBMIT_ORDER: 'REQUEST_SUBMIT_ORDER',
    RECEIVE_SUBMIT_ORDER: 'RECEIVE_SUBMIT_ORDER',
    REQUEST_SUBMIT_BASKET_ITEM: 'REQUEST_SUBMIT_BASKET_ITEM',
    RECEIVE_SUBMIT_BASKET_ITEM: 'RECEIVE_SUBMIT_BASKET_ITEM',
    REQUEST_REMOVE_BASKET_ITEM: 'REQUEST_REMOVE_BASKET_ITEM',
    RECEIVE_REMOVE_BASKET_ITEM: 'RECEIVE_REMOVE_BASKET_ITEM',
    REQUEST_TOTAL_ITEMS: 'REQUEST_TOTAL_ITEMS',
    RECEIVE_TOTAL_ITEMS: 'RECEIVE_TOTAL_ITEMS',
    ADDRESS_COMPLETED: 'ADDRESS_COMPLETED',
    NEXT_PAGE: 'NEXT_PAGE',
    ORDER_ERROR: 'ORDER_ERROR'
}

export function completeCheckout(orderId) {

    return {
        type: constants.RECEIVE_CREATE_ORDER
    }
}

export function nextPage() {
    return { type: constants.NEXT_PAGE };
}

export function submitAddress(data) {
    return { type: constants.ADDRESS_COMPLETED,
             data }
}

export function closeModal(){
    return { type: constants.CLOSE_MODAL };
}

function requestBasket(){
    return { type: constants.REQUEST_BASKET };
}

function receiveBasket(data){
    return {
        type: constants.RECEIVE_BASKET,
        data
    }
}

function requestShippingCost(){
    return {
        type : constants.REQUEST_SHIPPING
    }
}

function receiveShippingCost(data){
    return {
        type: constants.RECEIVE_SHIPPING,
        data
    }
}

function requestSubmitOrder(){
    return {
        type: constants.REQUEST_SUBMIT_ORDER
    }
}

function receiveSubmitOrder(data){
    return {
        type: constants.RECEIVE_SUBMIT_ORDER,
        data
    }
}


export function fetchShippingCost(address){
    return dispatch => {
        dispatch(requestShippingCost());
        return get_shipping(address.addressCountry)
            .then(json => {
                dispatch(receiveShippingCost(json));
            })
            .then(dispatch(nextPage()));
    };
}

export function fetchBasket() {
    return dispatch => {
        dispatch(requestBasket());
        return get_basket()
            .then(json => {
                dispatch(receiveBasket(json));
            });
        };
}

export function submitOrder(data) {
    return dispatch => {
        dispatch(requestSubmitOrder());
        return post_order(data)
            .then(json => {
                dispatch(receiveSubmitOrder(json));
                dispatch(nextPage());
            })
            .catch( error => {
                dispatch({
                    type: constants.ORDER_ERROR,
                    error
                })
            })

    };
}

export function submitAddBasketItem(variant_id){
    return dispatch => {
        dispatch({type: constants.REQUEST_SUBMIT_BASKET_ITEM});
        return add_to_basket(variant_id)
            .then(json => {
                dispatch({type: constants.RECEIVE_SUBMIT_BASKET_ITEM, data: json});
            });
    };
}

export function submitRemoveBasketItem(variant_id, quantity=1){
    return dispatch => {
        dispatch({type: constants.REQUEST_REMOVE_BASKET_ITEM});
        return remove_from_basket(variant_id, quantity)
            .then(json => {
                dispatch({type: constants.RECEIVE_REMOVE_BASKET_ITEM, data: json});
            });
    };
}

export function fetchTotalBasketItems(){
    return dispatch => {
        dispatch({type: constants.REQUEST_TOTAL_ITEMS});
        return get_total_items()
            .then(json => {
                dispatch({type: constants.RECEIVE_TOTAL_ITEMS, data: json})
            })
    }
}
