## Online Marketplace using Blockchain and React
### 1. About the Project
The Project deliverables is to Create an online marketplace that operates on the blockchain while learning the concept of blockchain and applying these concepts using solidity language.  

There will be list of stores on a central marketplace where shoppers can purchase goods posted by the store owners. Contract market place will be manage by a group of administrators.Store Owner can manage their inventories and funds. shoppers can visit stores and purchase goods that are in stock using cryptocurrency.

### Project Requirements 

#### Smart Contract Requirements
1.  Should be A Truffle Project
2. Smart contracts with the following requirements
      1. Properly Docuemented
      2. Have a circuit breaker design pattern and at least one other design pattern in Module 10 Lesson 1
      For Details Please check [Design Pattern Decisions]( design_pattern_decisions.md)
            1. Circuit Breaker
            2. Fail Early Fail loud
            3. Restricting Access
            4. State Machine Pattern
            5. Pull over push Payment
      3. Have security features to protect against at least two attack vectors outlined in Module 9 Lesson 3. Please check
       [avoiding common attacks](avoiding_common_attacks.md)
            1. SaftMath to prevent underflow or overflow 
            2. Prevention of Re entrancy attack
            3. Avoiding tx.Origin
            4. Considering the use of transfer() , send() and Call()
      4. Use a library (SafeMath.sol, etc) or extend another contract
            1. SafeMath to avoid underflow or overflow
            2. Ownable and Pausiable to extend the contract to implement circuit breaker pattern
#### Front End Requirements
1. Have a development server to serve the frontend interaction of the application locally
2. Frontend should work with web3.js / ethers.js, Infura and MetaMask to:
      1. Recognize and display current MM account
      2. Sign transactions that change a deployed contract’s state using MetaMask
      3. Reflect the successful state change in the UI [Details Application Details](user_stories.md)
#### Test Requirements
* Have at least 5 tests for each smart contract  [Testing Considerations](testing_requirements.md)
#### Deployment to TestNet
* Smart contract should be deployed to a testnet [Deployment Details in Ropsten](deployed_addresses.txt)
#### Application video
[check the dapp tour here ](https://www.loom.com/share/5611cf6eb375490db75e3925253ec179)

#### Additional 
* IPFS to store Product Image and Seller logo


 
