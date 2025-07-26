
'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { FileUp, Loader2, UploadCloud, X, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Card, CardContent } from './ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function PrescriptionUploadModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const { toast } = useToast();

    const handleFileChange = (files: FileList | null) => {
        if (!files || files.length === 0) return;
        const selectedFile = files[0];
        if (selectedFile) {
            if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
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
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setIsLoading(false);
        setIsOpen(false);
        removeFile();
        toast({
            title: "Prescription Uploaded!",
            description: "A pharmacist will review your prescription shortly and contact you.",
        });
    }

    const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        handleFileChange(e.dataTransfer.files);
    };

    const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };

    const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <FileUp className="mr-2 h-4 w-4" />
                    Upload Prescription
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md p-0">
                <Card className="border-0 shadow-lg">
                    <DialogHeader className="p-6 pb-0">
                        <div className="mx-auto bg-primary/10 text-primary rounded-full h-16 w-16 flex items-center justify-center mb-4">
                            <FileUp className="h-8 w-8" />
                        </div>
                        <DialogTitle className="text-2xl font-bold text-center text-primary">Upload Your Prescription</DialogTitle>
                        <DialogDescription className="text-center">
                           An image or PDF of your prescription will be reviewed by a pharmacist. Max file size: 5MB.
                        </DialogDescription>
                    </DialogHeader>
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <AnimatePresence mode="wait">
                                {!file ? (
                                    <motion.label
                                        key="dropzone"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        htmlFor="prescription-upload"
                                        onDrop={onDrop}
                                        onDragOver={onDragOver}
                                        onDragLeave={onDragLeave}
                                        className={cn(
                                            "flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
                                            isDragOver ? "border-primary bg-primary/10" : "border-muted-foreground/50 bg-secondary/50 hover:bg-muted/50"
                                        )}
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <UploadCloud className={cn("w-10 h-10 mb-3 text-muted-foreground transition-colors", isDragOver && "text-primary")} />
                                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold text-primary">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-muted-foreground">PNG, JPG or PDF (MAX. 5MB)</p>
                                        </div>
                                        <input id="prescription-upload" type="file" className="hidden" onChange={(e) => handleFileChange(e.target.files)} accept="image/png, image/jpeg, application/pdf" />
                                    </motion.label>
                                ) : (
                                    <motion.div
                                        key="preview"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="w-full"
                                    >
                                        <Card className="relative group p-4 bg-secondary/50">
                                            <div className="flex items-center gap-4">
                                                <div className="flex-shrink-0">
                                                    {file.type.startsWith('image/') ? (
                                                        <Image src={preview!} alt="Preview" width={64} height={64} className="rounded-md object-cover aspect-square" />
                                                    ) : (
                                                        <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                                                            <FileUp className="w-8 h-8 text-muted-foreground" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-grow overflow-hidden">
                                                    <p className="font-semibold text-sm truncate">{file.name}</p>
                                                    <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                                    <div className="flex items-center gap-1 text-emerald-600 text-xs mt-1">
                                                        <CheckCircle className="w-3 h-3"/>
                                                        <span>Ready to upload</span>
                                                    </div>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute top-2 right-2 h-6 w-6 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                                                    onClick={removeFile}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </Card>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <DialogFooter>
                                <Button type="submit" className="w-full" disabled={isLoading || !file}>
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
                                    Upload & Submit
                                </Button>
                            </DialogFooter>
                        </form>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    );
}
