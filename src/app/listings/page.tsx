import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Reveal from '@/components/animation/Reveal';
import Listings from './_components/Listings';

const ListingsFallback = () => (
  <div>
    <Reveal>
      <h1 className="font-headline text-4xl md:text-6xl font-bold mb-2">
        Searching Listings...
      </h1>
    </Reveal>
    <Reveal delay={0.1}>
      <p className="text-muted-foreground mb-12">
        Please wait a moment.
      </p>
    </Reveal>
    <div className="flex flex-col items-center gap-12">
      <Skeleton className="h-[550px] w-full max-w-[800px] rounded-2xl" />
      <Skeleton className="h-[550px] w-full max-w-[800px] rounded-2xl" />
      <Skeleton className="h-[550px] w-full max-w-[800px] rounded-2xl" />
    </div>
  </div>
);


export default function ListingsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <Suspense fallback={<ListingsFallback />}>
          <Listings />
        </Suspense>
      </div>
    </div>
  );
};
