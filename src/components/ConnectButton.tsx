'use client';

import { useAppKitAccount, useDisconnect } from '@reown/appkit/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const ConnectButton = () => {
  const { isConnected, address } = useAppKitAccount();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    async function authenticate() {
      if (isConnected && address) {
        try {
          const result = await fetch('/api/auth/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ wallet: address }),
          });

          if (result.status === 200) {
            console.log('User authenticated successfully');
          } else {
            toast.error('Authentication failed. Please try again.');
            setTimeout(() => {
              disconnect();
            }, 1000);
          }
        } catch (error) {
          console.error('Error during authentication:', error);
        }
      } else {
        console.log('User is not connected or address is not available');
      }
    }

    authenticate();
  }, [isConnected, address, disconnect]);

  return (
    <div>
      <appkit-button />
    </div>
  );
};
