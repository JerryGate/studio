
import { Instagram, Twitter } from 'lucide-react';
import Logo from './logo';
import Link from 'next/link';

const Footer = () => {
  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Services', href: '/#services' },
        { name: 'Testimonials', href: '/#testimonials' },
        { name: 'Contact Us', href: '/#contact' },
        { name: 'FAQ', href: '/faq' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', href: '#' },
        { name: 'Privacy Policy', href: '#' },
      ],
    },
    {
      title: 'Get Started',
      links: [
        { name: 'Create a Customer Account', href: '/signup' },
        { name: 'Partner with Us', href: '/partner' },
      ],
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
    <footer id="contact" className="bg-primary/5 text-foreground">
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
                  <li key={link.name}>
                    <Link href={link.href} passHref>
                      <span className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} E-pharma. All rights reserved.</p>
          <p className="mt-2">
            Contact: <a href="mailto:support@e-pharma.com" className="hover:text-primary">support@e-pharma.com</a> | <a href="tel:+234123456789" className="hover:text-primary">+234-123-456-789</a>
          </p>
           <p className="mt-2">
            <Link href="/partner/login" className="hover:text-primary">Partner Login</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
