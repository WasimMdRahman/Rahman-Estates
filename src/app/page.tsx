import Image from "next/image";
import Link from "next/link";
import { placeholderImages } from "@/lib/placeholder-images.json";
import FilterBar from "@/components/FilterBar";
import Testimonials from "@/components/Testimonials";
import Reveal from "@/components/animation/Reveal";
import { ArrowRight } from "lucide-react";
import Magnetic from "@/components/animation/Magnetic";
import { Button } from "@/components/ui/button";
import FeaturedPropertiesCarousel from "@/components/FeaturedPropertiesCarousel";

export default function Home() {
  const heroImage = placeholderImages.find(p => p.id === 'hero-1');

  return (
    <div className="container mx-auto px-4">
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center text-center py-20">
        <div className="absolute inset-0">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              data-ai-hint={heroImage.imageHint}
              className="object-cover opacity-10"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <Reveal>
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/70">
              Find Your Aether
            </h1>
          </Reveal>
          <Reveal>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10">
              Experience the pinnacle of luxury living. Aether Estates curates the world&apos;s most extraordinary properties, just for you.
            </p>
          </Reveal>
          <Magnetic>
            <Button size="lg" className="rounded-full font-bold text-lg px-8 py-6 group">
              Explore Listings
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Magnetic>
        </div>
      </section>

      <FilterBar />

      <section className="py-20" id="listings">
        <div className="text-center mb-12">
          <Reveal>
            <h2 className="font-headline text-4xl md:text-5xl font-bold">Featured Properties</h2>
          </Reveal>
          <Reveal>
            <p className="text-muted-foreground mt-2">Handpicked selection of premier properties.</p>
          </Reveal>
        </div>

        <FeaturedPropertiesCarousel />
      </section>

      <Testimonials />
    </div>
  );
}
