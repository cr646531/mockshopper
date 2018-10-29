import React, {Component} from 'react';
import {connect} from 'react-redux';


const Profile = ({loggedInUser}) => {
  return (
      <h1>{loggedInUser.username} is logged in</h1>
  )
}

const mapStateToProps = ({loggedInUser}) => {
  return {loggedInUser}
}
export default connect(mapStateToProps)(Profile)
