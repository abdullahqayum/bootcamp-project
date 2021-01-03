import React, { Component } from 'react';

import Product from '../Product'




class ProductEditScreen extends Component {

  render() {
    const paramId = this.props.match.params.id;
    const products = this.props.products;
    const product = products.find((x) => x.id.toString() === paramId.toString());




    return (
      <div>
        <h2 className="row center">Edit Product</h2>
        <div className="row center">
          <form onSubmit={(event) => {
            event.preventDefault()
            //   const name = this.productName.value 
            const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
            // const category = this.category.value
            // const description = this.description.value
            const countInStock = this.countInStock.value
            //   const image = this.image.value
            this.props.updateProduct(paramId, price, countInStock)
          }}>
            <div className="form-group mr-sm-2">
              <input
                id="productPrice"
                type="text"
                ref={(input) => { this.productPrice = input }}
                className="form-control"
                placeholder={window.web3.utils.fromWei(product.price.toString(), 'Ether')}
                required />
            </div>
            <div className="form-group mr-sm-2">
              <input
                id="countInStock"
                type="text"
                ref={(input) => { this.countInStock = input }}
                className="form-control"
                placeholder={product.countInStock}
                required />
            </div>
            <button type="submit" className="btn btn-primary">Edit Product</button>
          </form>


        </div>
      </div>
    );
  }
}

export default ProductEditScreen;