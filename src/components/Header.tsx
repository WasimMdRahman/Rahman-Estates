"use client";

import Link from "next/link";
import Reveal from "./animation/Reveal";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header 
      className="sticky top-0 z-40 w-full bg-background/30 backdrop-blur-lg border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="font-headline text-2xl font-bold tracking-wider">
            <Reveal>
              AETHER ESTATES
            </Reveal>
          </Link>
          <nav>
            <ul className="flex items-center space-x-8">
              <li>
                <Link href="#listings" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Listings</Link>
              </li>
              <li>
                <Link href="#recommendations" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">For You</Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
