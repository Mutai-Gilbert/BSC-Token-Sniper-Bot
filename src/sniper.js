const Web3 = require('web3');
const config = require('../config/settings');
const log = require('./logger');
const { buyToken, sellToken } = require('./trading');
const { checkSafety } = require('./safety');

let web3;
let subscription = null;

const initWeb3 = () => {
    // Initialize WebSocket connection
    web3 = new Web3(new Web3.providers.WebsocketProvider(config.bscNodeUrl, {
        timeout: 30000, // ms
        clientConfig: {
            maxReceivedFrameSize: 100000000,
            maxReceivedMessageSize: 100000000,
        },
        reconnect: {
            auto: true,
            delay: 5000, // ms
            maxAttempts: 5,
            onTimeout: false
        }
    }));
    return web3;
};

const handleTransaction = async (txHash) => {
    try {
        const tx = await web3.eth.getTransaction(txHash);
        if (!tx) return;

        // Check if transaction is related to token deployment or liquidity addition
        if (tx.input.includes(config.PANCAKE_FACTORY_ADDRESS)) {
            const tokenAddress = tx.to; // For now, using the 'to' address as token address
            
            // Perform safety checks
            const isSafe = await checkSafety(tokenAddress);
            if (!isSafe) {
                log(`Token ${tokenAddress} failed safety checks`);
                return;
            }

            // Execute buy
            await buyToken(tokenAddress, config.buyAmount);
            
            // Set up sell monitoring
            monitorTokenPrice(tokenAddress);
        }
    } catch (error) {
        log(`Error processing transaction: ${error.message}`);
    }
};

const monitorTokenPrice = async (tokenAddress) => {
    // Monitor token price and sell when target reached
    // Implementation will go here
};

const runSniperBot = async () => {
    try {
        log('Connecting to Binance Smart Chain...');
        web3 = initWeb3();
        
        const accounts = await web3.eth.getAccounts();
        log(`Connected as ${config.WALLET_ADDRESS}`);

        // Subscribe to pending transactions
        subscription = web3.eth.subscribe('pendingTransactions', (error, txHash) => {
            if (error) {
                log(`Subscription error: ${error.message}`);
                return;
            }
            handleTransaction(txHash);
        });

        log('Monitoring mempool for new tokens...');
    } catch (error) {
        log(`Error: ${error.message}`);
    }
};

// Cleanup function
const cleanup = () => {
    if (subscription) {
        subscription.unsubscribe((error, success) => {
            if (success) log('Successfully unsubscribed');
        });
    }
    if (web3.currentProvider && web3.currentProvider.disconnect) {
        web3.currentProvider.disconnect();
    }
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

runSniperBot();
