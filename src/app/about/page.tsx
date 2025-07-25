
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Globe, Users, Target } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      <header className="py-16 md:py-24 bg-primary/5 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary">About Medfast</h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trusted partner for accessible, affordable, and reliable healthcare in Nigeria.
          </p>
        </div>
      </header>

      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          
          {/* Mission and Vision Section */}
          <section className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">Our Mission</h2>
              <p className="text-muted-foreground text-lg mb-6">
                To bridge the gap in healthcare by providing a seamless platform that connects Nigerians to verified pharmacies, ensuring swift access to authentic medications. We are committed to revolutionizing pharmacy services through technology, making healthcare more convenient and reliable for everyone.
              </p>
              <h2 className="text-3xl font-bold text-primary mb-4">Our Vision</h2>
              <p className="text-muted-foreground text-lg">
                To be Nigeria's leading e-pharmacy platform, renowned for our unwavering commitment to quality, affordability, and speedy delivery. We envision a future where every Nigerian can access essential medicines with just a few clicks, empowering them to live healthier lives.
              </p>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                <Image 
                    src="https://placehold.co/600x400.png" 
                    alt="Pharmacists working" 
                    layout="fill" 
                    objectFit="cover"
                    data-ai-hint="pharmacist helping customer"
                />
            </div>
          </section>

          {/* Our Story Section */}
          <section className="mb-24">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-primary mb-4">Our Story</h2>
                <p className="text-muted-foreground text-lg">
                    Founded by a team of passionate healthcare professionals and tech innovators, Medfast was born out of a desire to solve a critical problem: the difficulty in accessing genuine medications quickly and safely in Nigeria. We saw the challenges - from counterfeit drugs to the logistical hurdles of reaching a pharmacy - and we knew there had to be a better way. Thus, Medfast was created as a beacon of hope and a symbol of quality healthcare for all.
                </p>
            </div>
          </section>

          {/* Core Values Section */}
          <section>
            <h2 className="text-3xl font-bold text-primary text-center mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                    <div className="mx-auto bg-accent text-accent-foreground rounded-full h-16 w-16 flex items-center justify-center mb-4">
                        <Users className="h-8 w-8" />
                    </div>
                  <CardTitle>Customer-Centric</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our customers are at the heart of everything we do. We strive to exceed their expectations at every turn.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                    <div className="mx-auto bg-accent text-accent-foreground rounded-full h-16 w-16 flex items-center justify-center mb-4">
                        <Target className="h-8 w-8" />
                    </div>
                  <CardTitle>Integrity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We are committed to the highest standards of ethics and integrity, ensuring that all medications are authentic and sourced from verified partners.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                    <div className="mx-auto bg-accent text-accent-foreground rounded-full h-16 w-16 flex items-center justify-center mb-4">
                        <Globe className="h-8 w-8" />
                    </div>
                  <CardTitle>Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We leverage cutting-edge technology to continuously improve our services and provide a seamless user experience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
