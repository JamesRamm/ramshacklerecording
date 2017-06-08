import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, Form, reduxForm } from 'redux-form';
import { get_shipping_countries } from '../api';

const BootstrapTextInput = (field) => (
  <nobr>
    <input {...field.input} type="text" className="form-control" />
    {field.error ? <div className="form-control-feedback">This field is required!</div> : null}
  </nobr>
)

let AddressForm = class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loadingCountries: true,
      countries: []
    };
  }

  componentDidMount() {
    get_shipping_countries().then(data => {
      this.setState({
        loadingCountries: false,
        countries: data
      })
    }
    );
  }

  render() {
    return (
      <form id="address=form" onSubmit={this.props.handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className={`form-group${this.props.errors.email ? " has-danger" : ''}`}>
              <label className="control-label">Email</label>
              <Field
                component={BootstrapTextInput}
                name="email"
                type="text"
                error={this.props.errors.email} 
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className={`form-group${this.props.errors.name ? " has-danger" : ''}`}>
              <label className="control-label">Name</label>
              <Field
                component={BootstrapTextInput}
                name="name"
                type="text"
                error={this.props.errors.name}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className={`form-group${this.props.errors.line1 ? " has-danger" : ''}`}>
              <label className="control-label">Address Line 1</label>
              <Field
                component={BootstrapTextInput}
                name="addressLine1"
                type="text"
                error={this.props.errors.line1}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className={`form-group${this.props.errors.city ? " has-danger" : ''}`}>
              <label className="control-label">City</label>
              <Field
                name="addressCity"
                component={BootstrapTextInput}
                type="text"
                error={this.props.errors.city}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className={`form-group${this.props.errors.country ? " has-danger" : ''}`}>
              <label className="control-label">Country</label>
              <Field
                  name="addressCountry"
                  component="select"
                  className="form-control"
                >
                  <option value="">Choose a country...</option>
                  {this.state.countries.map(country => (
                    <option value={country.iso} key={country.iso}>{country.name}</option>
                  ))}
                </Field>
            </div>
          </div>
          <div className="col-md-6">
            <div className={`form-group${this.props.errors.postcode ? " has-danger" : ''}`}>
              <label className="control-label">Postal Code</label>
              <Field
                name="addressPostcode"
                component={BootstrapTextInput}
                type="text"
                error={this.props.errors.postcode}
              />
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
