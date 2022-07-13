import CartListView from '../CartListView'
import PaymentSuccessful from '../PaymentSuccessful'

import CartContext from '../../context/CartContext'

import Navbar from '../Navbar'
import Footer from '../Footer'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {orderPlaced} = value

      return orderPlaced ? (
        <PaymentSuccessful />
      ) : (
        <>
          <Navbar />
          <div className="cart-container">
            <CartListView />
          </div>
          <Footer />
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
