import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logOutClicked = () => {
    console.log('logout clicked')
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <ul className="header-container">
      <Link to="/">
        <li>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo-header"
          />
        </li>
      </Link>

      <ul className="header-middle-container">
        <Link className="header-links" to="/">
          <li className="header-middle-names">Home</li>
        </Link>
        <Link className="header-links" to="/jobs">
          <li className="header-middle-names">Jobs</li>
        </Link>
      </ul>

      <button type="button" className="logout-button" onClick={logOutClicked}>
        <li>Logout</li>
      </button>
    </ul>
  )
}

export default withRouter(Header)
