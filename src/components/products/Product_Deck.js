import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
 CardSubtitle, CardBody } from 'reactstrap';

export default class Product_Deck extends React.Component {

  render(){

    let productList = this.props.productList;

    return (
      <div id="deck">
        <CardDeck>
          {
            productList.map((product) => (
              <div id="card" key={product.id}>
                <Card>
                  <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180" alt="Card image cap" />
                  <CardBody>
                    <CardTitle>{product.name}</CardTitle>
                    <CardSubtitle>{product.category}</CardSubtitle>
                    <CardText>{product.description}</CardText>
                    {/* <Button>Button</Button> */}
                  </CardBody>
                </Card>
              </div>
            ))
          }
        </CardDeck>
      </div>
    )

  }

}
