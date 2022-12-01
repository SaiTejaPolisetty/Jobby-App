import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import './index.css'

import Cookies from 'js-cookie'

class LoginForm extends Component {
  state = {username: '', password: '', apiResponse: ''}

  setUserName = event => {
    this.setState({username: event.target.value})
  }

  setPassword = event => {
    this.setState({password: event.target.value})
  }

  loginFunc = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      // console.log(response)
      Cookies.set('jwt_token', data.jwt_token, {expires: 10})
      const {history} = this.props
      history.replace('/')
      this.setState({username: '', password: '', apiResponse: ''})
    } else {
      // console.log(response, 'FAIL')
      this.setState({apiResponse: data.error_msg})
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, apiResponse} = this.state
    // console.log(apiResponse)

    // const jwtToken = Cookies.get('jwt_token')
    // console.log(jwtToken)

    return (
      <div className="login-bg-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo"
          />
          <form onSubmit={this.loginFunc} className="login-form">
            <div className="login-label-input-container">
              <label className="label" htmlFor="userName">
                USERNAME
              </label>
              <br />
              <input
                value={username}
                type="text"
                onChange={this.setUserName}
                className="login-input"
                id="userName"
                placeholder="Username"
              />
            </div>
            <div className="login-label-input-container">
              <br />
              <label className="label" htmlFor="password">
                PASSWORD
              </label>
              <br />
              <input
                type="password"
                value={password}
                onChange={this.setPassword}
                className="login-input"
                id="password"
                placeholder="Password"
              />
              <br />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
            {apiResponse !== '' ? (
              <p className="error-text">*{apiResponse}</p>
            ) : (
              ' '
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
