import {Link} from 'react-router-dom'

import './index.css'

const EmptyCartView = () => (
  <div className="no-orders-view-container">
    <img
      src="https://res.cloudinary.com/ddb9gpwaj/image/upload/v1656999448/cooking_1_lcioke.png"
      alt="empty cart"
      className="no-orders-image"
    />
    <h1 className="no-orders-heading">No Order Yet!</h1>
    <p className="no-orders-description">
      Your cart is empty. Add something from the menu.
    </p>
    <Link to="/" className="link">
      <button type="button" className="order-now-button">
        Order Now
      </button>
    </Link>
  </div>
)

export default EmptyCartView
