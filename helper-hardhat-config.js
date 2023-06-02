const networkConfig = {
    // localhost network configuration
    31337: {
        name: "localhost",
    },
    // testnet and mainnet configuration
    11155111: {
        name: "sepolia",
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    },
}

const developmentChains = ["hardhat", "localhost"]

module.exports = { networkConfig, developmentChains }
