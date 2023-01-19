import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = () => {
  const logOutClicked = () => {
    Cookies.remove('jwt_token')
  }

  return (
    <div className="header-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="website-logo-header"
      />
      <ul className="header-middle-container">
        <Link className="header-links" to="/">
          <li className="header-middle-names">Home</li>
        </Link>
        <Link className="header-links" to="/jobs">
          <li className="header-middle-names">Jobs</li>
        </Link>
      </ul>
      <button type="button" className="logout-button" onClick={logOutClicked}>
        Logout
      </button>
    </div>
  )
}

export default Header
