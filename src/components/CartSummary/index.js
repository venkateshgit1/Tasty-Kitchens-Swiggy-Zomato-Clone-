import {BiRupee} from 'react-icons/bi'

import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, onClickOrderPlaced} = value

      let total = 0
      cartList.forEach(eachCartItem => {
        total += eachCartItem.cost * eachCartItem.quantity
      })

      return (
        <div className="cart-summary">
          <div className="cart-summary-container">
            <h1 className="order-total-heading">Order Total:</h1>
            <p className="order-total-value" testid="total-price">
              <BiRupee className="total-price-icon" /> {total}.00
            </p>
          </div>

          <button
            type="button"
            className="place-order-button"
            onClick={onClickOrderPlaced}
          >
            Place Order
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
