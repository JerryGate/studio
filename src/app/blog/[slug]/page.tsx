
'use client';

import { Suspense, useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, User, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { mockBlogPosts } from '@/lib/mock-data';
import { BlogPost } from '@/types';
import { CommentSection } from '@/components/blog/comment-section';

function PostDetails({ slug }: { slug: string }) {
    const [post, setPost] = useState<BlogPost | undefined>(undefined);

    useEffect(() => {
        const foundPost = mockBlogPosts.find(p => p.slug === slug);
        setPost(foundPost);
    }, [slug]);

    if (post === undefined) {
        // Still loading, can show a skeleton here or just wait for the outer one
        return null; 
    }

    if (!post) {
        notFound();
    }

    return (
        <article>
            <header className="py-16 md:py-24 bg-primary/5 text-center">
                <div className="container mx-auto px-4">
                    <Badge variant="secondary" className="mb-4">{post.category}</Badge>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-primary max-w-3xl mx-auto">{post.title}</h1>
                    <div className="mt-6 flex items-center justify-center gap-6 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{post.publishedDate}</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="py-12 md:py-16">
                <div className="container mx-auto px-4">
                     <div className="relative aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg mb-12">
                        <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover"
                            data-ai-hint={post.dataAiHint}
                        />
                    </div>
                    <div className="prose prose-lg max-w-3xl mx-auto text-foreground prose-headings:text-primary prose-a:text-accent prose-strong:text-primary">
                        <p>{post.content}</p>
                        {/* In a real app, you would render the full post content, likely from Markdown or a similar format. */}
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>

                    <Separator className="my-16" />

                    <CommentSection postId={post.id} initialComments={post.comments} />
                </div>
            </main>
        </article>
    );
}

function PostSkeleton() {
    return (
        <div>
            <header className="py-16 md:py-24 bg-primary/5">
                 <div className="container mx-auto px-4 text-center max-w-3xl">
                    <Skeleton className="h-6 w-24 mx-auto mb-4" />
                    <Skeleton className="h-12 w-full mb-2" />
                     <Skeleton className="h-12 w-2/3 mx-auto mb-6" />
                    <div className="flex justify-center gap-6">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-5 w-32" />
                    </div>
                </div>
            </header>
             <main className="py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <Skeleton className="aspect-video max-w-4xl mx-auto rounded-lg mb-12" />
                    <div className="max-w-3xl mx-auto space-y-4">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-5/6" />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    return (
        <Suspense fallback={<PostSkeleton />}>
            <PostDetails slug={params.slug} />
        </Suspense>
    );
}
