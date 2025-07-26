
'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from './ui/card';

interface WhatsAppChatModalProps {
    whatsAppNumber: string;
    children: React.ReactNode;
}

export function WhatsAppChatModal({ whatsAppNumber, children }: WhatsAppChatModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://wa.me/${whatsAppNumber}`;
    const chatLink = `https://wa.me/${whatsAppNumber}`;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-md bg-transparent border-none shadow-none p-0">
                 <Card className="overflow-hidden">
                    <div className="bg-teal-600 p-8 text-center">
                        <FaWhatsapp className="h-16 w-16 text-white mx-auto" />
                        <DialogTitle className="text-2xl font-bold text-white mt-4">Chat with us on WhatsApp</DialogTitle>
                        <DialogDescription className="text-white/90 mt-2">
                           Scan the QR code or click the button below to start a conversation.
                        </DialogDescription>
                    </div>
                    <CardContent className="p-6 text-center space-y-6">
                        <div className="p-4 border-4 border-dashed rounded-lg inline-block">
                             <Image 
                                src={qrCodeUrl} 
                                alt="WhatsApp QR Code" 
                                width={200} 
                                height={200}
                             />
                        </div>
                        <p className="text-muted-foreground">Or</p>
                         <Button asChild size="lg" className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white">
                            <Link href={chatLink} target="_blank" rel="noopener noreferrer">
                                <FaWhatsapp className="mr-2 h-5 w-5" />
                                Start Chat
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    );
}
