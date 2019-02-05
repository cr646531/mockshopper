import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Container, Row, Col } from 'react-grid-system';

export default class Search_Bar extends React.Component {
  render() {
    return (
      <Form inline>
          <FormGroup>
          <Label for="searchInput"></Label>
          <Input type="search" name="search" id="searchInput" placeholder=" " />
          </FormGroup>
        {' '}
        <Button>Search</Button>
      </Form>
    );
  }
}