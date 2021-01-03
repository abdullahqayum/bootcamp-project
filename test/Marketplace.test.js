const { assert } = require('chai')

const Marketplace = artifacts.require('./Marketplace.sol')
require('chai')
    .use(require('chai-as-promised'))
    .should()
contract('Marketplace', ([deployer, seller, buyer]) => {
    let marketplace

    before(async () => {
        marketplace = await Marketplace.deployed()
    })

    describe('deployment', async () => {
        it('Marketplace deploys successfully', async () => {
            const address = await marketplace.address
            //   console.log(address)
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })
    })

    describe('Supplier Creation Events', async () => {
        let suppliers, supplierCount;
        before(async () => {
            suppliers = await marketplace.createSupplier('Kay Kraft', 'AMZ987654', 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb', { from: seller })

        })

        it('Supplier created successfully', async () => {
            //success to create suppliers
            const event = suppliers.logs[0].args
            assert.equal(event._name, 'Kay Kraft', 'name is correct')
            assert.equal(event._tradeLicence, 'AMZ987654', 'price is correct')
            assert.equal(event._logo, 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb', 'owner is correct')

            // FAILURE: Supplier must have a name
            await await marketplace.createSupplier('', 'ABC', 'TOBE', { from: seller }).should.be.rejected;
            // FAILURE: Product must have a price
            // await await marketplace.createProduct('Nike Slim Shirt', 0, { from: seller }).should.be.rejected;

        })




    })
    describe('Products Creation Process', async () => {
        let result, productCount, orderCount;

        before(async () => {
            result = await marketplace.createProduct('Nike Slim Shirt', web3.utils.toWei('1', 'Ether'), 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb', 'Shirts', 'high quality product', 10, { from: seller })
            productCount = await marketplace.productCount()
        })

        it('Selller creates products', async () => {
            // SUCCESS
            assert.equal(productCount, 1)
            const event = result.logs[0].args

            assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
            assert.equal(event.name, 'Nike Slim Shirt', 'name is correct')
            assert.equal(event.price, '1000000000000000000', 'price is correct')
            assert.equal(event.owner, seller, 'owner is correct')
            //  assert.equal(event.purchased, false, 'purchased is correct')

            // FAILURE: Product must have a name
            await await marketplace.createProduct('', web3.utils.toWei('1', 'Ether'), { from: seller }).should.be.rejected;
            // FAILURE: Product must have a price
            await await marketplace.createProduct('Nike Slim Shirt', 0, { from: seller }).should.be.rejected;
        })


        it('Buyer  Orders Product ', async () => {
            result = await marketplace.createOrder(1, 3, { from: buyer })

            orderCount = await marketplace.orderCount();
            // SUCCESS
            assert.equal(orderCount, 1)


            const event = result.logs[0].args
            // console.log(event)
            assert.equal(event.buyer, buyer, 'Buyer is correct correct')
            assert.equal(event.seller, seller, 'name is correct')
            assert.equal(event.qty, '3', 'Quantity is correct')

            // FAILURE: Order From same seller should be rejected
            await await marketplace.createOrder(1, 3, { from: seller }).should.be.rejected;
            // Failure : Order with null quantity should be rejected     
            await await marketplace.createOrder(1, '', { from: seller }).should.be.rejected;
        })

        it('Buyer Pay for Orders and buyer balance deducted', async () => {
            // Track the seller balance before purchase
            let oldBuyerBalance;
            oldBuyerBalance = await web3.eth.getBalance(buyer)
            oldBuyerBalance = new web3.utils.BN(oldBuyerBalance)

            // Pay for the product : buyer 
            result = await marketplace.payOrder(1, { from: buyer, value: web3.utils.toWei('3', 'Ether') })

            let newBuyerBalance =   await web3.eth.getBalance(buyer);

            newBuyerBalance = new web3.utils.BN(newBuyerBalance)

            let gasUsed = result.receipt.gasUsed;
            let tx = await web3.eth.getTransaction(result.tx);
            let gasPrice = tx.gasPrice;
            let gasCost = gasUsed * gasPrice;

            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), orderCount.toNumber(), 'id is correct')
            assert.equal(event.name, 'Nike Slim Shirt', 'name is correct')
            assert.equal(event.price, '3000000000000000000', 'price is correct')

            assert.equal(oldBuyerBalance -  web3.utils.toWei('3', 'Ether') - gasCost, newBuyerBalance);

        })

        it('Seller withdraw  amount of  Orders and seller balance increased after gas price', async () => {
            // Track the seller balance before purchase
            let oldSellerBalance;
            oldSellerBalance = await web3.eth.getBalance(seller)
            oldSellerBalance = new web3.utils.BN(oldSellerBalance)

            // Pay for the product : buyer 
            result = await marketplace.withdrawBalance(1, { from: seller})

            let newSellerBalance =   await web3.eth.getBalance(seller);

            newSellerBalance = new web3.utils.BN(newSellerBalance)

            let gasUsed = result.receipt.gasUsed;
            let tx = await web3.eth.getTransaction(result.tx);
            let gasPrice = tx.gasPrice;
            let gasCost = gasUsed * gasPrice;

            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), orderCount.toNumber(), 'id is correct')
          
            assert.equal(oldSellerBalance + web3.utils.toWei('3', 'Ether') - gasCost, newSellerBalance);

        })
  })

})