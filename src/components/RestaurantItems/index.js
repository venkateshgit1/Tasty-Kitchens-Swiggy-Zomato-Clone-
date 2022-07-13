import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const RestaurantItems = props => {
  const {restaurantItemDetails} = props
  const {
    imageUrl,
    name,
    cuisine,
    rating,
    totalReviews,
    id,
  } = restaurantItemDetails

  return (
    <li className="restaurant-items-list" testid="restaurant-item">
      <Link to={`/restaurant/${id}`} className="link">
        <div className="restaurant-items-container">
          <img
            src={imageUrl}
            alt="restaurant"
            className="restaurant-item-image"
          />
          <div className="restaurant-item-details">
            <h1 className="restaurant-item-name">{name}</h1>
            <p className="restaurant-item-cuisine">{cuisine}</p>
            <div className="ratings-container">
              <p className="restaurant-rating">
                <AiFillStar className="star-icon" /> {rating}
              </p>
              <p className="restaurant-total-reviews">
                ({totalReviews} ratings)
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}
export default RestaurantItems
