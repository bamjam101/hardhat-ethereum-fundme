// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;
import "./PriceConverter.sol";

error NotOwner();

contract FundMe {
    using PriceConverter for uint256;

    // immutable and constant type variable declaration saves on gas consumption.
    address public immutable i_owner;

    uint public constant MINIMUM_USD = 50 * 1e18; // or 50* 10 ** 18

    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;

    AggregatorV3Interface public priceFeed;

    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    function fund() public payable {
        // payable keyword - this represents that users can send ETH to this contract.

        // Boundary line for users with at least a threshold amount in there wallet.
        require(
            msg.value.conversionRate(priceFeed) > MINIMUM_USD,
            "Didn't send enough funds!"
        ); // 1e18 == 1 * 10 ** 18 == 100000000000000000
        // What is reverting? It undos any action before, and sends remaining gas back. It automatically takes place when require fails.

        // Maintain list of funders -
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
    }

    // Step 1 - how to send money to our FundMe smart contract through fund() function.

    function withdraw() public onlyOwner {
        // Lopping the funders array and removing the funds from the map
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }

        // Reset the array
        funders = new address[](0);
        // Withdraw the funds in three different way
        // Using payable address type

        // transfer code -
        // payable(msg.sender).transfer(address(this).balance); // transfer uses 2300 gas and if the transfer fails then it gives an error

        // send code -
        // bool sendSuccess = payable(msg.sender).send(address(this).balance);  // send uses 2300 gas and if the operation fails then a boolean is retured
        // require(sendSuccess, "Send failed!");

        // call code (recommended) -
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Call failed!");
    }

    modifier onlyOwner() {
        // require based revert when sender is not owner - consumes more gas as all the characters of the error message are stored individually
        // require(msg.sender == i_owner, "Sender is not owner!");

        if (msg.sender != i_owner) revert NotOwner();
        _;
    }

    // executes when someone sends a transaction with money without calling the fund function, action- redirects to fund function.
    receive() external payable {
        fund();
    }

    // executes when someone sends a transaction with money and specifies an unknown function, action- redirects to fund function.
    fallback() external payable {
        fund();
    }
}
