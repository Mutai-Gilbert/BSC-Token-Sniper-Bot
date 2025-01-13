const Web3 = require('web3');
const config = require('../../config/settings');

const checkBalance = async () => {
    const web3 = new Web3(config.bscNodeUrl);
    const balance = await web3.eth.getBalance(config.WALLET_ADDRESS);
    console.log(`Balance: ${web3.utils.fromWei(balance, 'ether')} BNB`);
};

checkBalance(); 