
'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useAuth } from '@/contexts/auth-context';
import { Comment } from '@/types';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

interface CommentSectionProps {
    postId: string;
    initialComments: Comment[];
}

export function CommentSection({ postId, initialComments }: CommentSectionProps) {
    const { user } = useAuth();
    const { toast } = useToast();
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setIsSubmitting(true);
        // In a real app, this would be an API call
        setTimeout(() => {
            const commentToAdd: Comment = {
                id: `comment-${Date.now()}`,
                author: user?.email.split('@')[0] || 'Anonymous',
                authorAvatarUrl: `https://i.pravatar.cc/150?u=${user?.id || 'anonymous'}`,
                date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                text: newComment,
            };
            setComments(prev => [commentToAdd, ...prev]);
            setNewComment('');
            setIsSubmitting(false);
            toast({
                title: "Comment Posted!",
                description: "Your comment has been added successfully."
            })
        }, 1000);
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-8">{comments.length} Comment{comments.length !== 1 ? 's' : ''}</h2>
            
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Leave a Comment</CardTitle>
                </CardHeader>
                <CardContent>
                    {user ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Textarea
                                placeholder="Write your comment here..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                rows={4}
                            />
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Posting...' : 'Post Comment'}
                            </Button>
                        </form>
                    ) : (
                        <div className="text-center p-4 border-2 border-dashed rounded-lg">
                            <p className="text-muted-foreground">
                                You must be logged in to leave a comment.
                            </p>
                            <Button asChild variant="link">
                                <Link href="/login">Login or Sign Up</Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="space-y-8">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                        <Avatar>
                            <AvatarImage src={comment.authorAvatarUrl} />
                            <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <p className="font-semibold">{comment.author}</p>
                                <span className="text-xs text-muted-foreground">&bull;</span>
                                <p className="text-xs text-muted-foreground">{comment.date}</p>
                            </div>
                            <p className="mt-1 text-foreground/90">{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
