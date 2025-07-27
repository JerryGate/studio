
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
                     setSliderImages([]);
                }
            } else {
                setSliderImages([]);
            }
        } catch (error) {
            console.error("Failed to parse slider images from localStorage", error);
            setSliderImages([]);
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
                 updateLocalStorage([]);
                 return [];
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
