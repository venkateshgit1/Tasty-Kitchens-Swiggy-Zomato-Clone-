import {withRouter, Link} from 'react-router-dom'
import {AiFillCloseCircle} from 'react-icons/ai'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import CartContext from '../../context/CartContext'

import './index.css'

const Navbar = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {
          cartList,
          showMobileView,
          onClickMobileView,
          onHideMobileView,
        } = value
        const cartListCount = cartList.length

        const renderMobileView = () => (
          <div className="navbar-mobile-container">
            <div className="navbar-mobile-options-container">
              <Link to="/" className="link">
                <li className="mobile-option">Home</li>
              </Link>
              <Link to="/cart" className="link">
                <li className="mobile-option">
                  Cart
                  {cartListCount > 0 ? (
                    <span className="cart-list-count">{cartListCount}</span>
                  ) : null}
                </li>
              </Link>

              <button
                className="logout-mobile-button"
                type="button"
                onClick={onClickLogout}
              >
                Logout
              </button>

              <button
                className="close-button"
                type="button"
                onClick={onHideMobileView}
              >
                <AiFillCloseCircle className="close-icon" />
              </button>
            </div>
          </div>
        )

        return (
          <>
            <nav className="navbar-container">
              <div className="navbar-details-container">
                <Link to="/" className="link">
                  <div className="navbar-logo-container">
                    <img
                      src="https://res.cloudinary.com/ddb9gpwaj/image/upload/v1656754022/Frame_274_otjxco.png"
                      alt="website logo"
                      className="navbar-website-logo"
                    />
                    <h1 className="navbar-website-name">Tasty Kitchens</h1>
                  </div>
                </Link>
                <div className="navbar-options-container">
                  <Link to="/" className="link">
                    <li className="option">Home</li>
                  </Link>
                  <Link to="/cart" className="link">
                    <li className="option">
                      Cart
                      {cartListCount > 0 ? (
                        <span className="cart-list-count">{cartListCount}</span>
                      ) : null}
                    </li>
                  </Link>

                  <button
                    className="logout-button"
                    type="button"
                    onClick={onClickLogout}
                  >
                    Logout
                  </button>
                </div>
                <button
                  className="hamburger-button"
                  type="button"
                  onClick={onClickMobileView}
                >
                  <GiHamburgerMenu className="hamburger-menu-icon" />
                </button>
              </div>
            </nav>
            {showMobileView ? renderMobileView() : null}
          </>
        )
      }}
    </CartContext.Consumer>
  )
}
export default withRouter(Navbar)
