import React, { Component } from 'react';
import Web3 from 'web3'
import Marketplace from '../abis/Marketplace.json'
import Main from './Main'
import { useHistory as history } from "react-router-dom";
// import ProductDetail from './ProductDetails'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './ProductScreen';
import { BrowserRouter } from 'react-router-dom';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import Seller from './Seller';
import SellerListScreen from './screens/SellerListScreen';


//const ipfsClient = require('ipfs-http-client')
//const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });


class App extends Component {


  // Get file from user
  captureFile = event => {
    event.preventDefault()

    const file = event.target.files[0]
    const reader = new window.FileReader()

    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({
        buffer: Buffer(reader.result),
        type: file.type,
        name: file.name
      })
      console.log('buffer', this.state.buffer)
    }
  }


  createProduct = (name, price, category, description, countInStock) => {
    console.log("Submitting file to IPFS...")

    // Add file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('IPFS result', result.size)
      if (error) {
        console.error(error)
        return
      }

      this.setState({ loading: true })
      // Assign value for the file without extension
      if (this.state.type === '') {
        this.setState({ type: 'none' })
      }

      this.state.marketplace.methods.createProduct(name, price, result[0].hash, category, description, countInStock).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({
          loading: false,
          type: null,
          name: null
        })
        window.location.reload()
      }).on('error', (e) => {
        window.alert('Error')
        this.setState({ loading: false })
      })
    })
  }

  updateProduct = (id, price, countInStock) => {
    console.log('I am here : product id is', id);
    console.log("quantity for purchase", price);
    //console.log("total Price" + totalAmount);
    this.setState({ loading: true })
    this.state.marketplace.methods.updateProduct(id, price , countInStock).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
  }







  createSupplier = (name, tradeLicence) => {
    console.log("Submitting file to IPFS...")

    // Add file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('IPFS result', result.size)
      if (error) {
        console.error(error)
        return
      }

      this.setState({ loading: true })
      // Assign value for the file without extension
      if (this.state.type === '') {
        this.setState({ type: 'none' })
      }

      this.state.marketplace.methods.createSupplier(name, tradeLicence, result[0].hash).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({
          loading: false,
          type: null,
          name: null
        })
        window.location.reload()
      }).on('error', (e) => {
        window.alert('Error')
        this.setState({ loading: false })
      })
    })
  }

  createOrder(id, qty) {
    console.log('I am here : product id is', id);
    console.log("quantity for purchase", qty);
    //console.log("total Price" + totalAmount);
    this.setState({ loading: true })
    this.state.marketplace.methods.createOrder(id, qty).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
  }


  purchaseProduct(id, qty, price) {
    console.log("quantity for purchase", qty);
    console.log("total Price" + price);
    this.setState({ loading: true })
    this.state.marketplace.methods.purchaseProduct(id, qty).send({ from: this.state.account, value: price })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
  }

  payOrder(id, price) {
    //  console.log("quantity for purchase", qty);
    console.log("total Price" + price);
    this.setState({ loading: true })
    this.state.marketplace.methods.payOrder(id).send({ from: this.state.account, value: price })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
  }

  withdrawFund(id, price) {
    //  console.log("quantity for purchase", qty);
    console.log("total Price" + price);
    this.setState({ loading: true })
    console.log(this.state.account);
    this.state.marketplace.methods.withdrawBalance(id).send({ from: this.state.account, gas: 3000000 })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
  }





  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Marketplace.networks[networkId]
    if (networkData) {
      const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address)
      this.setState({ marketplace })
      const productCount = await marketplace.methods.productCount().call()
      console.log(productCount.toString())
      const orderCount = await marketplace.methods.orderCount().call()

      for (var i = 1; i <= orderCount; i++) {
        const order = await marketplace.methods.orders(i).call()
        this.setState({
          orders: [...this.state.orders, order]
        })
      }
      const userCount = await marketplace.methods.userCount().call()

      for (var i = 1; i <= userCount; i++) {
        const user = await marketplace.methods.users(i).call()
        this.setState({
          users: [...this.state.users, user]
        })
      }





      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call()
        this.setState({
          products: [...this.state.products, product]
        })
      }
      this.setState({ loading: false })
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }
  }



  constructor(props) {
    super(props)
    this.state = {
      product: '',
      account: '',
      productCount: 0,
      products: [],
      orders: [],
      suppliers: [],
      users: [],
      loading: true,
      type: null,
      name: null,
      buffer: null,
      history: ''
    }
    this.createProduct = this.createProduct.bind(this)
    this.captureFile = this.captureFile.bind(this)
    this.purchaseProduct = this.purchaseProduct.bind(this)
    this.createOrder = this.createOrder.bind(this);
    this.payOrder = this.payOrder.bind(this);
    this.withdrawFund = this.withdrawFund.bind(this);
    this.createSupplier = this.createSupplier.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    //  this.fetchProduct = this.fetchProduct.bind(this);

  }

  render() {
    return (
      <BrowserRouter>
        <div className="grid-container">
          <header className="row">
            <div>
              <a className="brand" href="/">
                ChainShop
          </a>
            </div>
            <div>
              <a>{this.state.account.toString()}</a>
            </div>
            <div>
             </div>
            <div className="dropdown">
              <Link to="#admin">
                Menu <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
              <li>
                  <Link to="/add_suppliers">Be a Seller</Link>
                </li>
                <li>
                  <Link to="/add_products">Add Items </Link>
                </li>
                <li>
                  <Link to="/productlist">Products</Link>
                </li>
                <li>
                  <Link to="/orderlist">Orders</Link>
                </li>
                <li>
                  <Link to="/userlist">Users</Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
               
                
              </ul>
            </div>

          </header>
          <main>
            <Switch>
              <Route path="/add_products">
                <Main
                  products={this.state.products}
                  createProduct={this.createProduct}
                  captureFile={this.captureFile}
                  purchaseProduct={this.purchaseProduct}
                />
              </Route>
              <Route path="/add_suppliers">
                <Seller
                  products={this.state.products}
                  suppliers={this.state.suppliers
                  }
                  createProduct={this.createProduct}
                  captureFile={this.captureFile}
                  purchaseProduct={this.purchaseProduct}
                  createSupplier={this.createSupplier}
                />
              </Route>

              <Route path="/productList" >
                <ProductListScreen
                  products={this.state.products}
                  history={this.state.history}
                  createProduct={this.createProduct}
                  captureFile={this.captureFile}
                  purchaseProduct={this.purchaseProduct}
                />
              </Route>
              <Route path="/orderList" >
                <OrderListScreen
                  products={this.state.products}
                  orders={this.state.orders}
                  payOrder={this.payOrder}
                  withdrawFund={this.withdrawFund}
                  history={this.state.history}
                  createProduct={this.createProduct}
                  captureFile={this.captureFile}
                  purchaseProduct={this.purchaseProduct}
                />
              </Route>
              <Route path="/userList" >
                <SellerListScreen
                  products={this.state.products}
                  orders={this.state.orders}
                  users={this.state.users}
                  payOrder={this.payOrder}
                  withdrawFund={this.withdrawFund}
                  history={this.state.history}
                  createProduct={this.createProduct}
                  captureFile={this.captureFile}
                  purchaseProduct={this.purchaseProduct}
                />
              </Route>




              <Route path="/" exact>
                <HomeScreen
                  products={this.state.products}
                  createProduct={this.createProduct}
                  captureFile={this.captureFile}
                  purchaseProduct={this.purchaseProduct} />

              </Route>
              <Route exact path="/product/:id" render={(props) => <ProductScreen products={this.state.products} createOrder={this.createOrder} purchaseProduct={this.purchaseProduct} {...props} />} />
              <Route exact path="/product/:id/edit" render={(props) => <ProductEditScreen products={this.state.products} updateProduct={this.updateProduct}  {...props} />} />


            </Switch>

          </main>
          <footer className="row center">All right reserved</footer>
        </div>
      </BrowserRouter>

    )
  }
}

export default App;