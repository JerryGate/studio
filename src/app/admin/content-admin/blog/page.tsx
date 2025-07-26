
'use client';

import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DataTable } from '@/components/data-table';
import { BlogPost } from '@/types';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { mockBlogPosts } from '@/lib/mock-data';

export default function BlogManagementPage() {
    const [posts, setPosts] = useState<BlogPost[]>(mockBlogPosts);
    const { toast } = useToast();
    const router = useRouter();

    const handleDelete = (postId: string) => {
      setPosts(prev => prev.filter(p => p.id !== postId));
      toast({
        title: "Post Deleted",
        description: "The blog post has been successfully deleted."
      });
    }

    const columns: ColumnDef<BlogPost>[] = [
      {
        accessorKey: 'title',
        header: 'Title',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('title')}</div>
        ),
      },
      {
        accessorKey: 'category',
        header: 'Category',
      },
      {
        accessorKey: 'author',
        header: 'Author',
      },
      {
        accessorKey: 'publishedDate',
        header: 'Date Published',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.getValue('status') as string;
          return <Badge variant={status === 'Published' ? 'default' : 'secondary'}>{status}</Badge>;
        },
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const post = row.original;
          return (
             <AlertDialog>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => toast({ description: "This would open an edit form."})}>Edit Post</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/blog/${post.slug}`)}>View Post</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialogTrigger asChild>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </AlertDialogTrigger>
                </DropdownMenuContent>
                </DropdownMenu>
                 <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will permanently delete the post "{post.title}".
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                         onClick={() => handleDelete(post.id)}
                         className="bg-destructive hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
             </AlertDialog>
          );
        },
      },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                 <div>
                    <h1 className="text-3xl font-bold animated-gradient-text">Blog Management</h1>
                    <div className="text-sm text-muted-foreground">
                        Create, edit, and manage all blog posts for the website.
                    </div>
                </div>
                <Link href="/admin/content-admin/blog/add">
                    <Button>Add New Post</Button>
                </Link>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Blog Posts</CardTitle>
                </CardHeader>
                <CardContent>
                     <DataTable columns={columns} data={posts} searchColumn='title' searchPlaceholder="Filter posts by title..." />
                </CardContent>
            </Card>
        </div>
    );
}
