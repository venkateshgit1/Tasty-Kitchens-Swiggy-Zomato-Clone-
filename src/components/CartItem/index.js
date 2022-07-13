import {BiRupee} from 'react-icons/bi'
import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {onDecreaseQuantity, onIncreaseQuantity} = value
      const {cartItemDetails} = props
      const {id, imageUrl, name, quantity, cost} = cartItemDetails
      const totalCost = cost * quantity

      const onClickDecrement = () => {
        onDecreaseQuantity(id)
      }

      const onClickIncrement = () => {
        onIncreaseQuantity(id)
      }

      return (
        <li className="cart-list">
          <div className="cart-list-container">
            <div className="cart-items-container" testid="cartItem">
              <img src={imageUrl} alt="cart " className="cart-item-image" />
              <div className="cart-list-details-container">
                <h1 className="cart-item-name">{name}</h1>
                <div className="quantity-container">
                  <button
                    className="quantity-button"
                    type="button"
                    testid="decrement-quantity"
                    onClick={onClickDecrement}
                  >
                    -
                  </button>
                  <p className="item-quantity" testid="item-quantity">
                    {quantity}
                  </p>
                  <button
                    className="quantity-button"
                    type="button"
                    testid="increment-quantity"
                    onClick={onClickIncrement}
                  >
                    +
                  </button>
                </div>
                <p className="cart-item-price">
                  <BiRupee className="cost-logo" /> {totalCost}.00
                </p>
              </div>
            </div>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)
export default CartItem
