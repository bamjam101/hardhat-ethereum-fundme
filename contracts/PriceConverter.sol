// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    function getPrice() internal view returns (uint256) {
        // ABI of external contract
        // Address of the same contract (Sepolia Network) - 0x694AA1769357215DE4FAC081bf1f309aDC325306
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
        // Destructuring price from the interface (response is sequenced and if we lay down the same sequence for desturcting then we get the required data from the interface.
        (, int price, , , ) = priceFeed.latestRoundData();
        // ETH i terms in USD
        // Decimal value returned from interface - 3000.00000000
        // This interface price has to be modified to Wei
        return uint256(price * 1e18); // 1**10 = 10000000000
    }

    function getVersion() internal view returns (uint256) {
        // ETH/USD price feed address of Sepolia Network (test network).
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
        return priceFeed.version();
    }

    function conversionRate(uint256 ethAmount) internal view returns (uint256) {
        uint256 ethPrice = getPrice();
        // 3000_000000000000000000 = ETH/USD price
        // 1_000000000000000000 ETH
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18;
        // 3000 USD (conversion under the hood)
        return ethAmountInUsd;
    }
}
