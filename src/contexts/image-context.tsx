
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

const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

const defaultImages: SliderImage[] = [
    {
        id: "default-1",
        src: "https://placehold.co/1920x1080.png",
        hint: "pharmacist smiling",
        headline: "Quality Drugs, Delivered Fast",
        description: "Your trusted source for verified medications from local pharmacies in Nigeria.",
        ctaText: "Shop Now",
        ctaLink: "/search"
    },
    {
        id: "default-2",
        src: "https://placehold.co/1920x1080.png",
        hint: "doctor consulting patient",
        headline: "Expert Advice at Your Fingertips",
        description: "Connect with licensed pharmacists and doctors for telehealth consultations.",
        ctaText: "Book a Consultation",
        ctaLink: "/services"
    },
    {
        id: "default-3",
        src: "https://placehold.co/1920x1080.png",
        hint: "delivery person smiling",
        headline: "Real-Time Delivery Tracking",
        description: "Never miss a delivery. Track your order from the pharmacy to your doorstep.",
        ctaText: "Track Your Order",
        ctaLink: "/dashboard/tracking"
    },
];

export const ImageProvider = ({ children }: { children: ReactNode }) => {
    const [sliderImages, setSliderImages] = useState<SliderImage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        try {
            const storedImagesRaw = localStorage.getItem('sliderImages');
            if (storedImagesRaw) {
                const storedImages = JSON.parse(storedImagesRaw);
                if (Array.isArray(storedImages) && storedImages.length > 0) {
                    setSliderImages(storedImages);
                } else {
                     setSliderImages(defaultImages);
                }
            } else {
                setSliderImages(defaultImages);
            }
        } catch (error) {
            console.error("Failed to parse slider images from localStorage, using defaults.", error);
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
