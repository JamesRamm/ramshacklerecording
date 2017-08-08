import React, {Component, PropTypes} from 'react';
import { Modal, Button, ButtonToolbar, Table } from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchBasket, closeModal, fetchShippingCost, submitOrder, submitRemoveBasketItem, nextPage, submitAddress } from './actions';
import { BasketTable } from './BasketTable';
import { OrderConfirmation } from './OrderConfirmation';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';

class Basket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addressErrors: {
                name: false,
                line1: false,
                city: false,
                postcode: false,
                country: false,
                email: false
            }
        }
    }

    open() {
        this.props.fetchBasket()
        this.setState({
            addressErrors: {
                name: false,
                line1: false,
                city: false,
                postcode: false,
                country: false,
                email: false
            }
        });
    }

    handleAddressSubmit(values, dispatch) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const errors = {
            name: values.name ? false : true,
            line1: values.addressLine1 ? false : true,
            city: values.addressCity ? false : true,
            postcode: values.addressPostcode ? false : true,
            country: values.addressCountry ? false : true,
            email: !regex.test(values.email)
        };
        if (errors.name || errors.line1 || errors.city || errors.postcode || errors.country || errors.email) {
            this.setState({
                addressErrors: errors
            });
        }
        else {
            this.setState({
                addressErrors: {
                    name: false,
                    line1: false,
                    city: false,
                    postcode: false,
                    country: false,
                    email: false
                }
            })
            this.props.submitAddress(values);
            this.props.fetchShippingCost(values);
        }
    }

    renderModalPage() {
        let page = null;
        let title = null;
        switch (this.props.pageNumber) {
            case 1:
                page = (
                    <BasketTable
                        basketData={this.props.basketData}
                        onClose={this.props.close}
                        onCheckout={this.props.nextPage}
                        onRemoveItem={this.props.removeItem}
                    />
                );
                title = 'Your Basket';
                break;

            case 2:
                window.location.href = '/checkout/';
            default:
                window.location.href = '/checkout/';
        }

        return (
            <Modal show={this.props.showModal} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.loading ? <i className={`fa fa-refresh fa-spin fa-fw`}></i> : page}
                </Modal.Body>
            </Modal>
        )
    }

    render() {
        let count = 0;
        if (!this.props.loading) {
            if (this.props.basketData.results.length > 0) {
                count = this.props.basketData.results.reduce((prev, current) => prev + current.quantity, 0)
            }
            else {
                count = this.props.basketData.count;
            }
        }
        return (
            <div>
                <a className="nav-link" onClick={this.open.bind(this)}>
                    <i className="fa fa-shopping-basket" aria-hidden="true"></i>&nbsp;
                    <span className="tag tag-pill tag-default" id="basket-item-count">
                        { this.props.loading ?
                        <i className={`fa fa-refresh fa-spin fa-fw`}></i>
                        :
                        count}
                    </span>
                </a>
                {this.renderModalPage()}
            </div>
        );
    }
}

Basket.propTypes = {
    fetchBasket: PropTypes.func.isRequired,
    fetchShippingCost: PropTypes.func.isRequired,
    submitOrder: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    order: PropTypes.object.isRequired,
    basketData: PropTypes.object.isRequired,
    shippingData: PropTypes.object.isRequired,
}


const mapStateToProps = (state) => {
  return {
    basketData: state.basketData,
    shippingData: state.shippingData,
    order: state.order,
    pageNumber: state.basketUi.page,
    loading: state.basketUi.loading,
    showModal: state.basketUi.showModal,
  };
};


// connect subscribes the component to the store
const CurrentBasket = connect(
  mapStateToProps,
  {
    fetchBasket: fetchBasket,
    close: closeModal,
    fetchShippingCost,
    nextPage,
    submitAddress,
    submitOrder,
    removeItem: submitRemoveBasketItem
  })(Basket);

export default CurrentBasket;

