import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  quantity: 1,
  orderPlaced: false,
  showMobileView: false,
  removeCartItem: () => {},
  onClickMobileView: () => {},
  onHideMobileView: () => {},
  onClickOrderPlaced: () => {},
  onClickGoToHomePage: () => {},
  addCartItem: () => {},
  onDecreaseQuantity: () => {},
  onIncreaseQuantity: () => {},
  deleteCartItem: () => {},
})

export default CartContext
