### Design patterns that are used this project are described below

#### Fail Early Fail Loud:
* We have used *require* instead of if in the following modifier
  1. onlyAdmin.
  2. onlySeller.
  3. onlyBuyer.
  4. listedSeller.
  5. inState to implement State machine Pattern.
  6. ensure no seller can create his own product order in *createOrder* method.
  7. Only buyer can pay for his order *payOrder* method.
  8. Only product owner or seller can withdraw his balance in *withdrawBalance* method.
  
#### State Machine Pattern:
To track the status changes we have used state machine pattern for the order status . Which uses inState modifier to Identify the order Status .
InState modifier takes the orderID and current orderstate and based on that next functionality proceeds. 
our products life cycle has several status
* ordered * purchased * Delivered  and * withdraw balance by seller

#### Restrictring access:
Below function also used to restrict access to certain function.
1. onlyAdmin ( deactivate and activate Sellers , Approve storeOwners)
2. onlySeller ( create Product and withdraw balance) 
3. OnlyBuyer (to create order, pay for the Order)
4. ListedSeller

#### Pull over push pattern:
The payable function in  is *payOrder* . This function does not transfer funds to the Seller directly, but increments the total  balance of the seller . Withdrawals can then be done via the withdrawBalance  method. Both these functions are also pausable, because they each have the *whenNotPaused* modifier.

#### Circuit Breaker Pattern:
we have implemented pauable functionality from openZepplin contract. Our contract is extending pausable and ownable contract and implements whenNotPaused function from this contract.
The contract owner (i.e. the address that has deployed the contract) can therefore pause any of them. When paused, all methods that cause changes in the administrators, sellers, products or, most importantly, balances, cannot be used.

