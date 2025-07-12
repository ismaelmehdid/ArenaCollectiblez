import HowItWorksSection from '@/components/HowItWorksSection';
import PartnershipSection from '@/components/ParthershipSection';
import { ThreeDMarqueeDemo } from '@/components/ThreeDMarqueeDemo';
import { BackgroundParticles } from '@/components/ui/BackgroundParticles';
import { Button } from '@/components/ui/button';
import { ConnectButton } from '@/components/ConnectButton';
import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';
import ArenaCollectibleNFT from '../../artifacts/contracts/NFT.sol/ArenaCollectibleNFT.json';

export function MintNFTButton() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { address } = useAccount();
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [mintError, setMintError] = useState<string | null>(null);

  async function handleMint() {
    if (!address) {
      setMintError('Please connect your wallet first');
      return;
    }

    setIsGeneratingImage(true);
    setMintError(null);

    try {
      // Step 1: Generate random image and get IPFS CID
      const response = await fetch('/api/random-image-cid/');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || 'Failed to generate image and upload to IPFS',
        );
      }

      const { cid } = await response.json();
      const tokenUri = `ipfs://${cid}`;

      // Step 2: Mint the NFT with the IPFS URI
      writeContract({
        address: '0xaF6AAb8aD86Cf596472491e308547a0b711B9df3',
        abi: ArenaCollectibleNFT.abi,
        functionName: 'mint',
        args: [address, tokenUri],
        value: BigInt('1000000000000000000'), // 1 CHZ in wei
      });
    } catch (error) {
      console.error('Error minting NFT:', error);
      setMintError(
        error instanceof Error ? error.message : 'Failed to mint NFT',
      );
    } finally {
      setIsGeneratingImage(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-gray-800">
        Mint Your Arena Collectible
      </h3>

      <p className="text-sm text-gray-600 text-center mb-4">
        Generate a unique collectible NFT with random rarity and mint it to your
        wallet
      </p>

      {!address && (
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Connect your wallet to start minting
          </p>
          <ConnectButton />
        </div>
      )}

      <Button
        type="button"
        onClick={handleMint}
        disabled={isPending || isGeneratingImage || !address}
        className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {isGeneratingImage
          ? 'Generating Image...'
          : isPending
            ? 'Minting NFT...'
            : !address
              ? 'Connect Wallet'
              : 'Mint NFT (1 CHZ)'}
      </Button>

      {mintError && (
        <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
          {mintError}
        </div>
      )}

      {error && (
        <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
          Contract Error: {error.message}
        </div>
      )}

      {hash && (
        <div className="text-green-600 text-sm text-center bg-green-50 p-3 rounded-lg">
          Transaction Hash: {hash}
        </div>
      )}
    </div>
  );
}

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <BackgroundParticles />
      <ThreeDMarqueeDemo />

      <div className="relative z-10">
        <HowItWorksSection />
        <PartnershipSection />
      </div>
    </div>
  );
};

export default Landing;
