
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Calendar, User } from 'lucide-react';
import { mockBlogPosts } from '@/lib/mock-data';
import { BlogPost } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
      className="h-full"
    >
      <Card className="flex flex-col h-full overflow-hidden rounded-lg">
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="relative aspect-video">
            <Image src={post.imageUrl} alt={post.title} fill className="object-cover" data-ai-hint={post.dataAiHint} />
          </div>
        </Link>
        <CardHeader>
          <CardTitle>
            <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
              {post.title}
            </Link>
          </CardTitle>
          <CardDescription>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.publishedDate}</span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
        </CardContent>
        <CardFooter>
            <Link href={`/blog/${post.slug}`} className="w-full">
                <Button variant="outline" className="w-full">Read More</Button>
            </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};


export default function BlogPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');

    const allCategories = ['all', ...Array.from(new Set(mockBlogPosts.map(p => p.category)))];

    const filteredPosts = mockBlogPosts
        .filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(post => category === 'all' || post.category === category);

    return (
        <div>
            <header className="py-16 md:py-24 bg-primary/5 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-primary">Our Blog</h1>
                    <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Stay informed with the latest health tips, news, and updates from the E-pharma team.
                    </p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-16">
                {/* Search and Filter */}
                <div className="mb-12 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Search articles..."
                            className="pl-10 h-11"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                     <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="w-full md:w-[180px] h-11">
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            {allCategories.map(cat => (
                                <SelectItem key={cat} value={cat}>
                                    {cat === 'all' ? 'All Categories' : cat}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Blog Posts Grid */}
                 {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map(post => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <h3 className="text-2xl font-semibold">No Posts Found</h3>
                        <p className="text-muted-foreground mt-2">
                           Try adjusting your search or filter to find what you're looking for.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}
