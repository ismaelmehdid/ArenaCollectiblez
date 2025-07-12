'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';
import { LootBoxType } from '../../../../backend/database/schema';
import { fetchReceiveLootBox } from '../../../../backend/data_access_layer/lootbox';
import { LootBox } from '../../../../backend/domain/types';
import { useRouter } from 'next/navigation';
interface LootBoxOption {
  box: LootBox;
  teamColor: string;
}

const lootBoxOptions: LootBoxOption[] = [
  {
    box: {
      id: 'StormfoxFC',
      type: LootBoxType.StormfoxFC,
      name: 'StormFox FC',
      image: '/lootBoxStormFox.png',
    },
    teamColor: 'from-[#0033A0] to-[#DA291C]',
  },
  {
    box: {
      id: 'BlazehartSC',
      type: LootBoxType.BlazehartSC,
      name: 'Blazehart SC',
      image: '/lootBoxBlazehart.png',
    },
    teamColor: 'from-[#014421] to-[#228B22]',
  },
];

interface LootBoxDialogProps {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LootBoxDialog = ({
  id,
  open,
  onOpenChange,
}: LootBoxDialogProps) => {
  const [step, setStep] = useState<'selection' | 'confirmation'>('selection');
  const [selectedBox, setSelectedBox] = useState<LootBoxOption| null>(null);
  const router = useRouter();

  const handleBoxSelect = async (box: LootBoxOption) => {
    const receiveLootBox = await fetchReceiveLootBox(box.box.type);
    if (!receiveLootBox) {
      toast({
        title: 'Error',
        description: 'Failed to receive loot box. Please try again later.',
        variant: 'destructive',
      });
      setSelectedBox(null);
      return;
    }
    setSelectedBox(box);
    setStep('confirmation');
    toast({
      title: 'Loot Box Received!',
      description: `You've received a ${box.box.name} loot box!`,
    });
  };

  const handleCheckInventory = () => {
    setStep('selection');
    setSelectedBox(null);
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setStep('selection');
      setSelectedBox(null);
      router.push(`/user/${id}`);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-2xl bg-black/90 backdrop-blur-xl border border-white/20 text-white">
        <AnimatePresence mode="wait">
          {step === 'selection' ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center">
                  Choose Your Loot Box
                </DialogTitle>
                <DialogDescription className="text-gray-300 text-center">
                  Select which team's mystery loot box you'd like to receive
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
                {lootBoxOptions.map((box) => (
                  <motion.div
                    key={box.box.id}
                    className="group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleBoxSelect(box)}
                  >
                    <div
                      className={`relative p-6 rounded-2xl bg-gradient-to-br ${box.teamColor} opacity-90 group-hover:opacity-100 transition-all duration-300 border border-white/10 group-hover:border-white/30`}
                    >
                      <div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${box.teamColor} blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10`}
                      />
                      <div className="text-center space-y-4">
                        <motion.div
                          animate={{
                            rotateY: [0, 15, -15, 0],
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className="w-32 h-32 sm:w-36 sm:h-36 mx-auto bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                        >
                          <Image
                            src={box.box.image}
                            alt={`${box.box.name} Loot Box`}
                            width={96}
                            height={96}
                            className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                          />
                        </motion.div>

                        <h3 className="text-xl font-bold text-white">
                          {box.box.name}
                        </h3>
                        <p className="text-white/80 text-sm">
                          Mystery Loot Box
                        </p>

                        {Array.from({ length: 6 }).map((_, i) => (
                          <motion.div
                            key={crypto.randomUUID()}
                            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                            animate={{
                              x: [0, (Math.random() - 0.5) * 100],
                              y: [0, (Math.random() - 0.5) * 100],
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.3,
                              ease: 'easeOut',
                            }}
                            style={{
                              left: '50%',
                              top: '50%',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center">
                  Loot Box Received!
                </DialogTitle>
                <DialogDescription className="text-gray-300 text-center">
                  Your {selectedBox?.box.name} loot box has been added to your
                  inventory
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col items-center space-y-6 py-6">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <motion.div
                    animate={{
                      rotateY: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotateY: {
                        duration: 4,
                        repeat: Infinity,
                        ease: 'linear',
                      },
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                    }}
                    className={`w-48 h-48 sm:w-56 sm:h-56 bg-gradient-to-br ${selectedBox?.teamColor} rounded-2xl shadow-2xl relative`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className={`absolute inset-0 bg-gradient-to-br ${selectedBox?.teamColor} rounded-2xl blur-xl scale-110 opacity-50`}
                    />
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                      <Image
                        src={selectedBox?.box.image || ''}
                        alt={`${selectedBox?.box.name} Loot Box`}
                        width={120}
                        height={120}
                        className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
                      />
                    </div>
                  </motion.div>

                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={crypto.randomUUID()}
                      className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                      animate={{
                        x: [0, (Math.random() - 0.5) * 200],
                        y: [0, (Math.random() - 0.5) * 200],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.25,
                        ease: 'easeOut',
                      }}
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                    />
                  ))}
                </motion.div>

                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-white">
                    {selectedBox?.box.name}
                  </h3>
                  <p className="text-green-400 font-medium">
                    ✓ Added to Inventory
                  </p>
                </div>

                <Button
                  onClick={handleCheckInventory}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Check Inventory
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default LootBoxDialog;
