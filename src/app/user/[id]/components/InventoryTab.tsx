'use client';
import { motion } from 'framer-motion';
import { TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LootBox } from '../../../../../backend/domain/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LockOpen } from 'lucide-react';
import clsx from 'clsx';
import { LootBoxType } from '../../../../../backend/database/schema';
import { useState } from 'react';
import { LootBoxDialog } from './LootboxDialog';

type InventoryTabProps = {
  lootBoxes: LootBox[];
  handleOpenLootBox: (boxId: string) => void;
};

export function InventoryTab({
  lootBoxes,
  handleOpenLootBox,
}: InventoryTabProps) {
  const [openState, setOpenState] = useState(false);
  const [box, setBox] = useState<LootBox | null>(null);

  const handleOpenChange = (open: boolean) => {
    if (!box) {
      console.error('LootBox is required to open the dialog');
      return;
    }
    if (open) {
      handleOpenLootBox(box.id);
    }
    setOpenState(open);
  };
  return (
    <>
      {openState && box && (
        <LootBoxDialog
          open={openState}
          onOpenChange={handleOpenChange}
          boxId={box.id}
          boxName={box.name}
          handleOpenLootBox={handleOpenLootBox}
        />
      )}
      <TabsContent value="inventory" className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lootBoxes.map((box, index) => {
            const gradients = getGradientClasses(box.type);

            return (
              <motion.div
                key={box.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div
                    className={clsx(
                      'relative h-48 flex items-center justify-center bg-gradient-to-br',
                      gradients.bg,
                    )}
                  >
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
                        src={box.image}
                        alt={`${box.name} Loot Box`}
                        width={96}
                        height={96}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                      />
                    </motion.div>

                    <Badge
                      className={clsx(
                        'absolute top-3 left-3 text-white border-0 bg-gradient-to-r',
                        gradients.badge,
                      )}
                    >
                      {box.type}
                    </Badge>
                  </div>

                  <div className="p-4 items-center text-center">
                    <Button
                      size="sm"
                      className={clsx(
                        'w-full text-white bg-gradient-to-r',
                        gradients.button,
                      )}
                      onClick={() => {
                        setBox(box);
                        setOpenState(true);
                      }}
                    >
                      <LockOpen className="w-3 h-3 mr-1" />
                      Open Loot Box
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </TabsContent>
    </>
  );
}

function getGradientClasses(type: LootBoxType) {
  switch (type) {
    case LootBoxType.BlazehartSC:
      return {
        bg: 'from-[#014421] to-[#228B22]',
        badge: 'from-[#014421] to-[#228B22]',
        button:
          'from-[#014421] to-[#228B22] hover:from-[#016c31] hover:to-[#2cbf2f]',
      };
    case LootBoxType.StormfoxFC:
      return {
        bg: 'from-[#0033A0] to-[#DA291C]',
        badge: 'from-[#0033A0] to-[#DA291C]',
        button:
          'from-[#0033A0] to-[#DA291C] hover:from-[#0044cc] hover:to-[#e63a2a]',
      };
    default:
      return {
        bg: 'from-purple-800 to-pink-800',
        badge: 'from-purple-500 to-pink-500',
        button:
          'from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
      };
  }
}
