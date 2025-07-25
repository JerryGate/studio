
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useImageContext, SliderImage } from '@/contexts/image-context';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { UploadCloud, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SliderManagementPage() {
    const { sliderImages, addSliderImages, removeSliderImage, loading } = useImageContext();
    const { toast } = useToast();
    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setIsUploading(true);
            const filesArray = Array.from(e.target.files);
            
            // Simulate upload delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            await addSliderImages(filesArray);
            toast({
                title: "Upload Complete",
                description: `${filesArray.length} image(s) have been added to the slider.`,
            });
            setIsUploading(false);
        }
    };

    if (loading) {
        return <div>Loading slider images...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-6">Manage Homepage Slider</h1>
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Image Upload</CardTitle>
                    <CardDescription>Upload new images to be displayed in the hero section carousel on the homepage.</CardDescription>
                </CardHeader>
                <CardContent>
                    <label htmlFor="image-upload" className="block border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                        <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                        <p className="mt-4 text-muted-foreground">{isUploading ? 'Uploading...' : 'Click to select files or drag & drop'}</p>
                        <input 
                            id="image-upload"
                            type="file"
                            multiple
                            accept="image/*"
                            className="sr-only"
                            onChange={handleImageUpload}
                            disabled={isUploading}
                        />
                    </label>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Current Slider Images</CardTitle>
                    <CardDescription>These are the images currently active in your homepage slider.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {sliderImages.map((image) => (
                             <AlertDialog key={image.id}>
                                <div className="relative group">
                                    <div className="aspect-video rounded-lg overflow-hidden border">
                                        <Image
                                            src={image.src}
                                            alt="Slider image"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="icon">
                                                <Trash2 className="h-5 w-5" />
                                            </Button>
                                        </AlertDialogTrigger>
                                    </div>
                                </div>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action will permanently remove this image from the slider.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                         onClick={() => removeSliderImage(image.id)}
                                         className="bg-destructive hover:bg-destructive/90"
                                        >
                                            Delete Image
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
