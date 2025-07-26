
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useImageContext } from '@/contexts/image-context';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { UploadCloud, Trash2, Edit, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function SliderManagementPage() {
    const { sliderImages, addSliderImages, removeSliderImage, updateSliderImage, loading } = useImageContext();
    const { toast } = useToast();
    const [isUploading, setIsUploading] = useState(false);
    const [editSlide, setEditSlide] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    
    const [editHeadline, setEditHeadline] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editCtaText, setEditCtaText] = useState('');
    const [editCtaLink, setEditCtaLink] = useState('');


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
    
    const openEditDialog = (image) => {
        setEditSlide(image);
        setEditHeadline(image.headline);
        setEditDescription(image.description);
        setEditCtaText(image.ctaText);
        setEditCtaLink(image.ctaLink);
        setIsEditOpen(true);
    };

    const handleEditSubmit = () => {
        if (!editSlide) return;
        updateSliderImage(editSlide.id, {
            headline: editHeadline,
            description: editDescription,
            ctaText: editCtaText,
            ctaLink: editCtaLink,
        });
        toast({
            title: "Slide Updated",
            description: "The slide content has been successfully updated.",
        });
        setIsEditOpen(false);
        setEditSlide(null);
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold animated-gradient-text mb-6">Manage Homepage Slider</h1>
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
                    <CardDescription>These are the images currently active in your homepage slider. Click edit to change the text and links.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {sliderImages.map((image) => (
                             <Dialog key={image.id} onOpenChange={isEditOpen ? setIsEditOpen : undefined}>
                                <Card className="relative group flex flex-col">
                                    <div className="aspect-video relative rounded-t-lg overflow-hidden border-b">
                                        <Image
                                            src={image.src}
                                            alt="Slider image"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="text-base truncate">{image.headline}</CardTitle>
                                    </CardHeader>
                                     <CardContent className="flex-grow">
                                        <p className="text-sm text-muted-foreground line-clamp-2">{image.description}</p>
                                    </CardContent>
                                    <CardFooter className="flex justify-between items-center bg-muted/50 p-3">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive" size="icon">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </AlertDialogTrigger>
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
                                        <Button variant="outline" size="icon" onClick={() => openEditDialog(image)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </Dialog>
                        ))}
                    </div>
                </CardContent>
            </Card>
            
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                 <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Slide Content</DialogTitle>
                        <DialogDescription>
                            Update the text and links associated with this slider image.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="headline">Headline</Label>
                            <Input id="headline" value={editHeadline} onChange={(e) => setEditHeadline(e.target.value)} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="cta-text">CTA Button Text</Label>
                            <Input id="cta-text" value={editCtaText} onChange={(e) => setEditCtaText(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cta-link">CTA Button Link</Label>
                            <Input id="cta-link" value={editCtaLink} onChange={(e) => setEditCtaLink(e.target.value)} placeholder="e.g., /search or /services" />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                         <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                         <Button onClick={handleEditSubmit}>Save Changes</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
