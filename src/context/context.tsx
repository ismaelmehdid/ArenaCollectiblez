'use client';

import { createAppKit, useAppKitAccount } from '@reown/appkit/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode, useEffect, useRef } from 'react';
import { type Config, cookieToInitialState, WagmiProvider } from 'wagmi';
import { networks, projectId, wagmiAdapter } from '@/config';

const queryClient = new QueryClient();

if (!projectId) {
  throw new Error('Project ID is not defined');
}

const metadata = {
  name: 'arena-collectiblez',
  description: 'Arena Collectiblez is a dApp on the Chiliz Chain',
  url: '',
  icons: [''],
};

export const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: networks,
  metadata,
  themeMode: 'light',
  features: {
    analytics: true,
    email: false,
    socials: false,
  },
  themeVariables: {
    '--w3m-accent': '#000000',
  },
  includeWalletIds: [
    '56843177b5e89d4bcb19a27dab7c49e0f33d8d3a6c8c4c7e5274f605e92befd6',
  ],
  featuredWalletIds: [
    '56843177b5e89d4bcb19a27dab7c49e0f33d8d3a6c8c4c7e5274f605e92befd6',
  ],
  allWallets: 'HIDE',
  debug: true,
});

export function ContextProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies,
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

type WebSocketProviderProps = {
  children: React.ReactNode;
  userId: string;
};

export function WebSocketProvider({ children, userId }: WebSocketProviderProps) {
  const { isConnected, address } = useAppKitAccount();
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!isConnected || !address || !userId) {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
      return;
    }

    const socket = new WebSocket('wss://localhost:3000/ws');
    socketRef.current = socket;

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: 'auth',
          wallet: address,
          userId, // <-- добавляем userId сюда
        }),
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // здесь можно обработать входящие сообщения
    };

    socket.onclose = () => {
      socketRef.current = null;
    };

    return () => {
      socket.close();
    };
  }, [isConnected, address, userId]);

  return <>{children}</>;
}

