import React, {Component, PropTypes} from 'react';

export const OrderConfirmation = ({email, id}) => (
    <div className='container'>
        <p>Great!</p>
        <p>Your order ID is #{id}</p>
        <p>Details of your order will be emailed to {email}</p>
        <p>If you have any problems, send us an email at ramshacklerecording@gmail.com</p>
    </div>
);
