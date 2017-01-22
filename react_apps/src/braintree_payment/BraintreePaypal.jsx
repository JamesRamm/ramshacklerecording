import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, Form, reduxForm } from 'redux-form';
import braintree from 'braintree-web';
import { get_token } from '../api';
import { setupBraintreePaypal, fetchToken } from './actions'

class BraintreePaypalButton extends Component {
  
  componentDidMount(){
    this.props.setupBraintreePaypal(this.props.totalAmount, 
                                    this.refs.paypalButton,
                                    this.props.handleSubmit,
                                    this.props.currency,
                                    this.props.enableShippingAddress,
                                    this.props.shippingAddressEditable)
  }


  render() {

    return (
      <button 
        ref="paypalButton"
        id={this.props.buttonId}
        className={this.props.buttonClass}
        disabled={!this.props.braintreeReady}
      >
        {this.props.buttonText}
      </button>
    )

  }

}

BraintreePaypalButton.propTypes = {
  buttonId: PropTypes.string,
  buttonClass: PropTypes.string,
  buttonText: PropTypes.string,
  currency: PropTypes.string,
  enableShippingAddress: PropTypes.bool,
  shippingAddressEditable: PropTypes.bool,
  braintreeReady: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  totalAmount: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setupBraintreePaypal: PropTypes.func.isRequired
}

BraintreePaypalButton.defaultProps = {
  buttonId: 'paypal-button',
  buttonClass: 'btn btn-primary',
  buttonText: 'Pay',
  currency: 'GBP',
  enableShippingAddress: true,
  shippingAddressEditable: true
}

const mapStateToProps = (state) => ({
  loading: state.braintreeData.loading,
  braintreeReady: state.braintreeData.braintreeReady
})

BraintreePaypalButton = connect(
  mapStateToProps,
  {
    setupBraintreePaypal
  }
)(BraintreePaypalButton)

export default BraintreePaypalButton;
