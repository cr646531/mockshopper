import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { login } from '../store'



class Login extends Component {

  render(){
    return (
      <div id="login">
        <br />
        <Container>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }} >
              <Form display="block">
                <FormGroup>
                  <h1>Sign in</h1>
                  <br/>
                  <Label for="emailInput" >Email</Label>
                  <Input type="email" name="email" id="emailInput" placeholder=" " />
                  <br />
                  <Label for="passwordInput">Password</Label>
                  <Input type="password" name="password" id="passwordInput" placeholder=" " />
                </FormGroup>
                <Link to="/products">
                  <Button color="primary">Submit</Button>
                </Link>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }


    // <div>
    //   <form onSubmit={handleSubmit} name={name}>
    //     <div>
    //       <label htmlFor="email">
    //         <small>Email</small>
    //       </label>
    //       <input name="email" type="text" />
    //     </div>
    //     <div>
    //       <label htmlFor="password">
    //         <small>Password</small>
    //       </label>
    //       <input name="password" type="password" />
    //     </div>
    //     <div>
    //       <button type="submit">{displayName}</button>
    //     </div>
    //     {error && error.response && <div> {error.response.data} </div>}
    //   </form>
    // </div>

}

const mapStateToProps = state => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
