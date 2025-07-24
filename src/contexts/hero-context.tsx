
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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
    const [heroImages, setHeroImagesState] = useState<string[]>(() => {
        if (isServer) return defaultImages;
        try {
            const savedImages = localStorage.getItem('hero-images');
            return savedImages ? JSON.parse(savedImages) : defaultImages;
        } catch (e) {
            return defaultImages;
        }
    });

    useEffect(() => {
        if (!isServer) {
            localStorage.setItem('hero-images', JSON.stringify(heroImages));
        }
    }, [heroImages]);

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
