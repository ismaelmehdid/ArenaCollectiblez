'use client';

import { createAppKit } from '@reown/appkit/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState, type ReactNode } from 'react';
import { type Config, cookieToInitialState, WagmiProvider } from 'wagmi';
import { networks, projectId, wagmiAdapter } from '@/config';
import Pusher from 'pusher-js';
import LootBoxDialog from '@/app/scan/components/LootBoxDialog';

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

const APP_KEY = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
const APP_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER;

export function PusherProvider({
  children,
  userId,
}: {
  children: ReactNode;
  userId: string;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!userId) return;

    if (!APP_KEY || !APP_CLUSTER) {
      throw new Error('Pusher configuration is not set properly');
    }
    const pusher = new Pusher(APP_KEY, {
      cluster: APP_CLUSTER,
    });

    const channel = pusher.subscribe(`user-${userId}`);

    channel.bind('lootbox-received', (data: any) => {
      console.log('Lootbox received:', data);
      setDialogOpen(true);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [userId]);

return (
  <>
    {children}
    <LootBoxDialog
      open={dialogOpen}
      onOpenChange={setDialogOpen}
    />
  </>
);
}
