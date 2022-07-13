import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'
import CartSummary from '../CartSummary'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const emptyCart = cartList.length === 0
      return emptyCart ? (
        <EmptyCartView />
      ) : (
        <>
          <div className="cart-items">
            <ul className="cart-list">
              {cartList.map(eachCartItem => (
                <CartItem
                  key={eachCartItem.id}
                  cartItemDetails={eachCartItem}
                />
              ))}
            </ul>
            <CartSummary />
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
