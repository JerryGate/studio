
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useImageContext } from '@/contexts/image-context';

export default function SliderManagementPage() {
    const { sliderImages, addSliderImages, removeSliderImage } = useImageContext();
    const [newImages, setNewImages] = useState<File[]>([]);
    const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setNewImages(prev => [...prev, ...filesArray]);

            const newPreviews = filesArray.map(file => URL.createObjectURL(file));
            setNewImagePreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeNewImage = (index: number) => {
        setNewImages(prev => prev.filter((_, i) => i !== index));
        setNewImagePreviews(prev => {
            const newPreviews = prev.filter((_, i) => i !== index);
            URL.revokeObjectURL(newImagePreviews[index]);
            return newPreviews;
        });
    }

    const handleUpload = async () => {
        if (newImages.length === 0) {
            toast({
                title: "No Images Selected",
                description: "Please select one or more images to upload.",
                variant: 'destructive',
            });
            return;
        }

        setIsLoading(true);
        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        await addSliderImages(newImages);
        
        setNewImages([]);
        setNewImagePreviews([]);
        setIsLoading(false);

        toast({
            title: "Success!",
            description: "New images have been added to the hero slider.",
        });
    }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
        <ImageIcon className="h-8 w-8" />
        Manage Hero Slider Images
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Upload New Images</CardTitle>
          <CardDescription>Select images from your device to add to the website's main image slider.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <Label htmlFor="product-images">Select Images</Label>
                <div className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <label htmlFor="image-upload" className="cursor-pointer">
                        <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                        <p className="mt-4 text-muted-foreground">Drag & drop files here, or click to select files</p>
                        <Input
                            id="image-upload" 
                            type="file" 
                            multiple 
                            accept="image/*"
                            onChange={handleImageChange}
                            className="sr-only" 
                        />
                    </label>
                </div>
                {newImagePreviews.length > 0 && (
                    <div className="mt-4">
                        <h4 className="font-semibold mb-2">Staged for Upload:</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {newImagePreviews.map((preview, index) => (
                            <div key={index} className="relative group">
                            <Image src={preview} alt={`Preview ${index + 1}`} width={200} height={200} className="rounded-md aspect-video object-cover" />
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeNewImage(index)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                            </div>
                        ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex justify-end mt-6">
                <Button onClick={handleUpload} disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Add Selected Images
                </Button>
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Slider Images</CardTitle>
          <CardDescription>These are the images currently displayed on the hero slider. You can remove them here.</CardDescription>
        </CardHeader>
        <CardContent>
            {sliderImages.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {sliderImages.map((image, index) => (
                        <div key={index} className="relative group">
                            <Image src={image.src} alt={`Slider image ${index + 1}`} width={200} height={200} className="rounded-md aspect-video object-cover" />
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeSliderImage(image.id)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground">No images have been uploaded yet. Add some images above to get started.</p>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
