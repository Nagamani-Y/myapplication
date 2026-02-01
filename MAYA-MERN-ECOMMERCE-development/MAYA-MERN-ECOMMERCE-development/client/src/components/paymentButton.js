import StripeCheckout from 'react-stripe-checkout';
import { useDispatch, useSelector } from 'react-redux';
import { paymentCheckout } from './Redux/Actions/actions';
import { clearCart } from "./Redux/Slices/cartSlice";
import { useNavigate } from 'react-router-dom';

const PaymentButton = ({ totalAmount, cartItems }) => {
    const stripeKey = 'pk_test_51Ou8ltSFcNUpoV2W6LsyaIQo3jITSMHx2F6S8irvcGOboZzSFhas0J3ey9HUfJxfvUNE7yL1Sql0qjc1Y26KE31A001Cvqs8A1';
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.auth);
    const navigate = useNavigate();
    const handleToken = (token) => {
        dispatch(paymentCheckout({token, cartItems, totalAmount, user}));
        dispatch(clearCart());
        navigate('/paymentSucess');
    }
    return (
        <StripeCheckout
            stripeKey= {stripeKey}
            token={handleToken}
            shippingAddress
            amount={totalAmount * 100}
            name="Maya's Store"
            currency="INR">
            <button
                className="btn w-100 fw-bold text-white mt-3"
                style={{
                    background: "linear-gradient(90deg, #28a745, #20c997)",
                    border: "none",
                }}
            >
                Proceed to Checkout
            </button>
        </StripeCheckout>
    )
}

export default PaymentButton;
