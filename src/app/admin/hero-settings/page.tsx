
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useHero } from '@/contexts/hero-context';

export default function HeroSettingsPage() {
    const { toast } = useToast();
    const { heroImages, setHeroImages } = useHero();
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    useEffect(() => {
        // Initialize previews with images from context
        setImagePreviews(heroImages);
    }, [heroImages]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            const newPreviews = filesArray.map(file => URL.createObjectURL(file));
            setImagePreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeImage = (index: number) => {
        setImagePreviews(prev => {
            const newPreviews = prev.filter((_, i) => i !== index);
            // If it's a blob url, revoke it to free memory
            if (imagePreviews[index].startsWith('blob:')) {
                URL.revokeObjectURL(imagePreviews[index]);
            }
            return newPreviews;
        });
    }

    const handleSaveChanges = () => {
        // In a real app, you would upload files, get URLs, and save.
        // Here, we save the blob or existing URLs directly to our context/localStorage.
        setHeroImages(imagePreviews);
        toast({
            title: "Hero Section Updated",
            description: "Your new hero images have been saved and are now live.",
        });
    }

    return (
        <div>
            <div className="flex items-center gap-2 mb-6">
                <ImageIcon className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold text-primary">Hero Settings</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Manage Hero Section Images</CardTitle>
                    <CardDescription>
                        Upload or remove images that appear in the homepage carousel. Changes will be live immediately after saving.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                     <div className="space-y-2">
                        <Label htmlFor="product-images">Upload New Images</Label>
                         <label htmlFor="product-images" className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors block">
                            <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                            <p className="mt-4 text-muted-foreground">Drag & drop files here, or click to select files</p>
                        </label>
                        <Input 
                            id="product-images" 
                            type="file" 
                            multiple 
                            accept="image/*"
                            onChange={handleImageChange}
                            className="sr-only" 
                        />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Current Images Preview</h3>
                        {imagePreviews.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="relative group">
                                <Image 
                                    src={preview} 
                                    alt={`Preview ${index + 1}`} 
                                    width={400} 
                                    height={200} 
                                    className="rounded-md aspect-video object-cover" 
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => removeImage(index)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                                </div>
                            ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground text-center py-8">No images have been uploaded.</p>
                        )}
                    </div>
                   
                    <div className="flex justify-end pt-4 border-t">
                        <Button size="lg" onClick={handleSaveChanges}>Save Changes</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
