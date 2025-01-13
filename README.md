# BSC Token Sniper Bot

A bot that monitors the BSC network for new token deployments and automatically purchases tokens based on configured safety parameters.

## Features

- Real-time mempool monitoring
- Automatic token purchase on deployment
- Safety checks before purchasing
  - Liquidity verification
  - Contract ownership check
  - Token blacklist
- Configurable parameters
- Testnet support

## Prerequisites

- Node.js (v14+ recommended)
- NPM
- A BSC wallet with testnet BNB for testing

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bsc-sniper-bot
```

2. Install dependencies:
```bash
npm install
```

3. Generate a wallet:
```bash
node src/utils/generateWallet.js
```
This will create a new wallet and save the credentials to `.env` file.

## Testing

1. Get testnet BNB from [BSC Testnet Faucet](https://testnet.binance.org/faucet-smart)

2. Run the bot:
```bash
node src/sniper.js
```

## Configuration

Edit `config/settings.js` to modify:
- Buy amount
- Gas settings
- Safety parameters
- Contract addresses

## Safety Features

- Liquidity checks
- Contract ownership verification
- Configurable blacklist
- Automatic safety checks before purchase

## Warning

This bot is for educational purposes only. Use at your own risk. Always test thoroughly on testnet before using on mainnet.

## License

MIT

## Disclaimer

Trading cryptocurrencies carries significant risk. This tool is provided as-is with no guarantees. The developers are not responsible for any financial losses incurred while using this bot.
```

This README provides:
1. Clear overview of features
2. Installation instructions
3. Testing guide
4. Configuration options
5. Important warnings and disclaimers

You can customize it further based on your specific needs or additional features you implement.
