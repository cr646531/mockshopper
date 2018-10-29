import React from 'react'

const Login = (props) => {
  console.log('imported')
  return (
    <form method='get' action='/auth/google'>
      <button type='submit'>Login with Google</button>
    </form>
  )
}

export default Login