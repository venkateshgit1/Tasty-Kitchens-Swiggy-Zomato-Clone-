import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/ddb9gpwaj/image/upload/v1656999430/erroring_1_pkx1uw.png"
      className="not-found-image"
      alt="not found"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-description">
      We are sorry, the page you requested could not be found. Please go back to
      the homepage
    </p>
    <Link to="/" className="link">
      <button className="not-found-button" type="button">
        Home Page
      </button>
    </Link>
  </div>
)
export default NotFound
