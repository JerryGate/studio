
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Calendar, User, ArrowRight } from 'lucide-react';
import { mockBlogPosts } from '@/lib/mock-data';
import { BlogPost } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';


const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

const BlogCard = ({ post, isFeatured = false }: { post: BlogPost, isFeatured?: boolean }) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5, boxShadow: "0px 20px 25px -5px rgba(0,0,0,0.1), 0px 10px 10px -5px rgba(0,0,0,0.04)" }}
      className={cn("h-full", isFeatured && 'lg:col-span-2 lg:row-span-2')}
    >
      <Card className="flex flex-col h-full overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300">
        <Link href={`/blog/${post.slug}`} className="block group">
          <div className={cn("relative", isFeatured ? "aspect-video lg:aspect-[2/1]" : "aspect-video")}>
            <Image src={post.imageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={post.dataAiHint} />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
           {isFeatured && (
                <div className="absolute bottom-0 p-6 text-white">
                     <CardTitle className="text-2xl md:text-4xl font-extrabold">{post.title}</CardTitle>
                     <p className="mt-2 text-sm md:text-base line-clamp-2">{post.excerpt}</p>
                </div>
           )}
        </Link>
        {!isFeatured && (
            <>
                <CardHeader>
                  <CardTitle>
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors leading-tight text-xl">
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
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                    <Link href={`/blog/${post.slug}`} className="w-full">
                        <Button variant="link" className="p-0 text-accent group">
                            Read More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </CardFooter>
            </>
        )}
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
    
    const featuredPost = filteredPosts[0];
    const otherPosts = filteredPosts.slice(1);

    return (
        <div>
            <header className="py-20 md:py-28 bg-primary/5 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-primary">E-pharma Blog</h1>
                    <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Stay informed with the latest health tips, news, and updates from the E-pharma team.
                    </p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-16">
                {/* Search and Filter */}
                <div className="mb-12 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Search articles..."
                            className="pl-12 h-12 rounded-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                     <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="w-full md:w-[200px] h-12 rounded-full">
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
                    <motion.div 
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {featuredPost && <BlogCard post={featuredPost} isFeatured />}
                        {otherPosts.map(post => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </motion.div>
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
