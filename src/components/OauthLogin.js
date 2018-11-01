import React from 'react'

const OauthLogin = (props) => {
  console.log('imported')
  return (
    <form method='get' action='/auth/google'>
      <button type='submit'>Login with Google</button>
    </form>
  )
}

export default OauthLogin