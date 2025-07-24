
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface SliderImage {
    id: string;
    src: string;
    hint: string;
}

interface ImageContextType {
  sliderImages: SliderImage[];
  addSliderImages: (files: File[]) => Promise<void>;
  removeSliderImage: (id: string) => void;
  loading: boolean;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

const defaultImages: SliderImage[] = [
    { id: 'default1', src: 'https://i.postimg.cc/w3ydbRrt/Banner1.png', hint: 'pharmacist smiling customer' },
    { id: 'default2', src: 'https://i.postimg.cc/GBdcW3yW/Banner2.png', hint: 'delivery person motorcycle' },
    { id: 'default3', src: 'https://i.postimg.cc/06n8PgGb/Banner3.png', hint: 'happy family health' },
    { id: 'default4', src: 'https://i.postimg.cc/KK0yCPFT/Banner4.png', hint: 'medicine on shelf' },
    { id: 'default5', src: 'https://i.postimg.cc/FYgvVtBD/Banner5.png', hint: 'doctor with patient' },
    { id: 'default6', src: 'https://i.postimg.cc/0rQN5NBx/Banner6.png', hint: 'online pharmacy app' },
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

    return (
        <ImageContext.Provider value={{ sliderImages, addSliderImages, removeSliderImage, loading }}>
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
