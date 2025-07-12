
import { motion } from "framer-motion";
import MarketplaceNFTCard from "./NFTCard";

interface NFT {
  id: string;
  name: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  price: number;
  seller: string;
  image: string;
}

interface NFTGridProps {
  nfts: NFT[];
  viewMode: string;
}

const NFTGrid = ({ nfts, viewMode }: NFTGridProps) => {
  if (nfts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <p className="text-white text-xl">No NFTs found matching your criteria</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5" : "grid-cols-1"}`}
    >
      {nfts.map((nft, index) => (
        <MarketplaceNFTCard key={nft.id} nft={nft} index={index} />
      ))}
    </motion.div>
  );
};

export default NFTGrid;