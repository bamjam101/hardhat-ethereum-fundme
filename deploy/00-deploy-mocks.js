const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

const DECIMALS = 8
const INITIAL_ANSWER = 200000000000

// exporting the anyonymous function so that hardhat-deploy package can pick it up and run this specific deploy function

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    if (developmentChains.includes(network.name)) {
        log("Local network deteched! Deploying mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        })
        log("Mocks deployed")
        log("-----------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
