'use client';

import { useState } from 'react';
import { getPersonalizedPropertyRecommendations } from '@/ai/flows/personalized-property-recommendations';
import { properties } from '@/lib/data';
import type { Property } from '@/lib/types';
import { Button } from './ui/button';
import PropertyCard from './PropertyCard';
import { Loader } from 'lucide-react';
import Reveal from './animation/Reveal';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      // Mock user data and all property features
      const mockUserInput = {
        userBrowsingHistory: ['p2', 'p4'],
        userSavedProperties: ['p1'],
        allPropertyFeatures: Object.fromEntries(
          properties.map(p => [p.id, {
            price: p.price,
            location: p.location,
            beds: p.beds,
            baths: p.baths,
            sqft: p.sqft,
            features: p.features
          }])
        ),
        numberOfRecommendations: 3,
      };

      const result = await getPersonalizedPropertyRecommendations(mockUserInput);
      
      const recommendedProps = result.recommendedPropertyIds
        .map(id => properties.find(p => p.id === id))
        .filter((p): p is Property => p !== undefined);

      setRecommendations(recommendedProps);
    } catch (e) {
      setError('Failed to get recommendations. Please try again later.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20" id="recommendations">
      <div className="text-center mb-12">
        <Reveal>
          <h2 className="font-headline text-4xl md:text-5xl font-bold">Just For You</h2>
        </Reveal>
        <Reveal>
          <p className="text-muted-foreground mt-2">AI-powered recommendations based on your activity.</p>
        </Reveal>
      </div>

      <div className="flex justify-center mb-12">
        <Button onClick={handleGetRecommendations} disabled={loading} size="lg" className="rounded-full">
          {loading ? (
            <>
              <Loader className="mr-2 h-5 w-5 animate-spin" />
              Generating...
            </>
          ) : (
            'Get My Recommendations'
          )}
        </Button>
      </div>

      {error && <p className="text-center text-destructive">{error}</p>}

      {recommendations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((property) => (
            <Reveal key={property.id}>
              <PropertyCard property={property} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
};

export default Recommendations;
