'use client';

import * as React from 'react';
import Image from "next/image";
import { testimonials } from "@/lib/data";
import { placeholderImages } from "@/lib/placeholder-images.json";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Reveal from "./animation/Reveal";
import { Star } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

const Testimonials = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section className="py-20" id="testimonials">
      <div className="text-center mb-12">
        <Reveal>
          <h2 className="font-headline text-4xl md:text-5xl font-bold">What Our Clients Say</h2>
        </Reveal>
        <Reveal>
          <p className="text-muted-foreground mt-2">Discover the experiences of those who found their aether with us.</p>
        </Reveal>
      </div>

      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-5xl mx-auto"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="items-stretch">
          {testimonials.map((testimonial) => {
            const image = placeholderImages.find(p => p.id === testimonial.imageId);
            return (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-4 h-full">
                  <Card className="bg-card/80 border-white/10 backdrop-blur-sm h-full flex flex-col">
                    <CardContent className="p-6 flex flex-col items-center text-center flex-grow">
                      {image && (
                        <Image
                          src={image.imageUrl}
                          alt={testimonial.name}
                          width={80}
                          height={80}
                          className="rounded-full mb-4 border-2 border-primary/50"
                        />
                      )}
                      <p className="text-lg font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground mb-4">{testimonial.location}</p>
                      <div className="flex gap-1 text-primary mb-4">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5" fill="currentColor" />)}
                      </div>
                      <blockquote className="text-foreground/80 italic flex-grow flex items-center justify-center">
                        <div>&ldquo;{testimonial.quote}&rdquo;</div>
                      </blockquote>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 z-10 h-10 w-10" />
        <CarouselNext className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 z-10 h-10 w-10" />
      </Carousel>
    </section>
  );
};

export default Testimonials;
