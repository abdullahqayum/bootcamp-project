import React, { Component } from 'react';

import Product from '../Product'




class HomeScreen extends Component {

  render() {
    return (
      <div>
        <div className="row center">
          {this.props.products.map((product) => (
            <Product key={product.id} product={product}></Product>
          ))}
        </div>
      </div>
    );
  }
}

export default HomeScreen;
