

'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star, Send, Ban } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Order } from '@/types';
import { Card, CardContent } from '../ui/card';
import { motion } from 'framer-motion';

interface FeedbackDialogProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
  onSubmit: () => void;
}

const StarRating = ({ rating, setRating }: { rating: number, setRating: (rating: number) => void }) => {
    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                >
                    <Star
                        className={cn(
                            "h-8 w-8 transition-colors",
                            star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        )}
                    />
                </button>
            ))}
        </div>
    );
};

export function FeedbackDialog({ isOpen, onClose, order, onSubmit }: FeedbackDialogProps) {
    const [pharmacyRating, setPharmacyRating] = useState(0);
    const [deliveryRating, setDeliveryRating] = useState(0);
    const [comments, setComments] = useState('');

    const handleSubmit = () => {
        // In a real app, you would send this data to your backend
        console.log({
            orderId: order.id,
            pharmacyRating,
            deliveryRating,
            comments,
        });
        onSubmit();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-transparent border-none shadow-none p-0">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                <Card>
                    <DialogHeader className="p-6 text-center">
                        <div className="mx-auto bg-primary/10 text-primary rounded-full h-16 w-16 flex items-center justify-center mb-4">
                            <Star className="h-8 w-8" />
                        </div>
                        <DialogTitle className="text-2xl font-bold text-primary">Leave Feedback for Order #{order.id}</DialogTitle>
                        <DialogDescription>
                            Your feedback helps us improve our service.
                        </DialogDescription>
                    </DialogHeader>
                    <CardContent className="p-6">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="font-semibold">Rate the Pharmacy</label>
                                <StarRating rating={pharmacyRating} setRating={setPharmacyRating} />
                            </div>
                            <div className="space-y-2">
                                <label className="font-semibold">Rate the Delivery</label>
                                <StarRating rating={deliveryRating} setRating={setDeliveryRating} />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="comments" className="font-semibold">Additional Comments</label>
                                <Textarea
                                    id="comments"
                                    placeholder="Tell us more about your experience..."
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <DialogFooter className="p-6">
                        <Button variant="outline" onClick={onClose}>
                            <Ban className="mr-2 h-4 w-4" />
                            Skip
                        </Button>
                        <Button onClick={handleSubmit}>
                            <Send className="mr-2 h-4 w-4" />
                            Submit Feedback
                        </Button>
                    </DialogFooter>
                </Card>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
}
