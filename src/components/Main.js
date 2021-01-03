import React, { Component } from 'react';


class Main extends Component {

    render() {
        return (
            
            <div id="content">

                <h1>Add Product</h1>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    const name = this.productName.value
                    const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
                    const category = this.category.value
                    const description = this.description.value
                    const countInStock = this.countInStock.value
                 //   const image = this.image.value
                    this.props.createProduct(name, price, category, description, countInStock)
                }}>
                    <div className="form-group mr-sm-2">
                        <input
                            id="productName"
                            type="text"
                            ref={(input) => { this.productName = input }}
                            className="form-control"
                            placeholder="Product Name"
                            required />
                    </div>
                    <div className="form-group mr-sm-2">
                        <input
                            id="productPrice"
                            type="text"
                            ref={(input) => { this.productPrice = input }}
                            className="form-control"
                            placeholder="Product Price"
                            required />
                    </div>




                    <div className="form-group mr-sm-2">
                        <input
                            id="category"
                            type="text"
                            ref={(input) => { this.category = input }}
                            className="form-control"
                            placeholder="Product category"
                            required />
                    </div>

                    <div className="form-group mr-sm-2">
                        <input
                            id="description"
                            type="text"
                            ref={(input) => { this.description = input }}
                            className="form-control"
                            placeholder="Product description"
                            required />
                    </div>


                    <div className="form-group mr-sm-2">
                        <input
                            id="countInStock"
                            type="text"
                            ref={(input) => { this.countInStock = input }}
                            className="form-control"
                            placeholder="Product Count in Stock"
                            required />
                    </div>


                  
                    <div className="form-group mr-sm-2">
                        <label>Upload Product Image </label>      
                           <input type="file" onChange={this.props.captureFile} className="text-white text-monospace" />
                    </div>

                    <button type="submit" className="btn btn-primary">Add Product</button>
                </form>
                <p> </p>
                <h2>Buy Product</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">image</th>

                            <th scope="col">Owner</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="productList">
                        {this.props.products.map((product, key) => {
                            return (
                                <tr key={key}>
                                    <th scope="row">{product.id.toString()}</th>
                                    <td>{product.name}</td>
                                    <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                                    <td>{product.image}</td>
                                    <td>{product.owner}</td>
                                    <td>
                                        {!product.purchased
                                            ? <button
                                                name={product.id}
                                                value={product.price}
                                                onClick={(event) => {
                                                    this.props.purchaseProduct(event.target.name, event.target.value)
                                                }}
                                            >
                                                Buy
            </button>
                                            : null
                                        }
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Main;
