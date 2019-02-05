import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Nav, NavItem, NavLink, Button } from 'reactstrap';
import { Container, Row } from 'react-grid-system';

import Product_Carousel from './Product_Carousel';
import Product_Deck from './Product_Deck';
import Product_Catalog from './Product_Catalog';

class Products extends Component {

  constructor(){
    super();
    this.state = {
      carousel: true,
      catalog: false,
      deck: false
    }
    this.showCarousel = this.showCarousel.bind(this);
    this.showCatalog = this.showCatalog.bind(this);
    this.showDeck = this.showDeck.bind(this);
  }

  showCarousel(){
    this.setState({
      carousel: true,
      catalog: false,
      deck: false
    })
  }

  showCatalog(){
    this.setState({
      carousel: false,
      catalog: true,
      deck: false
    })
  }

  showDeck(){
    this.setState({
      carousel: false,
      catalog: false,
      deck: true
    })
  }

  render(){
    return (
      <div>

        <div id="navigation">
          <p>Show items as:</p>
          <Nav>
            <NavItem>
              <Button onClick={this.showCarousel}>Carousel</Button>  
            </NavItem>
            <NavItem>
              <Button onClick={this.showCatalog}>Catalog</Button>
            </NavItem>
            <NavItem>
              <Button onClick={this.showDeck}>Deck</Button>
            </NavItem>
          </Nav>
          <br />
        </div>

        {/* CAROUSEL */}
        {
          this.state.carousel ?
              <Container>
                <Row>
                    <Product_Carousel productList={this.props.products}/>
                </Row>
              </Container>
          : null
        }

        {/* CATALOG */}
        { this.state.catalog ? <Product_Catalog /> : null }

        {/* DECK */}
        { this.state.deck ? <Product_Deck productList={this.props.products} /> : null }
        
        <br />
        <br />
        <br />
        <br />
      </div>

    )
  }
}

const mapStateToProps = ({ products }) => {

  const categories = products.reduce((agg, product) => {
    if (!agg.includes(product.category)) {
      agg.push(product.category);
      return agg;
    } else {
      return agg;
    }
  }, []);

  return {
    products,
    categories
  };
};


export default connect(mapStateToProps)(Products);