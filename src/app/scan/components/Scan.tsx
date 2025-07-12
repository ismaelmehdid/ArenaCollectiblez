'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { Box, PackageCheck, Scan } from 'lucide-react';
import { useState } from 'react';
import { Html5QrcodePlugin } from '@/app/scan/components/ScanCamera';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/useIsMobile';
import { rarities, User } from '../../../../backend/domain/types';
import { BackgroundParticles } from '@/components/ui/BackgroundParticles';

type ScanningProps = {
  user: User;
};

export const Scanning = ({ user }: ScanningProps) => {
  const isMobile = useIsMobile();
  const [ticketCode, setTicketCode] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();
  const handleTicketChange = (value: string) => {
    setTicketCode(value.toUpperCase());
  };

  const handleTicketSubmit = () => {
    toast({
      title: 'Invalid Ticket Code',
      description: 'Please enter a valid ticket code.',
    });
    setTicketCode('');
  };

  const handleScanned = async (decodedText: string) => {
    const code = decodedText.toUpperCase();

    try {
      const res = await fetch('/api/loot-box-receive/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code, userId: user.id }),
      });

      if (res.ok) {
        setModalOpen(false);
        toast({
          title: 'Loot Box Received',
          description: 'You have successfully redeemed your loot box!',
        });
      } else if (res.status === 400) {
      } else {
        const { message } = await res
          .json()
          .catch(() => ({ message: 'Invalid QR code' }));
        alert(`Error: ${message}`);
      }
    } catch (error) {
      console.error('Failed to redeem ticket', error);
      toast({
        title: 'Unexpected Error',
        description: 'Please try again later.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <BackgroundParticles />
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key="input"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md"
          >
            <Card className="p-8 bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
                  <PackageCheck className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Scan Your Sports Ticket
                </h1>
                <p className="text-gray-300">
                  Claim your loot box to receive a unique NFT collectible
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <TicketForm
                  ticketCode={ticketCode}
                  onChange={handleTicketChange}
                  onSubmit={handleTicketSubmit}
                />

                {isMobile && (
                  <>
                    <Button onClick={() => setModalOpen(true)}>
                      Scan with Camera
                    </Button>
                    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                      <DialogContent className="max-w-sm">
                        <Html5QrcodePlugin
                          fps={10}
                          qrbox={250}
                          disableFlip={false}
                          verbose={false}
                          qrCodeSuccessCallback={(text) => handleScanned(text)}
                          qrCodeErrorCallback={(err) =>
                            console.warn('scan error', err)
                          }
                        />
                      </DialogContent>
                    </Dialog>
                  </>
                )}
                {!isMobile && (
                  <div className="flex flex-col items-center justify-center text-center mt-4 p-4 border border-white/10 rounded-lg bg-white/5 backdrop-blur-md shadow-md">
                    <Scan className="w-6 h-6 text-purple-400 mb-2" />
                    <p className="text-sm text-gray-300">
                      Use your{' '}
                      <span className="font-medium text-white">
                        mobile device
                      </span>{' '}
                      to scan a ticket!
                    </p>
                  </div>
                )}

                <RarityChances />
              </motion.div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

type TicketFormProps = {
  ticketCode: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

const TicketForm = ({ ticketCode, onChange, onSubmit }: TicketFormProps) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">Ticket Code</label>
      <Input
        placeholder="Enter your ticket code..."
        value={ticketCode}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
        onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
      />
    </div>

    <div className="flex gap-3">
      <Button
        onClick={onSubmit}
        disabled={!ticketCode.trim()}
        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
      >
        <Box className="w-4 h-4 mr-2" />
        Reveive a loot box
      </Button>
    </div>
  </div>
);

const RarityChances = () => (
  <div className="grid grid-cols-4 gap-2 mt-6">
    {rarities.map((rarity) => (
      <div
        key={rarity.name}
        className="text-center p-2 rounded-lg bg-white/5 border border-white/10"
      >
        <div
          className={`w-4 h-4 mx-auto mb-1 rounded-full bg-gradient-to-r ${rarity.color}`}
        />
        <div className="text-xs text-gray-300">{rarity.name}</div>
        <div className="text-xs text-gray-400">{rarity.chance}%</div>
      </div>
    ))}
  </div>
);

export default Scanning;
