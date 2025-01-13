require('dotenv').config();

const PANCAKE_ROUTER_ABI = require('../src/abis/pancakeRouter');

module.exports = {
  bscNodeUrl: process.env.BSC_NODE_URL,
  WALLET_ADDRESS: process.env.WALLET_ADDRESS,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  
  // PancakeSwap Testnet contracts
  PANCAKE_ROUTER_ADDRESS: '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3',
  PANCAKE_FACTORY_ADDRESS: '0xB7926C0430Afb07AA7DEfDE6DA862aE0Bde767bc',
  WBNB_ADDRESS: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
  
  // Trading parameters
  buyAmount: 0.01, // Reduced amount for testing
  gasLimit: 500000,
  gasPrice: 5000000000, // 5 gwei
  
  // Safety parameters
  minimumLiquidity: 0.1, // Reduced for testing
  blacklistedTokens: [],
  
  // Router ABI (add this)
  PANCAKE_ROUTER_ABI
};
