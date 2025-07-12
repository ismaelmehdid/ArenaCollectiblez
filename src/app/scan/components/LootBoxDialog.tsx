import { motion } from 'framer-motion';
import { Package, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { rarities, sampleNFTs } from '../../../../backend/domain/types';

export function LootBoxDialog({
  showLootBoxDialog,
  setShowLootBoxDialog,
}: {
  showLootBoxDialog: boolean;
  setShowLootBoxDialog: (open: boolean) => void;
}) {
  
  const generateRandomCard = () => {
    const random = Math.random() * 100;
    let selectedRarity = 'Common';
    let cumulativeChance = 0;

    for (const rarity of rarities) {
      cumulativeChance += rarity.chance;
      if (random <= cumulativeChance) {
        selectedRarity = rarity.name;
        break;
      }
    }

    const possibleCards = sampleNFTs.filter(
      (card) => card.rarity === selectedRarity,
    );
    return possibleCards[Math.floor(Math.random() * possibleCards.length)];
  };

  const handleKeepInInventory = () => {
    setShowLootBoxDialog(false);
    toast({
      title: 'Loot Box Saved',
      description: 'Your loot box has been added to your inventory',
    });
  };

  const handleOpenNow = () => {
    console.log('Opening loot box...');
    // setShowLootBoxDialog(false);
    // setShowLootBoxAnimation(true);

    // // Generate random card after animation
    // setTimeout(() => {
    //   const card = generateRandomCard();
    //   setRevealedCard(card);
    //   setIsRedemptionComplete(true);
    //   setShowLootBoxAnimation(false);
    // }, 3000);
  };

  return (
    <Dialog open={showLootBoxDialog} onOpenChange={setShowLootBoxDialog}>
      <DialogContent className="sm:max-w-md bg-black/90 backdrop-blur-xl border border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Mystery Loot Box
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-center">
            You've received a mystery loot box! What would you like to do?
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-6 py-4">
          <motion.div
            animate={{
              rotateY: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotateY: { duration: 4, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="w-32 h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl shadow-2xl flex items-center justify-center"
          >
            <Package className="w-12 h-12 text-white" />
          </motion.div>

          <div className="flex flex-col space-y-3 w-full">
            <Button
              onClick={handleKeepInInventory}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Package className="w-4 h-4 mr-2" />
              Keep in Inventory
            </Button>

            <Button
              onClick={handleOpenNow}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Open Now (1 CHZ)
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
