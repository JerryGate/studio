
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2, UploadCloud, X, Send, Ban } from 'lucide-react';
import Image from 'next/image';

export default function AddBlogPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(prev => [...prev, ...filesArray]);

      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => {
        const newPreviews = prev.filter((_, i) => i !== index);
        // Clean up the object URL to avoid memory leaks
        URL.revokeObjectURL(imagePreviews[index]);
        return newPreviews;
    });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // In a real app, you would upload the files in `images` state to your storage
    // and save the URLs with the blog post.
    setTimeout(() => {
        toast({
            title: "Blog Post Created!",
            description: "The new blog post has been successfully saved.",
        });
        router.push('/admin/content-admin/blog');
        setIsLoading(false);
    }, 1500);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold animated-gradient-text mb-6">Add New Blog Post</h1>
      <Card>
        <CardHeader>
          <CardTitle>Post Details</CardTitle>
          <CardDescription>Fill out the form below to create a new blog post.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Post Title</Label>
              <Input id="title" placeholder="e.g., 10 Tips for a Healthier Lifestyle" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" placeholder="e.g., Health Tips" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="post-images">Blog Post Images</Label>
              <label htmlFor="post-images" className="block border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground">Click to select files or drag & drop</p>
                  <Input 
                      id="post-images"
                      type="file"
                      multiple
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImageChange}
                  />
              </label>
              {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <Image src={preview} alt={`Preview ${index + 1}`} width={150} height={150} className="rounded-md aspect-square object-cover" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" rows={15} placeholder="Write your blog post content here..." required />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                <Ban className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                Publish Post
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
