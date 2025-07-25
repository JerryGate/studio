
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

export const MobileSearch = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            router.push('/search');
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <div className="lg:hidden container mx-auto px-4 py-6">
            <motion.div
                className="w-full max-w-xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={itemVariants}
            >
                <form className="relative" onSubmit={handleSearch}>
                    <Input
                        type="text"
                        placeholder="e.g., Paracetamol, Vitamin C..."
                        className="h-14 pl-12 pr-24 text-lg rounded-lg shadow-lg"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                    <Button type="submit" size="lg" className="absolute right-2 top-1/2 -translate-y-1/2 h-12">
                        Search
                    </Button>
                </form>
            </motion.div>
        </div>
    );
};
