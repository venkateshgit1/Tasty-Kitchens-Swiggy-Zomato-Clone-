import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', showErrorMsg: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <img
          alt="website login"
          src="https://res.cloudinary.com/ddb9gpwaj/image/upload/v1656738761/Rectangle_1457loginMobileImg_wpridf.png"
          className="login-mobile-image"
        />
        <div className="login-details-container">
          <div className="login-form-container">
            <div className="website-logo-container">
              <img
                src="https://res.cloudinary.com/ddb9gpwaj/image/upload/v1656754022/Frame_274_otjxco.png"
                alt="website logo"
                className="website-logo"
              />
              <h1 className="website-name">Tasty Kitchens</h1>
            </div>

            <form className="login-form" onSubmit={this.onSubmitForm}>
              <h1 className="login-heading">Login</h1>
              <label className="label" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                className="input"
                id="username"
                value={username}
                onChange={this.onChangeUsername}
              />
              <label className="label" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                className="input"
                id="password"
                value={password}
                onChange={this.onChangePassword}
              />
              <button className="login-button" type="submit">
                Login
              </button>
              {showErrorMsg && <p className="error-message">{errorMsg}</p>}
            </form>
          </div>
        </div>
        <img
          src="https://res.cloudinary.com/ddb9gpwaj/image/upload/v1656750606/Rectangle_1456loginImg_ztdt5b.png"
          alt="website login"
          className="login-desktop-image"
        />
      </div>
    )
  }
}

export default LoginForm
