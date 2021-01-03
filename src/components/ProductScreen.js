import React, { Component } from 'react';
import Rating from './Rating'
import { Link } from 'react-router-dom';



class ProductScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { qty: 0 };
  }


  selectQty(val) {
    console.log('value here ' + val);
    this.setState({ qty: val });
    console.log('quantity ' + this.state.qty);
  }

  render() {
    const qty = this.state.qty;

    const paramId = this.props.match.params.id;
    const products = this.props.products;
    console.log(products);

    const product = products.find((x) => x.id.toString() === paramId.toString());
    console.log("product=====")
    console.log("Qty: ", this.state.qty);

    if (!product) {
      return <div> Product Not Found</div>;
    }
    return (

      <div>
        <Link to="/">Back to result</Link>
        <div className="row top">
          <div className="col-2">
            <img className="large" src={"https://ipfs.infura.io/ipfs/" + product.image} alt={product.name}></img>
          </div>
          <div className="col-2">            <ul>
            <li>
              <h1>{product.name}</h1>
            </li>
            <li>
              <Rating
                rating={product.rating}
              />
            </li>
            <li>Pirce :Eth{window.web3.utils.fromWei(product.price.toString(), 'Ether')} </li>
            <li>
              Description:
              <p>{product.description}</p>
            </li>
          </ul>
          </div>
          <div className="col-2">
            <div className="card card-body">
              <ul>
                <li>
                  <div className="row">
                    <div>Price</div>
                    <div className="price">{window.web3.utils.fromWei(product.price.toString(), 'Ether')} </div>
                  </div>
                </li>
                {product.countInStock > 0 && (
                  <>
                    <li>
                      <div className="row">
                        <div>Qty</div>
                        <div>
                          <select
                            value={qty}
                            onChange={(e) => this.selectQty(e.target.value)}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>


                          </select>
                        </div>
                      </div>
                    </li>
                    <li>
                      <button
                        className="primary block"
                        name={product.id}
                        value={product.price}
                        onClick={(event) => {
                     //    this.props.purchaseProduct(event.target.name,this.state.qty , event.target.value * this.state.qty);
                        this.props.createOrder(event.target.name,this.state.qty);

                        }}

                      >
                        Buy                        </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

    )

  }

}
export default ProductScreen