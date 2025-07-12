import { chiliz, type AppKitNetwork } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { defineChain } from 'viem';

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
  throw new Error('Project ID is not defined');
}

// This is the mainnet configuration for the Chiliz Chain
export const chilizMainnet = /*#__PURE__*/ defineChain({
  id: 88888,
  name: 'Chiliz Chain',
  network: 'chiliz-mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Chiliz',
    symbol: 'CHZ',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.ankr.com/chiliz'],
    },
    public: {
      http: [
        'https://rpc.ankr.com/chiliz',
        'https://chiliz-mainnet.gateway.tatum.io',
        'https://chiliz.publicnode.com',
      ],
    },
  },
  blockExplorers: {
    default: {
      name: 'ChilizScan',
      url: 'https://chiliscan.com',
      apiUrl: 'https://chiliscan.com/api',
    },
    alt: {
      name: 'Chiliz Explorer',
      url: 'https://scan.chiliz.com',
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 8080847,
    },
  },
});

export const networks = [chiliz] as [AppKitNetwork, ...AppKitNetwork[]];

export const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
