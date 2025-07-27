
'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { AlertTriangle, Loader2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Card, CardContent, CardHeader } from './ui/card';

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
    hidden: { y: 10, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

export function EmergencyRequestModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsLoading(false);
        setIsOpen(false);
        toast({
            title: "Emergency Request Sent!",
            description: "Your request has been broadcasted to all available pharmacies and dispatchers. You will be contacted shortly.",
            variant: "destructive"
        });
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                         <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1.2 }}
                            whileHover={{ scale: 1.1 }}
                            className="fixed bottom-24 right-6 z-50"
                        >
                            <DialogTrigger asChild>
                                <Button variant="destructive" size="icon" className="w-16 h-16 rounded-full shadow-lg [box-shadow:0_0_15px_4px_hsl(var(--destructive))]">
                                    <AlertTriangle className="h-8 w-8" />
                                     <span className="sr-only">Emergency Request</span>
                                </Button>
                            </DialogTrigger>
                        </motion.div>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                        <p>Urgent Medical Request</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DialogContent className="bg-transparent border-none shadow-none p-0 sm:max-w-md">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="shadow-lg">
                        <DialogHeader className="p-6 pb-0 text-center">
                            <div className="mx-auto bg-destructive/10 text-destructive rounded-full h-16 w-16 flex items-center justify-center mb-4">
                                <AlertTriangle className="h-8 w-8" />
                            </div>
                            <DialogTitle className="text-2xl font-bold text-destructive">Urgent Medical Request</DialogTitle>
                            <DialogDescription>
                                For genuine emergencies only. This will alert all nearby pharmacies.
                            </DialogDescription>
                        </DialogHeader>
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit}>
                                <motion.div 
                                    className="space-y-4"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <motion.div className="space-y-2" variants={itemVariants}>
                                        <Label htmlFor="drugName">Drug Name</Label>
                                        <Input id="drugName" placeholder="e.g., Ventolin Inhaler" required />
                                    </motion.div>
                                    <motion.div className="space-y-2" variants={itemVariants}>
                                        <Label htmlFor="quantity">Quantity</Label>
                                        <Input id="quantity" placeholder="e.g., 1" required />
                                    </motion.div>
                                    <motion.div className="space-y-2" variants={itemVariants}>
                                        <Label htmlFor="urgencyReason">Reason for Urgency</Label>
                                        <Textarea id="urgencyReason" placeholder="Briefly describe the emergency" required />
                                    </motion.div>
                                </motion.div>
                                <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                                    <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" variant="destructive" disabled={isLoading} className="w-full sm:w-auto">
                                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                                        Send Urgent Alert
                                    </Button>
                                </DialogFooter>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
}
