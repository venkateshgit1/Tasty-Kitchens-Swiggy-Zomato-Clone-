import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import CartContext from '../../context/CartContext'
import './index.css'

const PaymentSuccessful = () => (
  <CartContext.Consumer>
    {value => {
      const {onClickGoToHomePage} = value
      return (
        <>
          <Navbar />
          <div className="payment-success-container">
            <img
              src="https://res.cloudinary.com/ddb9gpwaj/image/upload/v1656999462/check-circle.1_1_yzpc4n.png"
              alt="payment success"
              className="payment-success-image"
            />
            <h1 className="order-success-heading">Payment Successful</h1>
            <p className="order-success-description">
              Thank you for ordering Your payment is successfully completed.
            </p>
            <Link to="/" className="link">
              <button
                className="go-to-home-button"
                type="button"
                onClick={onClickGoToHomePage}
              >
                Go To Home Page
              </button>
            </Link>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default PaymentSuccessful
