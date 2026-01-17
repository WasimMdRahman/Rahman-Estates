'use client';

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Magnetic from "./animation/Magnetic";
import { useState } from "react";

const FilterBar = () => {
  const [priceRange, setPriceRange] = useState([2500000]);

  const formatPrice = (value: number) => {
    if (value >= 10000000) return '$10M+';
    if (value >= 1000000) {
      return `$${parseFloat((value / 1000000).toFixed(1))}M`;
    }
    return `$${(value / 1000).toFixed(0)}k`;
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
      className="relative z-20 -mt-16 mb-20"
    >
      <div className="p-6 bg-background/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
          <div className="lg:col-span-2">
            <Input
              type="text"
              placeholder="Search by location, address, agent..."
              className="h-14 text-base bg-background/50 border-white/10 focus-visible:ring-primary"
            />
          </div>
          <div>
            <Select>
              <SelectTrigger className="h-14 text-base bg-background/50 border-white/10">
                <SelectValue placeholder="Beds" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select>
              <SelectTrigger className="h-14 text-base bg-background/50 border-white/10">
                <SelectValue placeholder="Baths" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <Magnetic>
              <Button size="lg" className="w-full h-14 text-lg font-bold rounded-md flex items-center gap-2">
                <Search className="w-5 h-5" />
                Search
              </Button>
            </Magnetic>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm text-muted-foreground">Price Range</label>
            <span className="font-semibold text-foreground">{formatPrice(priceRange[0])}</span>
          </div>
          <Slider 
            value={priceRange} 
            onValueChange={setPriceRange} 
            max={10000000} 
            step={100000} />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>$0</span>
            <span>$10M+</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;
