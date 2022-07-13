import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import CartContext from '../../context/CartContext'

import './index.css'

class RestaurantFoodItems extends Component {
  state = {quantity: 1}

  onDecreaseCount = () => {
    this.setState(prevState => ({
      quantity: prevState.quantity - 1,
    }))
  }

  onIncreaseCount = () => {
    this.setState(prevState => ({
      quantity: prevState.quantity + 1,
    }))
  }

  renderCounterContainer = () => {
    const {quantity} = this.state
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
  }

  render() {
    const {quantity} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {restaurantFoodItemsDetails} = this.props
          const {name, cost, imageUrl, rating} = restaurantFoodItemsDetails
          const {addCartItem} = value

          const onAddCart = () => {
            if (quantity >= 1) {
              addCartItem({...restaurantFoodItemsDetails, quantity})
            }
          }

          return (
            <li className="restaurant-food-items-list" testid="foodItem">
              <div className="food-items-details-container">
                <div className="restaurant-food-item-details">
                  <img
                    src={imageUrl}
                    alt="food item"
                    className="food-item-image"
                  />
                  <div className="food-item-details">
                    <h1 className="food-item-name">{name}</h1>
                    <p className="food-item-cost">
                      <BiRupee className="food-item-cost-logo" /> {cost}
                    </p>
                    <p className="food-item-rating">
                      <AiFillStar className="food-item-star" />
                      {rating}
                    </p>

                    {quantity > 0 ? this.renderCounterContainer() : null}

                    <button
                      className="add-button"
                      type="button"
                      onClick={onAddCart}
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default RestaurantFoodItems
