import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Sparkles, Loader2 } from 'lucide-react';
import { RarityBlock } from './RarityBlock';

const MAX_PRICE = 1000;

const calculateChances = (priceValue: number) => {
  const price = Math.min(Math.max(1, priceValue), MAX_PRICE);

  const baseLegendary = 0.5;
  const baseEpic = 9.5;
  const baseRare = 30.0;

  const legendaryRate = 1.012;
  const epicRate = 1.008;
  const rareRate = 1.015;

  const maxLegendary = 5.0;
  const maxEpic = 20.0;
  const maxRare = 50.0;

  const legendary = Math.min(
    maxLegendary,
    baseLegendary * legendaryRate ** (price - 1),
  );

  const epic = Math.min(maxEpic, baseEpic * epicRate ** (price - 1));

  const rare = Math.min(maxRare, baseRare * rareRate ** (price - 1));

  let total = legendary + epic + rare;
  if (total > 100) {
    const scale = 100 / total;
    total = 100;
    return {
      legendary: Number((legendary * scale).toFixed(2)),
      epic: Number((epic * scale).toFixed(2)),
      rare: Number((rare * scale).toFixed(2)),
      common: 0,
    };
  }

  const common = 100 - total;

  return {
    legendary: Number(legendary.toFixed(2)),
    epic: Number(epic.toFixed(2)),
    rare: Number(rare.toFixed(2)),
    common: Number(common.toFixed(2)),
  };
};

interface LootBoxDialogProps {
  boxName: string;
  boxId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleOpenLootBox: (boxId: string) => void;
  isGeneratingImage?: boolean;
  isPending?: boolean;
  isConfirming?: boolean;
  mintError?: string | null;
  contractError?: string | null;
}

export const LootBoxDialog = ({
  open,
  onOpenChange,
  boxId,
  boxName,
  handleOpenLootBox,
  isGeneratingImage = false,
  isPending = false,
  isConfirming = false,
  mintError = null,
  contractError = null,
}: LootBoxDialogProps) => {
  const [price, setPrice] = useState([1]);
  const chances = calculateChances(price[0]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-slate-900 to-purple-900 border border-purple-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {boxName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-2">
          {/* Loading States */}
          {(isGeneratingImage || isPending || isConfirming) && (
            <div className="space-y-4">
              {isGeneratingImage && (
                <div className="flex items-center justify-center gap-3 p-4 bg-blue-600/20 rounded-lg border border-blue-500/30">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                  <span className="text-blue-400 font-medium">
                    🎨 Creating your NFT image...
                  </span>
                </div>
              )}
              
              {isPending && (
                <div className="flex items-center justify-center gap-3 p-4 bg-yellow-600/20 rounded-lg border border-yellow-500/30">
                  <Loader2 className="w-5 h-5 animate-spin text-yellow-400" />
                  <span className="text-yellow-400 font-medium">
                    ⏳ Waiting for your transaction confirmation...
                  </span>
                </div>
              )}
              
              {isConfirming && (
                <div className="flex items-center justify-center gap-3 p-4 bg-orange-600/20 rounded-lg border border-orange-500/30">
                  <Loader2 className="w-5 h-5 animate-spin text-orange-400" />
                  <span className="text-orange-400 font-medium">
                    🔄 Confirming transaction on blockchain...
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Error States */}
          {(mintError || contractError) && (
            <div className="p-4 bg-red-600/20 rounded-lg border border-red-500/30">
              <p className="text-red-400 text-sm">
                {mintError || contractError}
              </p>
            </div>
          )}

          {/* Price Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-300">Price</span>
              <span className="text-lg font-bold text-purple-400">
                {price[0]} CHZ
              </span>
            </div>
            <Slider
              value={price}
              onValueChange={setPrice}
              max={150}
              min={1}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-gray-400 text-center">
              Higher prices boost rare drop chances with diminishing returns
            </p>
          </div>

          {/* Rarity Blocks */}
          <div className="grid grid-cols-2 gap-3">
            <RarityBlock
              title="Common"
              chance={chances.common}
              color="from-gray-400 to-gray-600"
              borderColor="border-gray-500/50"
            />
            <RarityBlock
              title="Rare"
              chance={chances.rare}
              color="from-blue-400 to-blue-600"
              borderColor="border-blue-500/50"
            />
            <RarityBlock
              title="Epic"
              chance={chances.epic}
              color="from-purple-400 to-purple-600"
              borderColor="border-purple-500/50"
            />
            <RarityBlock
              title="Legendary"
              chance={chances.legendary}
              color="from-yellow-400 to-yellow-600"
              borderColor="border-yellow-500/50"
            />
          </div>

          <Button
            onClick={() => handleOpenLootBox(boxId)}
            disabled={isGeneratingImage || isPending || isConfirming}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg font-semibold rounded-xl border border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {(isGeneratingImage || isPending || isConfirming) ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Open Loot Box - {price[0]} CHZ
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
