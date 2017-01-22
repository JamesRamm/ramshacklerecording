import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setupBraintreeDropIn, teardownBraintreeDropIn  } from './actions'

class BraintreeDropIn extends Component {

  componentDidMount() {
    this.props.setupBraintreeDropIn(this.props.containerId,
                                    this.props.totalAmount,
                                    this.props.handleSubmit)
  }

  componentWillUnmount() {
    this.props.braintreeCheckout.teardown(this.props.teardownBraintreeDropIn)
  }

  render() {
    return (
      <form onSubmit={(e) => {e.preventDefault();}} >
      <h5>Please enter your payment details or pay with PayPal:</h5>
        <div id={this.props.containerId}>{this.props.loading ? <span className="text-center"><i className='fa fa-spinner fa-spin fa-2x fa-fw'></i></span> : null}</div>
        <div className="row">
          <div className="col-md-6 offset-md-6">
            <div className="btn-toolbar">
              <button id="close" className="btn btn-secondary" onClick={this.props.onClose}>Cancel</button>
              <button disabled={!this.props.braintreeReady} type="submit" className="btn btn-primary">Pay</button>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

BraintreeDropIn.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  braintreeReady: PropTypes.bool.isRequired,
  totalAmount: PropTypes.number.isRequired,
  containerId: PropTypes.string
};

BraintreeDropIn.defaultProps = {
  containerId: 'dropin-container'
}

const mapStateToProps = (state) => ({
  loading: state.braintreeData.loading,
  braintreeReady: state.braintreeData.braintreeReady,
  braintreeCheckout: state.braintreeData.braintreeCheckout
})

BraintreeDropIn = connect(
  mapStateToProps,
  { setupBraintreeDropIn, teardownBraintreeDropIn }
)(BraintreeDropIn);

export default BraintreeDropIn;
