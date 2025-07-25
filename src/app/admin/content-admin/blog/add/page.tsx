
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function AddBlogPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // In a real app, you would send this data to your backend
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
      <h1 className="text-3xl font-bold text-primary mb-6">Add New Blog Post</h1>
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
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" placeholder="e.g., Health Tips" required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="image-url">Image URL</Label>
                    <Input id="image-url" placeholder="https://placehold.co/800x400.png" required />
                </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" rows={15} placeholder="Write your blog post content here..." required />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Publish Post
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
