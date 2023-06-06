// imports
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { network } = require("hardhat")
const { verify } = require("../utils/verify")

// hardhat-deploy syntactical changes from regular async main function
/* 
module.exports = async ({ getNamedAccounts, deployments}) => {}
*/
// OR you can use in the following manner, the meaning stays the same
module.exports = async (hre) => {
    const { getNamedAccounts, deployments } = hre // Hardhat runtime environment exposes information that is generated via Hardhat execution
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // network configuration
    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    // Mock deployment required to operate on local network such as Hardhat network ~ defined in 00-deploy-mocks.js file

    const args = [ethUsdPriceFeedAddress]
    // deployment
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmation: network.config.blockConfirmation || 1,
    })

    log("-------------------------------------------")

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, args)
    }
}

module.exports.tags = ["all", "fundme"]
