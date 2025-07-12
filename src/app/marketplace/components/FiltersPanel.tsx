'use client';
import { motion } from 'framer-motion';
import { Search, Grid, List } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Props = {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  selectedRarity: string;
  setSelectedRarity: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (v: 'grid' | 'list') => void;
};

export const FiltersPanel = ({
  searchTerm,
  setSearchTerm,
  selectedRarity,
  setSelectedRarity,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
}: Props) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
    <Card className="p-6 bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search NFTs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={selectedRarity}
            onChange={(e) => setSelectedRarity(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white"
          >
            {['All', 'Common', 'Rare', 'Epic', 'Legendary'].map((rarity) => (
              <option key={rarity} value={rarity}>
                {rarity === 'All' ? 'All Rarities' : rarity}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white"
          >
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>

          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
            className="border-white/20"
          >
            <Grid className="w-4 h-4" />
          </Button>

          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
            className="border-white/20"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  </motion.div>
);
