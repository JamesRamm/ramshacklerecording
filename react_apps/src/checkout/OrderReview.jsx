import React, {Component, PropTypes} from 'react';
import { Modal, Button, ButtonToolbar, Table } from 'react-bootstrap';

const OrderReview = ({basketData, shippingCost, basketTotal}) => {
  let rows = basketData.results.map(item => (
      <tr key={item.id}>
          <td><a href={`/shop/${item.variant.product.slug}`}>{item.variant.product.title}</a></td>
          <td>{item.quantity}</td>
          <td>£{item.total}</td>
      </tr>
  ))

  return (
    <div>
      <Table responsive hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
      <div className="row">
        <div className="col-md-3 offset-md-6">
          <p>
          <strong>
            Sub Total : <br/>
            Shipping : <br/>
            Total : <br/>
          </strong>
          </p>
        </div>
        <div className="col-md-3">
          <strong>
            {basketTotal.toLocaleString('en-EN', {style: 'currency', currency: 'GBP'})} <br/>
            {shippingCost.toLocaleString('en-EN', {style: 'currency', currency: 'GBP'})} <br/>
            {(basketTotal + shippingCost).toLocaleString('en-EN', {style: 'currency', currency: 'GBP'})} <br/>
          </strong>
        </div>
      </div>
    </div>
  )
}

export default OrderReview;