import {withRouter, Link} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'

import {FiLogOut} from 'react-icons/fi'

import {BsFillBriefcaseFill} from 'react-icons/bs'

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
      <ul className="nav-list">
        <li>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="header-logo"
            />
          </Link>
        </li>

        <li className="route-list">
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

      <ul className="nav-list-sm">
        <li>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="header-logo"
            />
          </Link>
        </li>

        <li className="route-list">
          <Link className="link" to="/">
            <AiFillHome className="nav-link-logos" />
          </Link>
        </li>
        <li className="route-list">
          <Link to="/jobs" className="link">
            <BsFillBriefcaseFill className="nav-link-logos" />
          </Link>
        </li>

        <li>
          <button className="logout-btn" onClick={logoutFunc} type="button">
            <FiLogOut className="nav-link-logos" />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
