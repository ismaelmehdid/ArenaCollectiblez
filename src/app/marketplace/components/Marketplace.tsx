'use client';

import { useState } from 'react';
import { BackgroundParticles } from '@/components/ui/BackgroundParticles';
import { sampleNFTs } from '../../../../backend/domain/types';
import { FiltersPanel } from './FiltersPanel';
import { MarketplaceHeader } from './MarketplaceHeader';
import { NFTGrid } from './NFTGrid';
import { NoResults } from './NoResults';

export const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'price' | 'name'>('price');

  const filteredNFTs = sampleNFTs
    .filter(
      (nft) =>
        nft.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedRarity === 'All' || nft.rarity === selectedRarity),
    )
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      return a.name.localeCompare(b.name);
    });

  const setSortBySafe = (v: string) => {
    if (v === 'name' || v === 'price') {
      setSortBy(v);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden pt-20">
      <BackgroundParticles />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <MarketplaceHeader />
        <FiltersPanel
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedRarity={selectedRarity}
          setSelectedRarity={setSelectedRarity}
          sortBy={sortBy}
          setSortBy={setSortBySafe}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        {filteredNFTs.length > 0 ? (
          <NFTGrid nfts={filteredNFTs} viewMode={viewMode} />
        ) : (
          <NoResults />
        )}
      </div>
    </div>
  );
};

export default Marketplace;
