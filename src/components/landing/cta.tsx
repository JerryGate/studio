
'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
        },
    },
};

const Cta = () => {
  return (
    <section id="contact" className="py-20 md:py-32 bg-secondary">
      <motion.div 
        className="container mx-auto px-4 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={itemVariants}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold font-headline animated-gradient-text mb-4">
          Ready to Take Control of Your Health?
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
          Join thousands of Nigerians who trust E-pharma for their medication needs. Fast, reliable, and always affordable.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="animated-border-button">
              <Link href="/search">
                <Button size="lg">
                  Order Your Drugs Today
                </Button>
              </Link>
          </div>
          <Link href="/partner">
            <Button size="lg" variant="outline">
              Join as a Pharmacy/Dispatcher
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Cta;
