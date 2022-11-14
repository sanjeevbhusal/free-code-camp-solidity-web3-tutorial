const { network } = require("hardhat")
const {
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
} = require("../helperHardhat.config")

// hre (hardhat runtime environment) is passed automatically to the function by hardhat-deploy
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    // Use any of the below logic to identify if we are in local network
    // if (chainId === 33317) [chainId is present in network.config.chainId]
    // developmentChains.includes(network.name)

    if (developmentChains.includes(network.name)) {
        log("Local Networks have been detected. Deploying mocks.....")
        await deploy("MockV3Aggregator", {
            from: deployer,
            log: true, // display info in console about the contract deployment process
            args: [DECIMALS, INITIAL_ANSWER],
        })

        log("Mocks deployed...")
        log("----------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
