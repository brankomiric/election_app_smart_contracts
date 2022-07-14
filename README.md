# election_app_smart_contracts
Smart Contracts for Election application

### Hardhat Commands:
```shell
npx hardhat help
npx hardhat test
GAS_REPORT=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

### Running Tests
```
npx hardhat test
```

### Localhost
**To start local network simulation run**
```
npx hardhat node
```
**To deploy Wakanda Token Contract to local network simulation run**
```
npx hardhat run scripts/wakandaToken_deploy.js --network localhost
```
**To deploy Election Contract to local network simulation run**
```
npx hardhat run scripts/election_deploy.js --network localhost
```

### Rinkeby
**To deploy Wakanda Token Contract to Rinkeby Testnet**
```
npx hardhat run scripts/wakandaToken_deploy.js --network rinkeby
```
**To deploy Election Contract to Rinkeby Testnet**
```
npx hardhat run scripts/election_deploy.js --network rinkeby
```

🔴IMPORTANT❗**Place your private key in .env file at the root of the project. See .env.example_**🔴IMPORTANT❗

### Deployed Contracts
Wakanda Token Contract @ Rinkeby Address: 0x4F2c971B5CD6F01c2C3fd44E87FeD20E5cb50BD0 |
Election Contract @ Rinkeby Address: 0x6e8783472d844596AfC6c7e95487E9a982cB6743
