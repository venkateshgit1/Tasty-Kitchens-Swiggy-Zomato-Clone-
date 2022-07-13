import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-logo-container">
      <img
        src="https://res.cloudinary.com/ddb9gpwaj/image/upload/v1656758780/Group_7420_lhgsat.png"
        alt="website-footer-logo"
        className="footer-logo-image"
      />
      <h1 className="footer-website-name">Tasty Kitchens</h1>
    </div>
    <p className="footer-description">
      The only thing we are serious about is food.
      <br /> Contact us on.
    </p>
    <div className="social-media-icons-container">
      <FaPinterestSquare
        className="social-icon"
        testid="pintrest-social-icon"
      />
      <FaInstagram className="social-icon" testid="instagram-social-icon" />
      <FaTwitter className="social-icon" testid="twitter-social-icon" />
      <FaFacebookSquare className="social-icon" testid="facebook-social-icon" />
    </div>
  </div>
)

export default Footer
