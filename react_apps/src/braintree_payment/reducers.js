
const initialData = {
    loading: false,
    clientInstance: null,
    hostedFieldsInstance: null,
    token: null,
    error: false,
    errorValue: null,
    braintreeReady: false,
    braintreeCheckout: null,
    nonce: null

}
export function braintreeData(state = initialData, action){
    switch (action.type){
        case 'REQUEST_START':
            return { ...state, loading: true}

        case 'REQUEST_END':
            return { ...state, loading: false}
        
        case 'RECEIVE_CLIENT':
            return { ...state, clientInstance: action.data}

        case 'RECEIVE_HOSTED_FIELDS':
            return { ...state, hostedFieldsInstance: action.data }

        case 'RECEIVE_TOKEN':
            return { ...state, token: action.data }

        case 'BRAINTREE_READY':
            return { ...state, braintreeReady: true, braintreeCheckout: action.data }

        case 'BRAINTREE_NONCE_RECEIVED':
            return { ...state, nonce: action.data }

        case 'TEARDOWN':
            return { ...state, braintreeCheckout: null, braintreeReady: false }

        case 'ERROR':
            return { ...state, error: true, errorValue: action.error }

        default:
            return state
    }
}