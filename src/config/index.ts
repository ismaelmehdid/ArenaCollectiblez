import { type AppKitNetwork } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { defineChain } from 'viem';

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
  throw new Error('Project ID is not defined');
}

// Spicy testnet configuration
export const spicyTestnet = /*#__PURE__*/ defineChain({
  id: 88882,
  name: 'Chiliz Spicy Testnet',
  network: 'spicy',
  nativeCurrency: {
    decimals: 18,
    name: 'Chiliz',
    symbol: 'CHZ',
  },
  rpcUrls: {
    default: {
      http: ['https://spicy-rpc.chiliz.com/'],
    },
    public: {
      http: ['https://spicy-rpc.chiliz.com/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'ChilizScan',
      url: 'https://testnet.chiliscan.com/',
    },
  },
});

export const networks = [spicyTestnet] as [AppKitNetwork, ...AppKitNetwork[]];

export const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
