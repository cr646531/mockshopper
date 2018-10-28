import React, {Component} from 'react';
import {connect} from 'react-redux';
 //import a create review from the store or where ever it will live

class ReviewForm extends Components {
  constructor() {
    super()
    this.state = {
      text:''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return(
      <div>
        <div>
          <h2> Add a Review </h2>
        </div>
        <div id='ReviewForm'>
          <form>
            <label> Review: </label>
            <input type='text' name='text' value={this.state.text} onChange={this.handleChange}/>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    )
  }

  handleSubmit(event) {
    const {createReview} = this.props;
    event.preventDefault();
    createReview(this.state);
    this.setState({
      text:''
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name] : event.target.value
    })
  }
}

const mapDispatchToProps = (dispatch) => ({
  createReview: (review) => dispatch(createReview(review))
})

export default connect(null, mapDispatchToProps)(ReviewForm);
