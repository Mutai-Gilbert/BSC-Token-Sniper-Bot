const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

const generateWallet = () => {
    // Initialize Web3 with BSC testnet node
    const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');
    
    const account = web3.eth.accounts.create();
    
    // Create .env content with BSC testnet URL
    const envContent = `BSC_NODE_URL=https://data-seed-prebsc-1-s1.binance.org:8545/
WALLET_ADDRESS=${account.address}
PRIVATE_KEY=${account.privateKey}
`;

    // Write to .env file
    fs.writeFileSync(path.join(__dirname, '../../.env'), envContent);
    
    console.log('\n=== Wallet Generated Successfully ===');
    console.log('Address:', account.address);
    console.log('Private Key:', account.privateKey);
    console.log('\nCredentials have been saved to .env file');
    console.log('\nIMPORTANT: Keep your private key secure and never share it!');
    console.log('\nNote: Currently configured for BSC testnet.');
    console.log('When ready for mainnet, update BSC_NODE_URL to: https://bsc-dataseed.binance.org/');
};

if (require.main === module) {
    generateWallet();
}

module.exports = generateWallet; 