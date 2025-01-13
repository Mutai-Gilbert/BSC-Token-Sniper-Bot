const Web3 = require('web3');
const config = require('../config/settings');
const log = require('./logger');

const web3 = new Web3(config.bscNodeUrl);

const buyToken = async (tokenAddress, amount) => {
  try {
    const pancakeRouter = new web3.eth.Contract(
      config.PANCAKE_ROUTER_ABI,
      config.PANCAKE_ROUTER_ADDRESS
    );

    const tx = await pancakeRouter.methods
      .swapExactETHForTokens(
        0, // Accept any amount of tokens
        [config.WBNB_ADDRESS, tokenAddress],
        config.WALLET_ADDRESS,
        Date.now() + 1000 * 60 // 1 minute deadline
      )
      .send({
        from: config.WALLET_ADDRESS,
        value: web3.utils.toWei(amount.toString(), 'ether'),
        gasLimit: config.gasLimit,
        gasPrice: config.gasPrice
      });

    log(`Buy transaction successful: ${tx.transactionHash}`);
    return tx;
  } catch (error) {
    log(`Buy transaction failed: ${error.message}`);
    throw error;
  }
};

const sellToken = async (tokenAddress, amount) => {
  try {
    const pancakeRouter = new web3.eth.Contract(
      config.PANCAKE_ROUTER_ABI,
      config.PANCAKE_ROUTER_ADDRESS
    );

    const tx = await pancakeRouter.methods
      .swapExactTokensForETH(
        amount,
        0, // Accept any amount of BNB
        [tokenAddress, config.WBNB_ADDRESS],
        config.WALLET_ADDRESS,
        Date.now() + 1000 * 60 // 1 minute deadline
      )
      .send({
        from: config.WALLET_ADDRESS,
        gasLimit: config.gasLimit,
        gasPrice: config.gasPrice
      });

    log(`Sell transaction successful: ${tx.transactionHash}`);
    return tx;
  } catch (error) {
    log(`Sell transaction failed: ${error.message}`);
    throw error;
  }
};

module.exports = {
  buyToken,
  sellToken
}; 