import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, Form, reduxForm } from 'redux-form';

const BootstrapTextInput = (field) => (
  <input {...field.input} type="text" className="form-control"></input>
)

const submit = (values, dispatch) => {
  console.log(values)
}

let AddressForm = class extends Component {

  render() {
    return (
      <form id="address=form" onSubmit={this.props.handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="control-label">Email</label>
              <Field component={BootstrapTextInput} name="email" type="text" />
              <span className="helper-text"></span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="control-label">Name</label>
              <Field component={BootstrapTextInput} name="name" type="text" />
              <span className="helper-text"></span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="control-label">Address Line 1</label>
              <Field component={BootstrapTextInput} name="addressLine1" type="text" />
              <span className="helper-text"></span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="control-label">City</label>
              <Field name="addressCity" component={BootstrapTextInput} type="text" />
              <span className="helper-text"></span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="control-label">Country</label>
              <Field name="addressCountry" component={BootstrapTextInput} type="text" />                
              <span className="helper-text"></span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="control-label">Postal Code</label>
              <Field name="addressPostcode" component={BootstrapTextInput} type="text" />
              <span className="helper-text"></span>
            </div>
          </div>
        </div>
        <div className="row">
        <div className="col-md-6 offset-md-6">
          <div className="btn-toolbar">
            <button id="close" className="btn btn-secondary" onClick={this.props.handleCancel}>Cancel</button>
            <button type="submit" id="submit" className="btn btn-primary">Proceed</button>
          </div>
        </div>
        </div>
      </form>
    )
  }
}

AddressForm.propTypes = {
  handleCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

AddressForm = reduxForm({
  form: 'shippingAddress'
})(AddressForm);

export default AddressForm;
