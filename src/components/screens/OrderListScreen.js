import React, { Component } from 'react';
import Product from '../Product'
import { Link, Route, useRouteMatch } from "react-router-dom";


class OrderListScreen extends Component {

    state = {
        text: "Ordered"
    }

    changeText = (label) => {
        if (label == '0') {
            label = "Pay"
            this.setState({ text: label });
        }

    }

    render() {
        return (
            <div>
                <h1>Orders</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Buyer</th>
                            <th>Seller</th>
                            <th>Quantity</th>
                            <th>T/Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="productList">
                        {this.props.orders.map((order, key) => {
                            const label = order.OrderStatus;
                            return (
                                <tr key={key}>
                                    <th scope="row">{order.orderID.toString()}</th>
                                    <td>{order.productName}</td>
                                    <td>{order.buyer}</td>
                                    <td>{order.seller}</td>
                                    <td>{order.quantity.toString()}</td>
                                    <td>{window.web3.utils.fromWei(order.totalAmount.toString(), 'Ether')} Eth</td>
                                    <td> {order.orderStatus == '0' ? (
                                        "Ordered"
                                    ) : order.orderStatus == '1' ? (
                                        "Paid"
                                    ) : (
                                                "Shipped"
                                            )}</td>
                                    <td>
                                        {order.orderStatus == '0' ? (
                                            <button className="primary block"
                                                name={order.orderID}
                                                value={order.totalAmount}
                                                onClick={(event) => {
                                                    this.props.payOrder(event.target.name, event.target.value);
                                                    // this.props.createOrder(event.target.name,this.state.qty);

                                                }}>Pay</button>
                                        ) : order.orderStatus == '1' ? (
                                            <button name={order.OrderID} className="primary block "
                                                value={order.totalAmount}
                                                onClick={(event) => {
                                                    this.props.withdrawFund(event.target.name, event.target.value);
                                                    // this.props.createOrder(event.target.name,this.state.qty);

                                                }}>WithDraw</button>
                                        ) : (
                                                    <button key={order.OrderID} className="small">Completed</button>
                                                )}


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

export default OrderListScreen;
