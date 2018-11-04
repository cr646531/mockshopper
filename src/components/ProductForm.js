import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProduct } from '../store';

class ProductForm extends Component {

  constructor(){
    super();
    this.state = {
      name: 'name',
      description: 'description',
      category: 'category',
      imageData: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  componentDidMount(){
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      //console.log(fileReader.result);
      this.setState({
        imageData: fileReader.result
      })
    });
    this.el.addEventListener('change', () => {
      fileReader.readAsDataURL(this.el.files[0]);
    });
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSave(event) {
    const { createNewProduct } = this.props;
    const { name, description, category, imageData } = this.state;

    event.preventDefault()
    createNewProduct({
      name: name,
      description: description,
      category: category,
      imageData: imageData
    })
    
  }

  render(){
    const { name, description, category, imageData } = this.state;
    return (
      <div>
        <h1>Create Product</h1>
        <br />
        <br />
        <form onSubmit={this.onSave}>
          Name: 
          <input type='text' name='name' value={name} onChange={this.onChange} />
          <br />
          Description: 
          <input type='text' name='description' value={description} onChange={this.onChange} />
          <br />
          Category: 
          <input type='text' name='category' value={category} onChange={this.onChange} />
          <br />
          <input ref={el => this.el = el} type='file' />
          <br />
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createNewProduct: (product) => { dispatch(createProduct(product)) },
  }
};

export default connect(null, mapDispatchToProps)(ProductForm);