import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import {BsFilterLeft} from 'react-icons/bs'
import {AiOutlineSearch} from 'react-icons/ai'
import {MdArrowBackIosNew, MdArrowForwardIos} from 'react-icons/md'

import Navbar from '../Navbar'
import Footer from '../Footer'
import RestaurantItems from '../RestaurantItems'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Lowest',
    value: 'Lowest',
  },
  {
    id: 2,
    displayText: 'Highest',
    value: 'Highest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    offersList: [],
    restaurantList: [],
    offersLoading: false,
    offset: 1,
    sortByValue: sortByOptions[0].value,
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRestaurantOffers()
    this.getRestaurantItemsList()
  }

  getRestaurantOffers = async () => {
    this.setState({offersLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updateOffers = data.offers.map(eachOffer => ({
      imageUrl: eachOffer.image_url,
    }))
    this.setState({offersList: updateOffers, offersLoading: false})
  }

  getRestaurantItemsList = async () => {
    const {offset, sortByValue, searchInput} = this.state
    console.log(sortByValue)
    const offsetNumber = (offset - 1) * 9

    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offsetNumber}&limit=9&sort_by_rating=${sortByValue}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const updateRestaurants = data.restaurants.map(eachRestaurant => ({
        hasOnlineDelivery: eachRestaurant.has_online_delivery,
        ratingText: eachRestaurant.user_rating.rating_text,
        ratingColor: eachRestaurant.user_rating.rating_color,
        totalReviews: eachRestaurant.user_rating.total_reviews,
        rating: eachRestaurant.user_rating.rating,
        name: eachRestaurant.name,
        hasTableBooking: eachRestaurant.has_table_booking,
        isDeliveringNow: eachRestaurant.is_delivering_now,
        costForTwo: eachRestaurant.cost_for_two,
        cuisine: eachRestaurant.cuisine,
        imageUrl: eachRestaurant.image_url,
        id: eachRestaurant.id,
        menuType: eachRestaurant.menu_type,
        location: eachRestaurant.location,
        opensAt: eachRestaurant.opens_at,
      }))
      this.setState({
        restaurantList: updateRestaurants,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderNoSearchResultsView = () => (
    <div className="no-results-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
        alt="no restaurants"
        className="no-restaurant-found-image"
      />
      <h1 className="no-restaurant-found-heading">No Restaurant Found</h1>
      <p className="no-restaurant-found-description">
        We could not find any restaurant. Try again...
      </p>
    </div>
  )

  renderOffersLoader = () => (
    <div className="offers-loader" testid="restaurants-offers-loader">
      <Loader type="Oval" color="#F7931E" height="40" width="40" />
    </div>
  )

  renderRestaurantListLoader = () => (
    <div className="restaurant-list-loader" testid="restaurants-list-loader">
      <Loader type="Oval" color="#F7931E" height="40" width="40" />
    </div>
  )

  renderOffersList = () => {
    const {offersList} = this.state
    const settings = {
      dots: true,
      speed: 700,
      infinite: true,
    }
    return (
      <div className="offers-list-container">
        <Slider {...settings}>
          {offersList.map(eachOffer => (
            <div className="offers-container" key={eachOffer.imageUrl}>
              <img
                src={eachOffer.imageUrl}
                alt="offer"
                className="offers-image"
              />
            </div>
          ))}
        </Slider>
      </div>
    )
  }

  renderRestaurantList = () => {
    const {restaurantList, offset} = this.state
    return (
      <>
        <ul className="restaurant-list-container">
          {restaurantList.map(eachItem => (
            <RestaurantItems
              key={eachItem.id}
              restaurantItemDetails={eachItem}
            />
          ))}
        </ul>
        <div className="pagination-container">
          <button
            className="pagination-button"
            testid="pagination-left-button"
            type="button"
            onClick={this.onDecreaseOffset}
          >
            <MdArrowBackIosNew className="pagination-icon" />
          </button>
          <p className="pagination-active-number">
            <span testid="active-page-number">{offset}</span> of 4
          </p>
          <button
            className="pagination-button"
            testid="pagination-right-button"
            type="button"
            onClick={this.onIncreaseOffset}
          >
            <MdArrowForwardIos className="pagination-icon" />
          </button>
        </div>
      </>
    )
  }

  onIncreaseOffset = () => {
    const {offset} = this.state
    if (offset < 4) {
      this.setState(
        prevState => ({
          offset: prevState.offset + 1,
        }),
        this.getRestaurantItemsList,
      )
    }
  }

  onDecreaseOffset = () => {
    const {offset} = this.state
    if (offset > 1) {
      this.setState(
        prevState => ({
          offset: prevState.offset - 1,
        }),
        this.getRestaurantItemsList,
      )
    }
  }

  onChangeSortBy = event => {
    this.setState(
      {sortByValue: event.target.value},
      this.getRestaurantItemsList,
    )
  }

  onChangeSearchInput = event => {
    this.setState(
      {searchInput: event.target.value},
      this.getRestaurantItemsList,
    )
  }

  renderRestaurantApiStatusView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderRestaurantListLoader()
      case apiStatusConstants.success:
        return this.renderRestaurantList()
      case apiStatusConstants.failure:
        return this.renderNoSearchResultsView()
      default:
        return null
    }
  }

  renderOffersAndLoaderView = () => {
    const {offersLoading} = this.state
    return offersLoading ? this.renderOffersLoader() : this.renderOffersList()
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Navbar />
        <div className="home-container">
          {this.renderOffersAndLoaderView()}
          <div className="popular-restaurants-container">
            <div className="popular-restaurant">
              <h1 className="popular-restaurant-heading">
                Popular Restaurants
              </h1>
              <p className="popular-restaurant-description">
                Select Your favourite restaurant special dish and make your day
                happy...
              </p>
            </div>
            <div className="filter-container">
              <BsFilterLeft className="filter-icon" />
              <p className="sort-by">Sort by</p>
              <select
                className="sort-by-container"
                onChange={this.onChangeSortBy}
              >
                {sortByOptions.map(eachOption => (
                  <option
                    className="sort-by-option"
                    key={eachOption.id}
                    value={eachOption.Value}
                  >
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="search-input-container">
            <div className="search-container">
              <input
                type="search"
                className="search-input"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                placeholder="Search Popular Restaurant"
              />
              <AiOutlineSearch className="search-icon" />
            </div>
          </div>
          {this.renderRestaurantApiStatusView()}
        </div>

        <Footer />
      </>
    )
  }
}

export default Home
