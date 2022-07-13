import {Component} from 'react'

import {CartContext} from '../../context/CartContext'
import './index.css'

class Counter extends Component {
  state = {quantity: 1}

  onDecreaseCount = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onIncreaseCount = () => {
    this.setState(prevState => ({
      quantity: prevState.quantity + 1,
    }))
  }

  render() {
    const {quantity} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          console.log(cartList)
          return (
            <div className="counter-container">
              <button
                className="count-button"
                type="button"
                onClick={this.onDecreaseCount}
                testid="decrement-count"
              >
                -
              </button>
              <div className="active-count" testid="active-count">
                {quantity}
              </div>
              <button
                className="count-button"
                type="button"
                onClick={this.onIncreaseCount}
                testid="increment-count"
              >
                +
              </button>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default Counter
