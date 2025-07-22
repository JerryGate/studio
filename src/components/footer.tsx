import { Instagram, Twitter } from 'lucide-react';
import Logo from './logo';
import Link from 'next/link';

const Footer = () => {
  const footerLinks = [
    {
      title: 'Company',
      links: ['About Us', 'Services', 'Testimonials', 'Contact Us', 'FAQ'],
    },
    {
      title: 'Legal',
      links: ['Terms of Service', 'Privacy Policy'],
    },
    {
      title: 'Get Started',
      links: ['Register to Buy', 'Join as a Pharmacy', 'Join as a Dispatcher'],
    },
  ];

  const socialLinks = [
    {
      name: 'X (Twitter)',
      icon: Twitter,
      href: '#',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: '#',
    },
  ];

  return (
    <footer className="bg-primary/5 text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Your trusted partner for quality and affordable medication in Nigeria.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link key={social.name} href={social.href} passHref>
                  <span
                    className="inline-block text-muted-foreground hover:text-primary transition-colors duration-300"
                    aria-label={social.name}
                  >
                    <social.icon className="h-6 w-6" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-headline font-semibold text-primary mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link href="#" passHref>
                      <span className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer">
                        {link}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Medfast Nigeria. All rights reserved.</p>
          <p className="mt-2">
            Contact: <a href="mailto:support@medfast.ng" className="hover:text-primary">support@medfast.ng</a> | <a href="tel:+234123456789" className="hover:text-primary">+234-123-456-789</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
