
import React from 'react'
import {connect} from 'react-redux'
import {login} from '../store'


const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.loggedInUser.error
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const credentials = {
        email: evt.target.email.value,
        password: evt.target.password.value
      };
      dispatch(login(credentials))
        .then(()=> ownProps.history.push('/profile'))
    }
  }
}

export const Login = connect(mapLogin, mapDispatchToProps)(AuthForm)
