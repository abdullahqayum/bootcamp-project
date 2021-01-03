Testing Logic:

* Deployment :
    1. MarketPlace Deployment has been done successfully
       1. Should have a valid contract address
       2. can not have any invalid address like null , empty
* Supplier Creation events
   1. Supplier shoul be create successfully.
       1. should have a valid name tradelicence and logo
       2. can not have invalid or empty name
       3. all fields are mandatory
* Product Management 
  1. Seller can create Proudcts
       1. Must have valid product name , price and count in stock 
  2. Buyer can Order Products
       1. Owner of the product can not order his own product
       2. Order must contains quantity and product 
       3. quantity should not be greater than count in stock
       4. can not pass 0 quantity as order
  3. Buyer can Pay for the products
       1. Once order done , Buyer can pay his wallet
       2. Buyer balance will be deducted .
       3. Seller balance will not be updated
  4. Seller can withdraw balance
       1. Once seller withdraw the balance it will be added to his wallet
       2. Product Delivery status will be completed
