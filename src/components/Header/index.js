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
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="header-logo"
      />
      <ul className="route-list">
        <li>
          <Link className="link" to="/">
            <p className="link-text">Home</p>
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="link">
            <p className="link-text">Jobs</p>
          </Link>
        </li>
      </ul>
      <button className="logout-btn" onClick={logoutFunc} type="button">
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
