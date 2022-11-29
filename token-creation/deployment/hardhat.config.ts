// Imports
// ========================================================
import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv';
// Config
// ========================================================
dotenv.config();

// Main Configuration Settings
// ========================================================
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    zkEVM: {
      url: `${process.env.RPC_ZKEVM_URL || ''}`,
      accounts: process.env.WALLET_PRIVATE_KEY
        ? [`0x${process.env.WALLET_PRIVATE_KEY}`]
        : [],
      allowUnlimitedContractSize: true
    }
  },
  etherscan: {
    apiKey: process.env.ZKEVM_API_KEY || undefined,
  },
};

// Exports
// ========================================================
export default config;
