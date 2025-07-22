import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, MapPin, Search } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: '1. Search Drugs',
    description: 'Easily find the medications you need from our extensive catalog of verified drugs.',
  },
  {
    icon: CreditCard,
    title: '2. Order & Pay',
    description: 'Add to cart and complete your purchase securely with our integrated payment system.',
  },
  {
    icon: MapPin,
    title: '3. Track Delivery',
    description: 'Your order is sent to the nearest pharmacy and you can track your delivery in real-time.',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
           <div className="inline-block bg-primary/10 text-primary font-semibold py-1 px-3 rounded-full text-sm mb-4">
              Easy as 1-2-3
            </div>
          <h2 className="text-3xl md:text-4xl font-extrabold font-headline text-primary">
            Get Your Medication in Three Simple Steps
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We've streamlined the process to make healthcare accessible and convenient for you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-accent">
              <CardHeader>
                <div className="mx-auto bg-accent text-accent-foreground rounded-full h-16 w-16 flex items-center justify-center mb-4">
                  <step.icon className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline text-2xl text-primary">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
