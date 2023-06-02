// imports

// hardhat-deploy syntactical changes from regular async main function

// exporting the anyonymous function so that hardhat-deploy package can pick it up and run this specific deploy function
module.exports = async (hre) => {
    const { getNamedAccounts, deployments } = hre // Hardhat runtime environment exposes information that is generated via Hardhat execution
}

// OR you can use in the following manner, the meaning stays the same
/* 
module.exports = async ({ getNamedAccounts, deployments}) => {}
*/
