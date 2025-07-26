
'use client';

import { Button } from "./ui/button";
import { motion } from 'framer-motion';
import { FaWhatsapp } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { useSettings } from "@/contexts/settings-context";
import { WhatsAppChatModal } from "./whatsapp-chat-modal";

export function WhatsAppCta() {
    const { whatsAppNumber, loading } = useSettings();

    if (loading) {
        return null;
    }

    return (
        <WhatsAppChatModal whatsAppNumber={whatsAppNumber}>
             <motion.div
                initial={{ scale: 0, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
                whileHover={{ scale: 1.1 }}
                className="fixed bottom-6 right-6 z-50"
            >
                <Button
                    size="icon"
                    className={cn(
                    "w-16 h-16 rounded-full shadow-lg text-white hover:bg-[#25D366]/90",
                    "bg-[#25D366]"
                    )}
                >
                    <FaWhatsapp className="h-8 w-8 text-white" />
                    <span className="sr-only">Contact us on WhatsApp</span>
                </Button>
            </motion.div>
        </WhatsAppChatModal>
    );
}
