'use client';

import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { personalizedPropertyRecommendations } from '@/ai/flows/personalized-property-recommendations';
import { useEffect, useState } from 'react';
import type { Property } from '@/lib/types';
import Reveal from './animation/Reveal';
import PropertyCard from './PropertyCard';
import { Button } from './ui/button';
import Link from 'next/link';
import Magnetic from './animation/Magnetic';

const Recommendations = () => {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [recommendations, setRecommendations] = useState<Property[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const likedPropertiesRef = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, `users/${user.uid}/likedProperties`);
  }, [firestore, user]);

  const { data: likedProperties, isLoading: likedPropertiesLoading } = useCollection<Property>(likedPropertiesRef);

  useEffect(() => {
    const getRecommendations = async () => {
      if (user && likedProperties && likedProperties.length > 0 && !recommendations) {
        setIsLoading(true);
        try {
          const recommendedProperties = await personalizedPropertyRecommendations(likedProperties);
          setRecommendations(recommendedProperties);
        } catch (error) {
          console.error("Error getting recommendations:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    getRecommendations();
  }, [user, likedProperties, recommendations]);

  if (isUserLoading || likedPropertiesLoading) {
    return null;
  }

  if (!user) {
    return (
        <section className="py-20 text-center">
            <div className="max-w-5xl mx-auto">
                <Reveal>
                    <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">Personalized For You</h2>
                </Reveal>
                <Reveal delay={0.1}>
                    <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                        Sign in to discover properties tailored to your unique taste, based on your liked properties and preferences.
                    </p>
                </Reveal>
                <Reveal delay={0.2}>
                    <Magnetic>
                        <Link href="/signin" passHref>
                            <Button variant="outline" className="rounded-full font-bold text-lg px-8 py-6 group">
                                Sign In to See Recommendations
                            </Button>
                        </Link>
                    </Magnetic>
                </Reveal>
            </div>
      </section>
    );
  }

  if (isLoading) {
    return (
        <section className="py-20 text-center">
             <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">Generating Your Recommendations...</h2>
             <p className="text-muted-foreground">Our AI is finding the perfect properties for you.</p>
        </section>
    );
  }

  if (likedProperties && likedProperties.length === 0) {
    return (
      <section className="py-20 text-center">
        <div className="max-w-5xl mx-auto">
            <Reveal>
                <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">Start Liking Properties!</h2>
            </Reveal>
            <Reveal delay={0.1}>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    Start liking properties to get personalized recommendations from our AI.
                </p>
            </Reveal>
        </div>
      </section>
    )
  }

  if (!recommendations || recommendations.length === 0) {
    return null; // Don't show the section if no recommendations yet
  }

  return (
    <section className="py-20" id="recommendations">
      <div className="text-center mb-12">
        <Reveal>
          <h2 className="font-headline text-4xl md:text-5xl font-bold">Recommended For You</h2>
        </Reveal>
        <Reveal>
          <p className="text-muted-foreground mt-2">Based on your preferences, we think you'll love these.</p>
        </Reveal>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recommendations.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
};

export default Recommendations;
