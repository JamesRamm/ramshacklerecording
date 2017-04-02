/**
 * Helper functions to be used when making requests to the api.
 */
import JsCookie from 'js-cookie';
import fetch from 'isomorphic-fetch';

/**
 * Check the response status and raise an error if it's no good.
 * @param {object} response - the http response object as provided by fetch
 * @returns {object} - the http rsponse object or throws an error
 */
function checkStatus(response) {
  if (response.ok) {
    return response;
  }
  return response.json().then(json => {
    const error = new Error(response.statusText)
    throw Object.assign(error, { response, json })
  })
}

/**
 * Return an object given an http json response
 * @param {object} response - json encoded response object as provided by fetch
 * @returns {object} - The parsed json
 */
function parseJSON(response) {
  return response.json();
}


/**
 * Return the headers needed for put, post and delete requests
 * @returns {{Accept: string, Content-Type: string, X-CSRFToken: *}}
 */
function getRequestHeaders(form = false) {
  let contentType = 'application/json';
  const headers = {
    Accept: 'application/json, application/json, application/coreapi+json',
    
  };
  if (!form) headers['Content-Type'] = contentType;
  const csrf = JsCookie.get('csrftoken');
  if (csrf) headers['X-CSRFToken'] = csrf;
  return headers;
}

function get(url) {
  return fetch(
    url,
    {
      method: 'GET',
      headers: getRequestHeaders(),
      credentials: 'include'    }
  )
    .then(checkStatus)
    .then(parseJSON);
}

function post(url, data, isForm = false) {
  return fetch(
    url,
    {
      method: 'POST',
      headers: getRequestHeaders(isForm),
      credentials: 'include',
      body: isForm ? data : JSON.stringify(data)
    }
  )
    .then(checkStatus)
    .then(parseJSON);
}

function del(url, data, isForm = false) {
  return fetch(
    url,
    {
      method: 'DEL',
      headers: getRequestHeaders(isForm),
      credentials: 'include',
      body: isForm ? data : JSON.stringify(data)
    }
  )
    .then(checkStatus)
    .then(parseJSON);
}

export function get_shipping(country_code, shipping_option='standard'){
  return get(`/api/shipping/cost/?country_code=${country_code}&shipping_option=${shipping_option}`, {country_code, shipping_option})
}

export function get_shipping_countries() {
  return get('/api/shipping/countries/');
}

/*
 * data:
 *  data.amount: Amount (in GBP) to be paid
 *  data.shipping: Amount (in GBP) of shipping cost
 *  data.address.shipping: Object containing shipping address
 *  data.address.billing: Object containing billing address
 *  data.ip: IP address of client
 *  data.email: Email address of client
 *  data.payment_method_nonce: Stripe token of client card
 * 
 */
export function post_order(data){
  return post('/api/checkout/', data)
}

export function post_order_prepaid(data){
  return post('/api/checkout/prepaid/', data);
}

export function get_basket() {
  return get("/api/basket/");
}

export function add_to_basket(variant_id){
  return post('/api/basket/', {variant_id});
}

export function remove_from_basket(variant_id, quantity){
  return del(`/api/basket/${variant_id}/`, {quantity});
}

export function get_total_items(){
  return get('/api/basket/count/');
}

export function get_token(){
  return get('/api/checkout/token/');
}
