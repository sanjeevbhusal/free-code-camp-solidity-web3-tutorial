// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    function getConversionRate(
        uint256 ethAmount,
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        // get the latest exchange rate of ethereum to USD from the priceFeed
        (, int256 latestPrice, , , ) = priceFeed.latestRoundData();

        uint256 ethPrice = uint256(latestPrice * 10000000000);

        // eth Amount is received in wei. So, dividing by 1e18 converts wei to ether.
        uint256 ethAmountInUSD = (ethPrice * ethAmount) / 1000000000000000000;
        return ethAmountInUSD;
    }
}
