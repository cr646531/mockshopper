import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';


export default class Account_Creation extends Component {

  render(){
    return (
      <Container>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }} >
            <Form display="block">
              <FormGroup>
                <br />
                <h1>Create an account</h1>
                <Label for="emailInput">Email</Label>
                <Input type="email" name="email" id="emailInput" placeholder=" " />
                <br />
                <Label for="nameInput">Name</Label>
                <Input type="name" name="name" id="nameInput" placeholder=" " />
                <br />
                <Label for="passwordInput">Password</Label>
                <Input type="password" name="password" id="passwordInput" placeholder=" " />
                <br />
                <Label for="passwordVerificationInput">Re-enter Password</Label>
                <Input type="passwordVerification" name="passwordVerification" id="passwordVerificationInput" placeholder=" " />
              </FormGroup>
              <Link to="/products">
                <Button color="primary">Create Account</Button>
              </Link>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}