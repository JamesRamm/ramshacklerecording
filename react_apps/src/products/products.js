/*
 * The only purpose of this module is to allow provide functions (which will dispatch actions)
 * which will be exported to a global var (by webpack) so they might be called from directly
 * loaded JS (basically, JS written in django templates, such as onClick callbacks).
 * 
 * Essentially this will provide hooks into the redux store accesible from the django templates
 * 
 */ 
import store from '../checkout/store';
import { submitAddBasketItem, submitRemoveBasketItem } from '../checkout/actions';
import { request_product } from '../api';

/*
 * Dispatch the 'addBasketItem' action
 */ 
export function addBasketItem(variant_id){
    store.dispatch(submitAddBasketItem(variant_id))
}

export function removeBasketItem(variant_id){
    store.dispatch(submitRemoveBasketItem(variant_id));
}

export function requestProduct(variant_id){
    return request_product(variant_id);
}