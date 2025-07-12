import { motion } from 'framer-motion';

export const NoResults = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
    <p className="text-white text-xl">No NFTs found matching your criteria</p>
  </motion.div>
);
