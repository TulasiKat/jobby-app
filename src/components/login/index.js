import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    userNameInputValue: '',
    passwordInputValue: '',
    showingError: false,
    errorMsg: '',
  }

  userNameChanged = event => {
    this.setState({userNameInputValue: event.target.value})
  }

  passwordChanged = event => {
    this.setState({passwordInputValue: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    this.setState({showingError: false, errorMsg: ''})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showingError: true, errorMsg})
  }

  loginFormSubmitted = async event => {
    event.preventDefault()
    const {userNameInputValue, passwordInputValue} = this.state
    const userDetails = {
      username: userNameInputValue,
      password: passwordInputValue,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {method: 'POST', body: JSON.stringify(userDetails)}
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {
      userNameInputValue,
      passwordInputValue,
      errorMsg,
      showingError,
    } = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form
          className="login-form-container"
          onSubmit={this.loginFormSubmitted}
        >
          <div className="website-logo-line">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </div>
          <label htmlFor="username">USERNAME</label>
          <input
            id="username"
            type="text"
            value={userNameInputValue}
            onChange={this.userNameChanged}
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            id="password"
            type="password"
            value={passwordInputValue}
            onChange={this.passwordChanged}
          />
          <button type="submit" className="login-button">
            Login
          </button>
          {showingError ? <p className="error-msg"> *{errorMsg}</p> : null}
        </form>
      </div>
    )
  }
}

export default Login
