import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HeartPulse, Store, Bike, UserCog, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: HeartPulse,
    role: 'Patients',
    description: 'Order drugs, track deliveries, and view your complete purchase history with ease.',
  },
  {
    icon: Store,
    role: 'Pharmacies',
    description: 'Upload your drug inventory, manage sales, and efficiently fulfill incoming orders.',
  },
  {
    icon: Bike,
    role: 'Dispatchers',
    description: 'Receive real-time pickup notifications and track your deliveries seamlessly.',
  },
  {
    icon: UserCog,
    role: 'Admins',
    description: 'Oversee the entire platform, managing pharmacies, patients, and transactions.',
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
           <div className="inline-block bg-primary/10 text-primary font-semibold py-1 px-3 rounded-full text-sm mb-4">
              Our Ecosystem
            </div>
          <h2 className="text-3xl md:text-4xl font-extrabold font-headline text-primary">
            A Platform for Everyone
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            We connect all stakeholders in the pharmaceutical chain to create a seamless and efficient experience for getting medication in Nigeria.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card key={service.role} className="flex flex-col shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <CardHeader className="flex-row items-center gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-lg transition-colors duration-300">
                    <service.icon className="h-6 w-6" />
                </div>
                <CardTitle className="font-headline text-2xl">{service.role}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="p-0 text-primary group">
                  Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
