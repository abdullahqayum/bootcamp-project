// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.6.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

/// @title An Online Marketplace using Blockchain
/// @author Abdullah Al Qayum
/// @notice This is Consensys Bootcamp project to understand solidity and smart contract
/// @dev All function calls are currently implemented without side effects

contract Marketplace is Ownable, Pausable {
    using SafeMath for uint256;

    uint256 public productCount = 0;
    uint256 public supplierCount = 0;
    uint256 public orderCount = 0;

    enum Status {APPLIED, APPROVED, REJECTED}

    mapping(address => bool) private administrators;
    mapping(address => bool) private sellers;

    //Define Marketplace Owner
    address public _owner;
    // marketplace Name ;
    string public name;

    uint256 public userCount = 0;

    mapping(address => Supplier) public suppliers;

    mapping(uint256 => Product) public products;

    constructor() public payable {
        name = "Online Marketplace";
        userCount++;
        _owner = msg.sender;
        administrators[msg.sender] = true;
        users[userCount] = User(userCount, _owner, true, true, true);
    }

    modifier onlyAdmin() {
        require(msg.sender == _owner);
        _;
    }

    struct User {
        uint256 id;
        address _addr;
        bool isActive;
        bool isAdmin;
        bool isSeller;
    }

    mapping(uint256 => User) public users;

    modifier onlySeller(address _addr) {
        require(msg.sender == _addr);
        _;
    }
    modifier listedSeller(address _addr) {
        require(sellers[_addr]);
        _;
    }

    modifier onlyBuyer(address addr) {
        require(msg.sender == addr);
        _;
    }

    struct Supplier {
        uint256 Id;
        string name;
        string tradeLicence;
        string image;
        Status status;
        uint256 tranCount;
        uint256 totalTranBalance;
        uint256 walletBalance;
        address storeOwner;
    }
    Status public status;

    event supplierCreated(
        uint256 id,
        string _name,
        string _tradeLicence,
        string _logo,
        address _addr
    );

    function createSupplier(
        string memory _name,
        string memory _tradeLicence,
        string memory _logo
    ) public whenNotPaused {
        require(bytes(_name).length > 0);
        require(bytes(_tradeLicence).length > 0);
        supplierCount++;
        userCount++;
        suppliers[msg.sender] = Supplier(
            supplierCount,
            _name,
            _tradeLicence,
            _logo,
            Status.APPLIED,
            0,
            0,
            address(msg.sender).balance,
            msg.sender
        );
        sellers[msg.sender] = true;
        users[userCount] = User(userCount, msg.sender, true, false, true);
        emit supplierCreated(
            supplierCount,
            _name,
            _tradeLicence,
            _logo,
            msg.sender
        );
    }

    // event approveSupplier
    event logApproved(address _addr, Status);

    function approveSupplier(address _addr) public onlyAdmin {
        suppliers[_addr].status = Status.APPROVED;
        emit logApproved(_addr, Status.APPROVED);
    }

    enum OrderStatus {Ordered, Purchased, Delivered, Completed}
    //uint256 public  orderCount ;

    OrderStatus public orderstatus;

    modifier inState(OrderStatus _state, uint256 orderID) {
        orderstatus = orders[orderID].orderStatus;

        require(orderstatus == _state, "Invalid state.");
        _;
    }

    struct Order {
        uint256 orderID;
        string productName;
        uint256 quantity;
        address payable seller;
        address payable buyer;
        uint256 totalAmount;
        OrderStatus orderStatus;
    }
    mapping(uint256 => Order) public orders;

    //  Order [] public orders ;
    struct Product {
        uint256 id;
        string name;
        string image;
        uint256 price;
        string category;
        uint256 countInStock;
        uint256 rating;
        string description;
        address owner;
    }
    event ProductCreated(
        uint256 id,
        string name,
        string image,
        uint256 price,
        string category,
        uint256 countInStock,
        uint256 rating,
        string description,
        address owner
    );

    function createProduct(
        string memory _name,
        uint256 _price,
        string memory _image,
        // string memory _brand,
        string memory _category,
        string memory _description,
        uint256 _countInStock
    ) public {
        // Require a valid name
        require(bytes(_name).length > 0);
        // Require a valid price
        require(_price > 0);
        // Increment product count
        productCount++;
        // Create the product
        products[productCount] = Product(
            productCount,
            _name,
            _image,
            _price,
            _category,
            _countInStock,
            5,
            _description,
            msg.sender
        );
        // Trigger an event
        emit ProductCreated(
            productCount,
            _name,
            _image,
            _price,
            _category,
            _countInStock,
            0,
            _description,
            msg.sender
        );
    }

    function updateProduct(
        uint256 id,
        uint256 _price,
        // string memory _brand,
        uint256 _countInStock
    ) public onlySeller(msg.sender) {
        require(id <= productCount);
        require(_price > 0);
        require(_countInStock > 0);
        products[id].price = _price;
        products[id].countInStock += _countInStock;
    }

    event BalanceWithdrawn(
        uint256 id,
        string name,
        uint256 price,
        address owner,
        string completed
    );

    event ProductPurchased(
        uint256 id,
        string name,
        uint256 price,
        address owner,
        bool purchased
    );

    event OrderCreated(
        address buyer,
        address seller,
        uint256 totalAmount,
        uint256 qty,
        string productName
    );

    function purchaseProduct(uint256 _id, uint256 qty) public payable {
        // Fetch the product
        Product memory _product = products[_id];
        // Fetch the owner
        //  address  _seller =  _product.owner;

        address payable _seller = payable(_product.owner);

        // Make sure the product has a valid id
        require(_product.id > 0 && _product.id <= productCount);

        uint256 totalAmount = qty * _product.price;
        // Require that there is enough Ether in the transaction
        require(msg.value >= totalAmount);
        // Require that the buyer is not the seller
        require(_seller != msg.sender);
        // Transfer ownership to the buyer
        //_product.owner = msg.sender;
        // Mark as purchased
        //  _product.purchased = true;
        // Update the product
        //  products[_id] = _product;
        // Pay the seller by sending them Ether
        // orderCount++ ;

        //  createOrder(orderCount , _product.name , qty,_seller, msg.sender , totalAmount ,OrderStatus.Purchased);

        _seller.transfer(msg.value);
        // Trigger an event
        emit ProductPurchased(
            productCount,
            _product.name,
            msg.value,
            msg.sender,
            true
        );
    }

    function createOrder(uint256 productId, uint256 quantity) public payable {
        //require(productId<=productCount) ;

        require(productId <= productCount);

        Product memory _product = products[productId];

        require(msg.sender != _product.owner);

        require(quantity <= _product.countInStock);

        require(quantity > 0);

        orderCount++;
        orders[orderCount] = Order(
            orderCount,
            _product.name,
            quantity,
            payable(_product.owner),
            payable(msg.sender),
            _product.price * quantity,
            OrderStatus.Ordered
        );
        products[productId].countInStock =
            products[productId].countInStock -
            quantity;

        emit OrderCreated(
            msg.sender,
            _product.owner,
            _product.price * quantity,
            quantity,
            _product.name
        );
    }

    function payOrder(uint256 orderID)
        public
        payable
        onlyBuyer(orders[orderID].buyer)
        inState(OrderStatus.Ordered, orderID)
    {
        Order memory _order = orders[orderID];

        //fetch the Id of the seller
        //  uint256 supplierID;

        // Fetch the owner

        address payable _seller = payable(_order.seller);

        // Should be same as who order the product
        require(msg.sender == _order.buyer);

        //   uint256 totalAmount = _order.totalAmount;
        // Require that there is enough Ether in the transaction
        require(msg.value >= _order.totalAmount);
        // Require that the buyer is not the seller
        require(_seller != msg.sender);

        // If amount sent is too large, refund the difference
        if (msg.value > _order.totalAmount) {
            uint256 refund = msg.value - _order.totalAmount;
            msg.sender.transfer(refund);
        }

        suppliers[_seller].totalTranBalance += msg.value;

        // _seller.transfer(msg.value);

        orders[orderID].orderStatus = OrderStatus.Purchased;
        // Trigger an event
        emit ProductPurchased(
            orderID,
            _order.productName,
            msg.value,
            msg.sender,
            true
        );
    }

    function deliver(uint256 orderId)
        public
        onlySeller(msg.sender)
        inState(OrderStatus.Purchased, orderId)
    {
        orders[orderId].orderStatus = OrderStatus.Delivered;
    }

    function withdrawBalance(uint256 orderID)
        public
        onlySeller(msg.sender)
        inState(OrderStatus.Purchased, orderID)
    {
        Order memory _order = orders[orderID];

        //fetch the Id of the seller

        require(msg.sender == _order.seller);

        if (_order.totalAmount <= suppliers[msg.sender].totalTranBalance) {
            suppliers[msg.sender].totalTranBalance -= _order.totalAmount;
            msg.sender.transfer(_order.totalAmount);
        }

        orders[orderID].orderStatus = OrderStatus.Completed;
        emit BalanceWithdrawn(
            orderID,
            _order.productName,
            _order.totalAmount,
            msg.sender,
            "completed"
        );
    }
}
