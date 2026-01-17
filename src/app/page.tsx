import Image from "next/image";
import Link from "next/link";
import { properties } from "@/lib/data";
import { placeholderImages } from "@/lib/placeholder-images.json";
import PropertyCard from "@/components/PropertyCard";
import FilterBar from "@/components/FilterBar";
import Recommendations from "@/components/Recommendations";
import Reveal from "@/components/animation/Reveal";
import { ArrowRight, Bath, Bed, Maximize } from "lucide-react";
import Magnetic from "@/components/animation/Magnetic";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {properties.slice(0, 6).map((property) => {
              const image = placeholderImages.find(p => p.id === property.imageIds[0]);
              const pricePerSqft = property.price / property.sqft;

              return (
                <CarouselItem key={property.id}>
                  <div className="p-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/20 overflow-hidden">
                      <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                        {image && (
                          <Image
                            src={image.imageUrl}
                            alt={property.title}
                            fill
                            data-ai-hint={image.imageHint}
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                      </div>
                      <div className="flex flex-col justify-center">
                        <Reveal>
                          <h3 className="font-headline text-4xl font-bold text-foreground mb-2">{property.title}</h3>
                        </Reveal>
                        <Reveal delay={0.1}>
                          <p className="text-muted-foreground mb-6">{property.location}</p>
                        </Reveal>

                        <Reveal delay={0.2}>
                          <div className="grid grid-cols-3 gap-4 text-base mb-6 border-y border-white/10 py-4">
                            <div className="flex flex-col items-center gap-2">
                              <Bed className="w-6 h-6 text-primary" />
                              <span className="font-bold">{property.beds}</span>
                              <span className="text-xs text-muted-foreground">Beds</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                              <Bath className="w-6 h-6 text-primary" />
                              <span className="font-bold">{property.baths}</span>
                              <span className="text-xs text-muted-foreground">Baths</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                              <Maximize className="w-6 h-6 text-primary" />
                              <span className="font-bold">{property.sqft.toLocaleString()}</span>
                              <span className="text-xs text-muted-foreground">sqft</span>
                            </div>
                          </div>
                        </Reveal>

                        <Reveal delay={0.3}>
                          <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">Price per sqft</span>
                              <span className="font-bold text-foreground">${pricePerSqft.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-3xl">
                              <span className="text-muted-foreground font-headline">Total Price</span>
                              <span className="font-bold text-primary font-headline">${property.price.toLocaleString()}</span>
                            </div>
                          </div>
                        </Reveal>

                        <Magnetic>
                          <Link href={`/property/${property.id}`} passHref>
                            <Button className="w-full font-bold rounded-full" size="lg">
                              View Property Details
                            </Button>
                          </Link>
                        </Magnetic>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-16" />
          <CarouselNext className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-16" />
        </Carousel>
      </section>

      <Recommendations />
    </div>
  );
}
