import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, Form, reduxForm } from 'redux-form';
import braintree from 'braintree-web';
import { setupBraintree, fetchToken } from './actions';

const styles = {
  'input': {
    'font-size': '14px',
    'font-family': 'Raleway, tahoma, calibri, sans-serif',
    'color': '#6c5a49',
    height: '34px'
  },
  ':focus': {
    'color': 'black'
  }
}
const fields = {
  number: {
    selector: '#card-number',
    placeholder: '4111 1111 1111 1111'
  },
  cvv: {
    selector: '#cvv',
    placeholder: '123'
  },
  expirationMonth: {
    selector: '#expiration-month',
    placeholder: 'MM'
  },
  expirationYear: {
    selector: '#expiration-year',
    placeholder: 'YY'
  },
  postalCode: {
    selector: '#postal-code',
    placeholder: '90210'
  }
}

const BootstrapTextInput = (field) => (
  <input {...field.input} type="text" className="form-control"></input>
)

class BraintreePayment extends Component {


  componentDidMount() {
    this.props.setupBraintree(styles, fields, this.props.getToken)
  }

  handleChange(event, field) {
    this.setState({ [field]: event.target.value });
  }

  handleSubmit = (values) => {
    this.props.fetchToken(this.props.braintreeData.hostedFieldsInstance)
  }

  render() {
    return (
      <div>
        {this.props.braintreeData.loading ? <div className="loading"><i className='fa fa-refresh fa-spin fa-fw'></i></div> : null}
        <form id="checkout-form" onSubmit={this.props.handleSubmit(this.handleSubmit)} >
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <h4>Card Details</h4>
              <div className="form-group">
                <label className="control-label">Card Number</label>
                <div className="form-control" id="card-number"></div>
                <span className="helper-text"></span>
              </div>
              <div className="form-group">
                <div className="row">
                  <label className="control-label col-md-12">Expiration Date</label>
                  <div className="col-md-6">
                    <div className="form-control" id="expiration-month"></div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-control" id="expiration-year"></div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="control-label">Security Code (CVV)</label>
                <div className="form-control" id="cvv"></div>
              </div>
              <div className="form-group">
                <label className="control-label">Billing Postal Code</label>
                <div className="form-control" id="postal-code"></div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <h4>Shipping Address</h4>
              <div className="form-group">
                <label className="control-label">Address Line 1</label>
                <Field component={BootstrapTextInput} name="addressLine1" type="text" />
                <span className="helper-text"></span>
              </div>
              <div className="form-group">
                <label className="control-label">Address Line 2</label>
                <Field name="addressLine2" component={BootstrapTextInput} type="text" />
                <span className="helper-text"></span>
              </div>
              <div className="form-group">
                <label className="control-label">City</label>
                <Field name="addressCity" component={BootstrapTextInput} type="text" />
                <span className="helper-text"></span>
              </div>
              <div className="form-group">
                <label className="control-label">Country</label>
                <Field name="addressCountry" component={BootstrapTextInput} type="text" />                
                <span className="helper-text"></span>
              </div>
              <div className="form-group">
                <label className="control-label">Postal Code</label>
                <Field name="addressPostcode" component={BootstrapTextInput} type="text" />
                <span className="helper-text"></span>
              </div>
            </div>
          
            <div className="col-md-6 offset-md-6">
              <div className="btn-toolbar">
                <button id="close" className="btn btn-secondary">Cancel</button>
                <button value="submit" id="submit" className="btn btn-primary">Pay with <span id="card-type">Card</span></button>
              </div>
            </div>
          </div>
        </form>

      </div>
    )
  }
}

BraintreePayment.propTypes = {
  getToken: PropTypes.func.isRequired
}

const mapStateToProps = (state) => (
  {
    braintreeData: state.braintreeData
  }
);

BraintreePayment = reduxForm({
  form: 'payment' // a unique name for this form
})(BraintreePayment);

BraintreePayment = connect(
  mapStateToProps,
  {
    setupBraintree,
    fetchToken
  })(BraintreePayment);


export default BraintreePayment;
