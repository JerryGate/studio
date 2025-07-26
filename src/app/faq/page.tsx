
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqItems = [
  {
    question: "What is E-pharma?",
    answer: "E-pharma is an online platform that connects you to verified pharmacies in Nigeria, allowing you to order authentic medications and healthcare products for fast delivery to your doorstep."
  },
  {
    question: "Are the medications on E-pharma genuine?",
    answer: "Absolutely. We partner exclusively with licensed and vetted pharmacies to ensure that every product sold on our platform is 100% genuine and safe."
  },
  {
    question: "How do I place an order?",
    answer: "Placing an order is simple: 1. Search for your desired medication. 2. Add the item(s) to your cart. 3. Proceed to checkout and fill in your delivery details. 4. Complete the payment securely online. Your order will then be processed and dispatched."
  },
  {
    question: "How long does delivery take?",
    answer: "Our system is designed for speed. We automatically route your order to the nearest partner pharmacy, with most deliveries in major cities completed in under 2 hours. Delivery times may vary based on your location and traffic conditions."
  },
  {
    question: "What are the delivery fees?",
    answer: "Delivery fees are calculated based on your location. The exact fee will be displayed at checkout before you confirm your order."
  },
  {
    question: "Can I track my order?",
    answer: "Yes, you can. Once your order is dispatched, you will receive a tracking link that allows you to monitor the progress of your delivery in real-time."
  }
];

export default function FaqPage() {
  return (
    <div className="bg-background text-foreground">
      <header className="py-16 md:py-24 bg-primary/5 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold animated-gradient-text">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions? We've got answers. Find the information you need below.
          </p>
        </div>
      </header>

      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-semibold text-left">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
        </div>
      </main>
    </div>
  );
}
