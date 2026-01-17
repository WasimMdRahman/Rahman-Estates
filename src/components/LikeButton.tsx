'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  const [particles, setParticles] = useState<number[]>([]);

  const handleClick = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    if (newLikedState) {
      setParticles(Array.from({ length: 20 }, (_, i) => i));
    }
  };

  const onAnimationComplete = () => {
    if (particles.length > 0) {
      setParticles([]);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {particles.map((particleId) => (
          <motion.div
            key={particleId}
            initial={{ x: 0, y: 0, scale: 0.5, opacity: 1 }}
            animate={{
              x: (Math.random() - 0.5) * 80,
              y: (Math.random() - 0.5) * 80 - 40,
              scale: Math.random() * 0.5 + 0.2,
              opacity: 0,
            }}
            transition={{
              duration: Math.random() * 0.5 + 0.5,
              ease: 'easeOut',
            }}
            onAnimationComplete={onAnimationComplete}
            className="absolute left-1/2 top-1/2"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <Heart className="h-4 w-4 text-primary" fill="currentColor" />
          </motion.div>
        ))}
      </AnimatePresence>
      <button
        onClick={handleClick}
        className="p-2 rounded-full bg-background/50 hover:bg-background/80 transition-colors"
        aria-label={liked ? 'Unlike property' : 'Like property'}
      >
        <Heart
          className={cn(
            'w-6 h-6 transition-all duration-300',
            liked ? 'text-primary' : 'text-muted-foreground'
          )}
          fill={liked ? 'currentColor' : 'none'}
        />
      </button>
    </div>
  );
};

export default LikeButton;
