import React from 'react';
import Rating from './Rating'

export default function Product(props) {
    const { product } = props;
    return (
        <div key={product.id} className="card">
            <a href={`/product/${product.id}`}>
                <img className="medium" src={"https://ipfs.infura.io/ipfs/" + product.image} alt={product.name} />
            </a>
            <div className="card-body">
                <a href={`/product/${product.id}`}>
                    <h2>{product.name}</h2>
                </a>
                <Rating
                    rating={product.rating}
                ></Rating>
                <div className="price">{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</div>

            </div>
        </div >
    );
}
