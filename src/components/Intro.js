
import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import store, { toggleIntroVisibility, _toggleIntroVisibility } from '../store.js';
import { connect } from 'react-redux';

class Intro extends Component {

  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    store.dispatch(_toggleIntroVisibility());
  }

  render(){
    return (
      <div>
        {
          this.props.introVisibility ?
            <div id="intro">
              <Jumbotron>
                <h1 className="display-3">Welcome to MockShopper!</h1>
                <p className="lead">MockShopper is a fullstack JavaScript app that immitates an e-commerce platform.</p>
                <hr className="my-2" />
                <p>Feel free to start browsing immediately, or you can register an account.</p>
                <p className="lead">
                  <Link to="/login">
                    <Button onClick={this.handleClick} color="primary">Sign-in</Button>
                  </Link> 
                  <Link to="create_account">
                    <Button onClick={this.handleClick} color="primary">Create an account</Button>
                  </Link> 
                  <Link to="/products">
                    <Button onClick={this.handleClick} color="primary">Continue as guest</Button>
                  </Link>
                </p>
              </Jumbotron>
            </div>
          : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    introVisibility: state.intro.introVisibility
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleIntroVisibility: () => { dispatch(toggleIntroVisibility()) }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Intro);






// export default class Intro extends Component {

//   constructor(){
//     super();
//     this.state = {
//       displayIntro: true,
//       displayLogin: false
//     };
//     this.toggleDisplayIntro = this.toggleDisplayIntro.bind(this);
//   }

//   toggleDisplayIntro(){
//     this.setState({ 
//       displayIntro: false, 
//       displayLogin: true 
//     });
//   }

//   render(){
//     return (
//       <div>
//         {
//           this.state.displayIntro ?
//             <div id="intro">
//               <Jumbotron>
//                 <h1 className="display-3">Welcome to MockShopper!</h1>
//                 <p className="lead">MockShopper is a fullstack JavaScript app that immitates an e-commerce platform.</p>
//                 <hr className="my-2" />
//                 <p>Feel free to start browsing immediately, or you can register an account.</p>
//                 <p className="lead">
//                   <Link to="/login"><Button onClick={this.toggleDisplayIntro} color="primary">Sign-in</Button></Link> <Button onClick={this.toggleDisplayIntro} color="primary">Create an account</Button> <Button onClick={this.toggleDisplayIntro} color="primary">Continue as guest</Button>
//                 </p>
//               </Jumbotron>
//             </div>
//             : null
//         }
//       </div>
//     )
//   }

// };
