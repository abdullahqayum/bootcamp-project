import React, { Component } from 'react';


class Seller extends Component {

    render() {
        return (
            
            <div id="content">

                <h1>Be A Seller</h1>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    const name = this.sellerName.value
                   // const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
                    const tradelicense = this.tradelicense.value
                    this.props.createSupplier(name, tradelicense)
                }}>
                    <div className="form-group mr-sm-2">
                        <input
                            id="sellerName"
                            type="text"
                            ref={(input) => { this.sellerName = input }}
                            className="form-control"
                            placeholder="Seller Name"
                            required />
                    </div>
                   


                    <div className="form-group mr-sm-2">
                        <input
                            id="tradelicense"
                            type="text"
                            ref={(input) => { this.tradelicense = input }}
                            className="form-control"
                            placeholder="Trade Licence"
                            required />
                    </div>
                    <div className="form-group mr-sm-2">
                        <label>Upload Seller Logo </label>      
                           <input type="file" onChange={this.props.captureFile} className="text-white text-monospace" />
                    </div>

                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
               
            </div>
        );
    }
}

export default Seller;
