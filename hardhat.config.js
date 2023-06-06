require("@nomicfoundation/hardhat-toolbox")
require("@nomiclabs/hardhat-etherscan")

require("dotenv").config() // configures .env file and makes it accessible using process.env statement
require("solidity-coverage") // generates report in Istanbul format to show the coverage of test cases
require("hardhat-gas-reporter") // gas reporter package that forms a tabular data structure to showcase gas consumption
require("hardhat-deploy") // helps in deploying of contract

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
module.exports = {
    solidity: {
        compilers: [
            { version: "0.8.18" },
            { version: "0.8.8" },
            { version: "0.6.6" },
        ],
    },
    defaultNetwork: "hardhat", // sets default network as hardhat (explicity specified by us)

    // any other network and there configuration
    networks: {
        // testnet and mainnet configuration
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
            blockConfirmation: 6,
        },
        hardhat: {
            chainId: 31337,
        },
    },
    // Etherscan configuration for verifying smart contracts
    etherscan: {
        apiKey: {
            sepolia: ETHERSCAN_API_KEY,
        },
    },
    // enabling gap reporter feature
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
    },
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
            1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
        },
    },
}
