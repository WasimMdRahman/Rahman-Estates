'use client';

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Magnetic from "./animation/Magnetic";

const FilterBar = () => {
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
          <label className="block text-sm text-muted-foreground mb-2">Price Range</label>
          <Slider defaultValue={[2500000]} max={10000000} step={100000} />
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
