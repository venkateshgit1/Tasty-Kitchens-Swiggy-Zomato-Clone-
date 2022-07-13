import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import Navbar from '../Navbar'

import RestaurantFoodItems from '../RestaurantFoodItems'
import Footer from '../Footer'

import './index.css'

class RestaurantDetails extends Component {
  state = {
    restaurantDetailsList: [],
    foodItemsList: [],
    detailsLoading: false,
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({detailsLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedDetails = {
      rating: data.rating,
      id: data.id,
      name: data.name,
      costForTwo: data.cost_for_two,
      cuisine: data.cuisine,
      imageUrl: data.image_url,
      reviewsCount: data.reviews_count,
      opensAt: data.opens_at,
      location: data.location,
      itemsCount: data.items_count,
    }
    const updatedFoodItems = data.food_items.map(eachItem => ({
      name: eachItem.name,
      cost: eachItem.cost,
      foodType: eachItem.food_type,
      imageUrl: eachItem.image_url,
      id: eachItem.id,
      rating: eachItem.rating,
    }))
    this.setState({
      restaurantDetailsList: updatedDetails,
      foodItemsList: updatedFoodItems,
      detailsLoading: false,
    })
  }

  renderLoaderAndDetailsView = () => {
    const {detailsLoading} = this.state
    return detailsLoading
      ? this.renderRestaurantDetailsLoader()
      : this.renderRestaurantDetails()
  }

  renderRestaurantDetailsLoader = () => (
    <div className="details-loader" testid="restaurant-details-loader">
      <Loader type="Oval" color="#F7931E" height="40" width="40" />
    </div>
  )

  renderRestaurantDetails = () => {
    const {restaurantDetailsList, foodItemsList} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
      costForTwo,
    } = restaurantDetailsList
    return (
      <div className="restaurant-details-container">
        <div className="restaurant-item-details-container">
          <div className="item-details-container">
            <img
              src={imageUrl}
              alt="restaurant"
              className="restaurant-details-image"
            />
            <div className="restaurant-information-container">
              <h1 className="restaurant-name">{name}</h1>
              <p className="restaurant-food-type">{cuisine}</p>
              <p className="restaurant-location">{location}</p>
              <div className="restaurant-ratings-and-cost-container">
                <div className="restaurant-ratings-container">
                  <p className="restaurant-ratings">
                    <AiFillStar className="restaurant-ratings-star" /> {rating}
                  </p>
                  <p className="restaurant-total-reviews-count">
                    {reviewsCount}+Ratings
                  </p>
                </div>
                <div className="cost-container">
                  <p className="restaurant-cost-for-two">
                    <BiRupee className="rupee-icon" />
                    {costForTwo}
                  </p>
                  <p className="cost-for-two">Cost for two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="restaurant-food-items-list-container">
          {foodItemsList.map(eachItem => (
            <RestaurantFoodItems
              key={eachItem.id}
              restaurantFoodItemsDetails={eachItem}
            />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <>
        <Navbar />
        {this.renderLoaderAndDetailsView()}
        <Footer />
      </>
    )
  }
}

export default RestaurantDetails
