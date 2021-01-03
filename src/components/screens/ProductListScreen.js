import React, { Component } from 'react';
import Product from '../Product'
import { Link, Route, useRouteMatch } from "react-router-dom";


class ProductListScreen extends Component {

    editProductPage = (params) => {
        //    this.props.history.push(params);
        console.log(params)
    }

    render() {
        return (
            <div>
                <h1>Products</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>STOCK</th>
                            <th>owner</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody id="productList">
                        {this.props.products.map((product, key) => {
                            return (
                                <tr key={key}>
                                    <th scope="row">{product.id.toString()}</th>
                                    <td>{product.name}</td>
                                    <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                                    <td>{product.category}</td>
                                    <td>{product.countInStock.toString()}</td>
                                    <td>{product.owner}</td>
                                    <td>
                                        <button key={product.id} className="small">
                                            <Link to={`product/${product.id}/edit`}>Edit</Link>
                                        </button>
                                        <button type="button"
                                            className="small"
                                        >Delete</button>
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

export default ProductListScreen;
