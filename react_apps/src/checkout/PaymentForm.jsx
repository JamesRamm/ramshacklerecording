import React, { PropTypes } from 'react';
import OrderReview from './OrderReview';
import BraintreeDropIn from '../braintree_payment/BraintreeDropIn';
import BraintreePaypalButton from '../braintree_payment/BraintreePaypal';
import { get_token } from '../api';

const PaymentForm = ({basketData, shippingCost, onClose, handleSubmit}) => {
  let basketTotal = basketData.items.reduce((total, item) => total+item.total, 0)

  return (
    <div>
      <OrderReview
        basketData={basketData}
        shippingCost={shippingCost}
        basketTotal={basketTotal}
      />
      <hr />
      <BraintreePaypalButton
        currency='GBP'
        onClose={onClose}
        totalAmount={basketTotal + shippingCost}
        handleSubmit={handleSubmit}
        enableShippingAddress={true}
        shippingAddressEditable={true}
        getToken={get_token}
      />
    </div>
  )
}

export default PaymentForm;
