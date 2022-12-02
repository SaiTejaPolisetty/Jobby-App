import {withRouter, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const logoutFunc = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="navbar">
      <ul className="route-list">
        <li>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="header-logo"
            />
          </Link>
        </li>

        <li>
          <Link className="link" to="/">
            <p className="link-text">Home</p>
          </Link>

          <Link to="/jobs" className="link">
            <p className="link-text">Jobs</p>
          </Link>
        </li>

        <li>
          <button className="logout-btn" onClick={logoutFunc} type="button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
