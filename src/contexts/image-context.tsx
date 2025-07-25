
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface SliderImage {
    id: string;
    src: string;
    hint: string;
    headline: string;
    description: string;
    ctaText: string;
    ctaLink: string;
}

interface ImageContextType {
  sliderImages: SliderImage[];
  addSliderImages: (files: File[]) => Promise<void>;
  removeSliderImage: (id: string) => void;
  updateSliderImage: (id: string, data: Partial<Omit<SliderImage, 'id' | 'src' | 'hint'>>) => void;
  loading: boolean;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

const defaultImages: SliderImage[] = [
    { 
        id: 'default1', 
        src: 'https://images.unsplash.com/photo-1576091160399-112BA8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMGhlYWx0aGNhcmUlMjB0ZWFtfGVufDB8fHx8MTc1MzQ4NTkwNHww&ixlib=rb-4.0.3&q=80&w=1080', 
        hint: 'healthcare team',
        headline: "Order Verified Drugs Instantly",
        description: "Access a wide range of authentic medications from licensed pharmacies across Nigeria. Your health is our priority.",
        ctaText: "Browse Medications",
        ctaLink: "/search",
    },
    { 
        id: 'default2', 
        src: 'https://images.unsplash.com/photo-1645097539346-2c141ad78edc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxkZWxpdmVyeSUyMHBlcnNvbiUyMG1vdG9yY3ljbGV8ZW58MHx8fHwxNzUzNDgzNDQ2fDA&ixlib=rb-4.1.0&q=80&w=1080', 
        hint: 'delivery person motorcycle',
        headline: "Fast Delivery with Location Pinning",
        description: "Our smart delivery system connects you to the nearest pharmacy for rapid delivery. Pin your location and track your order in real-time.",
        ctaText: "Track Your Order",
        ctaLink: "/dashboard/tracking",
    },
    { 
        id: 'default3', 
        src: 'https://images.unsplash.com/photo-1642844613096-7b743b7d9915?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxkb2N0b3IlMjB3aXRoJTIwcGF0aWVudHxlbnwwfHx8fDE3NTM0ODM0NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080', 
        hint: 'doctor with patient',
        headline: "Book Telehealth Consultations",
        description: "Connect with licensed doctors and pharmacists from the comfort of your home. Get professional advice when you need it most.",
        ctaText: "Book a Consultation",
        ctaLink: "/services",
    },
    { 
        id: 'default4', 
        src: 'https://images.unsplash.com/photo-1684014450286-9d990b02058a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxtZWRpY2luZSUyMG9uJTIwc2hlbGZ8ZW58MHx8fHwxNzUzNDgzNDQ2fDA&ixlib=rb-4.1.0&q=80&w=1080', 
        hint: 'medicine on shelf',
        headline: "Affordable Subscription Plans",
        description: "Manage chronic conditions with ease. Automate your monthly refills for hypertension, diabetes, and more with our subscription plans.",
        ctaText: "Learn More",
        ctaLink: "/services",
    },
];

const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export const ImageProvider = ({ children }: { children: ReactNode }) => {
    const [sliderImages, setSliderImages] = useState<SliderImage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        try {
            const storedImagesRaw = localStorage.getItem('sliderImages');
            if (storedImagesRaw) {
                const storedImages = JSON.parse(storedImagesRaw);
                // Basic validation
                if (Array.isArray(storedImages) && storedImages.length > 0) {
                    setSliderImages(storedImages);
                } else {
                     setSliderImages(defaultImages);
                }
            } else {
                setSliderImages(defaultImages);
            }
        } catch (error) {
            console.error("Failed to parse slider images from localStorage", error);
            setSliderImages(defaultImages);
        } finally {
            setLoading(false);
        }
    }, []);

    const updateLocalStorage = (images: SliderImage[]) => {
        localStorage.setItem('sliderImages', JSON.stringify(images));
    };

    const addSliderImages = async (files: File[]) => {
        const newImages: SliderImage[] = await Promise.all(
            files.map(async (file) => ({
                id: `${Date.now()}-${Math.random()}`,
                src: await fileToDataUrl(file),
                hint: 'custom uploaded image',
                headline: "New Headline",
                description: "Edit this description in the slider management panel.",
                ctaText: "Learn More",
                ctaLink: "#"
            }))
        );

        setSliderImages(prevImages => {
            const updatedImages = [...prevImages, ...newImages];
            updateLocalStorage(updatedImages);
            return updatedImages;
        });
    };

    const removeSliderImage = (id: string) => {
        setSliderImages(prevImages => {
            const updatedImages = prevImages.filter(image => image.id !== id);
             // If removing the last image, revert to defaults
            if (updatedImages.length === 0) {
                 updateLocalStorage(defaultImages);
                 return defaultImages;
            }
            updateLocalStorage(updatedImages);
            return updatedImages;
        });
    };
    
    const updateSliderImage = (id: string, data: Partial<Omit<SliderImage, 'id' | 'src' | 'hint'>>) => {
        setSliderImages(prevImages => {
            const updatedImages = prevImages.map(image => 
                image.id === id ? { ...image, ...data } : image
            );
            updateLocalStorage(updatedImages);
            return updatedImages;
        });
    };


    return (
        <ImageContext.Provider value={{ sliderImages, addSliderImages, removeSliderImage, updateSliderImage, loading }}>
            {children}
        </ImageContext.Provider>
    );
};

export const useImageContext = () => {
    const context = useContext(ImageContext);
    if (context === undefined) {
        throw new Error('useImageContext must be used within an ImageProvider');
    }
    return context;
};
