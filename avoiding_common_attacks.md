#### avoiding common attacks

##### Avoid using tx.origin
In this application we have used transfer to handle balanced related activities. using tx.origin has been avoided 

##### Beware of transfer() , Send() and call() method
we have used only transfer to balance transfer . avoided the use of send and call method

#### underflow and overflow issues :
we have considered the underflow and overflow issues. Therefore we have used SafeMath library to avoid underflow and overflow error.

#### Re entrancy issues has been taken care of:
 can be problematic because calling external contracts passes control flow to them. The called contract may take over the control flow and end up calling the smart contract function again in a recursive manner. To avoid re entrancy we have taken the following pre cautions :
 1. Avoid using call().value() . instead of this we have used transfer method.
 2. Seperate the business logic from account part. that is fund transfer and balance calculation has been done seprately.
 like in *payOrder* we have updated seller balance. but fund transfer has been done in *withdrawBalance* method. Hence logic separation has been used. this is withdrawal design pattern
 3. Even before the the transfer we have deductuded the balance from seller payable . so this amount is no longer available to be transferrer.

#### Use assert and require properly :
assert is not used but in appropiate case we have used require to handle exceptions and ensure validations
