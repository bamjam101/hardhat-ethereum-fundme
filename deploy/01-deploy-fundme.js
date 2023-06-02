// imports
const { networkConfig } = require("../helper-hardhat-config")
const { network } = require("hardhat")
// hardhat-deploy syntactical changes from regular async main function

// exporting the anyonymous function so that hardhat-deploy package can pick it up and run this specific deploy function
module.exports = async (hre) => {
    const { getNamedAccounts, deployments } = hre // Hardhat runtime environment exposes information that is generated via Hardhat execution

    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // network configuration
    const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    // Mock required to operate on local network such as Hardhat network
    // deployment
    const fundMe = await deployer("FundMe", {
        from: deployer,
        args: [],
    })
}

// OR you can use in the following manner, the meaning stays the same
/* 
module.exports = async ({ getNamedAccounts, deployments}) => {}
*/
