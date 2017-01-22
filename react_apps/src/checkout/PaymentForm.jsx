import React, {PropTypes} from 'react';
import OrderReview from './OrderReview';
import BraintreeDropIn from '../braintree_payment/BraintreeDropIn';

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
      <BraintreeDropIn
        onClose={onClose}
        totalAmount={basketTotal + shippingCost}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default PaymentForm;
