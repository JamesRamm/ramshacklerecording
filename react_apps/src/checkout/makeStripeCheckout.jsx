import StripeCheckout from 'react-stripe-checkout';


export const makeStripeCheckout  = ({onToken, stripeKey}) =>
    <StripeCheckout
        name="Ramshackle Audio"
        description=""
        image="/static/img/logo_128.png"
        ComponentClass="div"
        panelLabel="Proceed"

        currency="GBP"
        stripeKey={stripeKey}
        locale="en"
        // Note: Enabling either address option will give the user the ability to
        // fill out both. Addresses are sent as a second parameter in the token callback.
        billingAddress={false}
        shippingAddress={true}
        // Note: enabling both zipCode checks and billing or shipping address will
        // cause zipCheck to be pulled from billing address (set to shipping if none provided).
        zipCode={true}
        allowRememberMe
        token={onToken}
        // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
        // you are using multiple stripe keys
        reconfigureOnUpdate={false}
        // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
        // useful if you're using React-Tap-Event-Plugin
        triggerEvent="onClick"
    >
        <button className="btn btn-primary">
            Checkout
        </button>
    </StripeCheckout>