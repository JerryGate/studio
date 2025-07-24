
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const isServer = typeof window === 'undefined';

const defaultImages = [
    'https://placehold.co/1200x600.png',
    'https://placehold.co/1200x600.png',
    'https://placehold.co/1200x600.png',
];

interface HeroContextType {
  heroImages: string[];
  setHeroImages: (images: string[]) => void;
}

const HeroContext = createContext<HeroContextType | undefined>(undefined);

export const HeroProvider = ({ children }: { children: ReactNode }) => {
    const { toast } = useToast();
    const [heroImages, setHeroImagesState] = useState<string[]>(() => {
        if (isServer) return defaultImages;
        try {
            const savedImages = localStorage.getItem('hero-images');
            return savedImages ? JSON.parse(savedImages) : defaultImages;
        } catch (e) {
            console.error("Failed to parse hero images from localStorage", e);
            return defaultImages;
        }
    });

    useEffect(() => {
        if (!isServer) {
            try {
                localStorage.setItem('hero-images', JSON.stringify(heroImages));
            } catch (error) {
                 if (error instanceof DOMException && (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
                    toast({
                        title: 'Storage Limit Exceeded',
                        description: 'Could not save new images. Please use fewer or smaller images.',
                        variant: 'destructive',
                    });
                } else {
                     console.error("Failed to save hero images to localStorage", error);
                }
            }
        }
    }, [heroImages, toast]);

    const setHeroImages = (images: string[]) => {
        setHeroImagesState(images);
    };
    
    return (
        <HeroContext.Provider value={{ heroImages, setHeroImages }}>
            {children}
        </HeroContext.Provider>
    );
};

export const useHero = () => {
    const context = useContext(HeroContext);
    if (context === undefined) {
        throw new Error('useHero must be used within a HeroProvider');
    }
    return context;
};
