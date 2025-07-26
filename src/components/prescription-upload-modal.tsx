
'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { FileUp, Loader2, UploadCloud, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

export function PrescriptionUploadModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const { toast } = useToast();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.size > 5 * 1024 * 1024) {
                toast({
                    title: "File too large",
                    description: "Please upload a file smaller than 5MB.",
                    variant: "destructive",
                });
                return;
            }
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };
    
    const removeFile = () => {
        setFile(null);
        if (preview) {
            URL.revokeObjectURL(preview);
            setPreview(null);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            toast({
                title: "No file selected",
                description: "Please select a prescription file to upload.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        // Simulate API call for upload
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setIsLoading(false);
        setIsOpen(false);
        removeFile();
        toast({
            title: "Prescription Uploaded!",
            description: "A pharmacist will review your prescription shortly and contact you.",
        });
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <FileUp className="mr-2 h-4 w-4" />
                    Upload Prescription
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Your Prescription</DialogTitle>
                    <DialogDescription>
                       Upload an image or PDF of your prescription. A pharmacist will review it. Max file size: 5MB.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    {!preview ? (
                        <label htmlFor="prescription-upload" className="block border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                            <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                            <p className="mt-4 text-muted-foreground">Click to select a file or drag & drop</p>
                            <input 
                                id="prescription-upload"
                                type="file"
                                accept="image/jpeg,image/png,application/pdf"
                                className="sr-only"
                                onChange={handleFileChange}
                            />
                        </label>
                    ) : (
                        <div className="relative group w-fit mx-auto">
                            {file?.type.startsWith('image/') ? (
                                <Image src={preview} alt="Prescription preview" width={200} height={200} className="rounded-md object-contain border" />
                            ) : (
                                <div className="p-4 border rounded-md text-center">
                                    <FileUp className="h-12 w-12 mx-auto" />
                                    <p className="font-semibold mt-2">{file?.name}</p>
                                </div>
                            )}
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={removeFile}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={isLoading || !file}>
                             {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Upload and Submit
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
