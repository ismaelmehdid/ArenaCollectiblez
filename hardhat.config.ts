import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const config: HardhatUserConfig = {
  solidity: '0.8.24',
  networks: {
    chiliz: {
      url: process.env.CHILIZ_MAIN_NET || 'https://rpc.ankr.com/chiliz',
      chainId: 88888,
      accounts: process.env.WALLET_PRIVATE_KEY
        ? [process.env.WALLET_PRIVATE_KEY]
        : [],
    },
  },
};

export default config;
