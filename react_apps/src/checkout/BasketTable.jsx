import React, {Component, PropTypes} from 'react';
import { Button, ButtonToolbar, Table } from 'react-bootstrap';
import BraintreePaypalButton from '../braintree_payment/BraintreePaypal';

export const BasketTable = ({basketData, onClose, onCheckout, onRemoveItem}) => {
    if (basketData.items.length === 0){
            return (<p>You have no items in your basket!</p>)
        }
        else {
            let rows = basketData.items.map(item => (
                <tr key={item.id}>
                    <td><a href={`/shop/${item.variant.product.slug}`}>{item.variant.product.title}</a></td>
                    <td>{item.quantity}</td>
                    <td>{item.price.toLocaleString('en-EN', {style: 'currency', currency: 'GBP'})}</td>
                    <td>{item.total.toLocaleString('en-EN', {style: 'currency', currency: 'GBP'})}</td>
                    <td>
                      <a className="nav-link" onClick={() => onRemoveItem(item.variant.id, item.quantity)}>
                        <i className="fa fa-trash"></i>
                      </a>
                    </td>
                </tr>
            ))

            let basketTotal = basketData.items.reduce((total, item) => total+item.total, 0)

            return (
                <div>
                    <Table responsive hover>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                            <tr>
                                <td/>
                                <td/>
                                <td><h4>Grand Total</h4></td>
                                <td><strong>{basketTotal.toLocaleString('en-EN', {style: 'currency', currency: 'GBP'})}</strong></td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className="row">
                        <div className="col-md-6 offset-md-6">
                            <ButtonToolbar>
                                <Button onClick={onClose}>Close</Button>
                                <Button onClick={onCheckout} bsStyle="primary">Checkout</Button>
                            </ButtonToolbar>
                        </div>
                    </div>
                </div>
                
            )

        }
}
