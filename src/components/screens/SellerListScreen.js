import React, { Component } from 'react';
import Product from '../Product'
import { Link, Route, useRouteMatch } from "react-router-dom";


class SellerListScreen extends Component {
   render() {
        return (
            <div>
                <h1>Products</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>    
                            <th>Adress</th>
                            <th>is Active</th>
                            <th>is Admin</th>
                            <th>is Seller </th>

                        
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody id="productList">
                        {this.props.users.map((user, key) => {
                            return (
                                <tr key={key}>
                                    <th scope="row">{user.id.toString()}</th>
                                    <td>{user._addr}</td>

                                    <td>{user.isActive? 'Active' : 'Deactivated'}</td>
                                    <td>{user.isAdmin? 'Admin' : 'User'}</td>
                                    <td>{user.isSeller? 'Seller' : 'Not Seller'}</td>

                                    <td>
                                        <button type="button"
                                            className="primary block"
                                        >Update</button>
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

export default SellerListScreen;
