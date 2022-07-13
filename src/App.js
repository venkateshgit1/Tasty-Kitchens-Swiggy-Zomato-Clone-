import {Route, Switch, Redirect} from 'react-router-dom'

import {Component} from 'react'
import CartContext from './context/CartContext'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Cart from './components/Cart'
import RestaurantDetails from './components/RestaurantDetails'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import './App.css'

class App extends Component {
  state = {
    cartList: [],
    quantity: 1,
    orderPlaced: false,
    showMobileView: false,
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )

    this.setState({cartList: updatedCartList})
  }

  addCartItem = item => {
    const {cartList} = this.state
    const cartItem = cartList.find(eachCartItem => eachCartItem.id === item.id)
    if (cartItem) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (eachCartItem.id === cartItem.id) {
            const updateQuantity = eachCartItem.quantity + item.quantity

            return {...eachCartItem, quantity: updateQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, item]
      localStorage.setItem('cartData', JSON.stringify(updatedCartList))
      this.setState({cartList: updatedCartList})
    }
  }

  onIncreaseQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (id === eachItem.id) {
          const updateQuantity = eachItem.quantity + 1

          return {...eachItem, quantity: updateQuantity}
        }
        return eachItem
      }),
    }))
  }

  onDecreaseQuantity = id => {
    const {cartList} = this.state
    const cartItem = cartList.find(eachItem => id === eachItem.id)
    if (cartItem.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (id === eachItem.id) {
            const updateQuantity = eachItem.quantity - 1
            return {...eachItem, quantity: updateQuantity}
          }
          return eachItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  onClickMobileView = () => {
    this.setState({showMobileView: true})
  }

  onHideMobileView = () => {
    this.setState({showMobileView: false})
  }

  onClickOrderPlaced = () => {
    this.setState(prevState => ({
      orderPlaced: !prevState.orderPlaced,
      cartList: [],
    }))
  }

  onClickGoToHomePage = () => {
    this.setState({orderPlaced: false})
  }

  render() {
    const {cartList, quantity, orderPlaced, showMobileView} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          quantity,
          orderPlaced,
          showMobileView,
          removeCartItem: this.removeCartItem,
          onClickMobileView: this.onClickMobileView,
          onHideMobileView: this.onHideMobileView,
          addCartItem: this.addCartItem,
          onClickGoToHomePage: this.onClickGoToHomePage,
          onIncreaseQuantity: this.onIncreaseQuantity,
          onDecreaseQuantity: this.onDecreaseQuantity,
          onClickOrderPlaced: this.onClickOrderPlaced,
        }}
      >
        <div>
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <ProtectedRoute
              exact
              path="/restaurant/:id"
              component={RestaurantDetails}
            />
            <Route exact path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </CartContext.Provider>
    )
  }
}

export default App

/* Today I've Completed the #reactjs mini-project Tasty Kitchens using #reactjs components, and react third-party packages like react-router-dom, react-loader-spinner, react-slick, etc... 
Using flexbox media query's to build a responsive website.
You can also check my mini-project using this link:-https://venkatswiggyapp.ccbp.tech
Login Credentials:- 
Username:- rahul,
Password:-  rahul@2021
#nxtwave  #ccbp  */
