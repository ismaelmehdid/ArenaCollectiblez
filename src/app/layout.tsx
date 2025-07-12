import type { Metadata } from 'next';
import { headers } from 'next/headers';
import './global.css';
import { Home, Scan, ShoppingBag, User2Icon } from 'lucide-react';
import * as React from 'react';
import { ConnectButton } from '@/components/ConnectButton';
import {
  NavBody,
  Navbar,
  NavbarLogo,
  NavItems,
} from '@/components/ui/resizable-navbar';
import { ContextProvider, PusherProvider } from '@/context/context';
import { getAuthorizedUser } from '../../backend/domain/auth';

export const metadata: Metadata = {
  title: 'ArenaCollectiblez',
  description: 'dApp on chiliz chain',
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersData = await headers();
  const cookies = headersData.get('cookie');
  const user = await getAuthorizedUser();

  const navItems = [
    {
      name: 'Home',
      link: '/',
      icon: <Home className="h-4 w-4" />,
    },
    {
      name: 'Marketplace',
      link: '/marketplace',
      icon: <ShoppingBag className="h-4 w-4" />,
    },
  ];

  if (user.isOk()) {
    navItems.push({
      name: 'Scan a ticket',
      link: `/scan`,
      icon: <Scan className="h-4 w-4" />,
    });
    navItems.push({
      name: 'Profile',
      link: `/user/${user.value.id}`,
      icon: <User2Icon className="h-4 w-4" />,
    });
  } else {
    navItems.push({
      name: 'Scan a ticket',
      link: 'auth',
      icon: <Scan className="h-4 w-4" />,
    });
  }

  return (
    <html lang="en">
      <body>
        <ContextProvider cookies={cookies}>
          <PusherProvider userId={user.isOk() ? user.value.id : ''}>
            <Navbar className="px-2 py-1.5" navItems={navItems}>
              <NavBody>
                <NavbarLogo />
                <NavItems items={navItems} />
                <ConnectButton />
              </NavBody>
            </Navbar>
            {children}
          </PusherProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
