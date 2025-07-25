
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Palette, Newspaper, FileUp, Image as ImageIcon } from 'lucide-react';

export default function ContentAdminDashboard() {
  const managementAreas = [
    { title: 'Manage Themes', description: 'Change website colors and fonts.', href: '/admin/theme', icon: Palette },
    { title: 'Manage Slider Images', description: 'Upload or remove homepage slider images.', href: '/admin/content-admin/slider', icon: ImageIcon },
    { title: 'Blog Posts', description: 'Create, edit, and publish articles.', href: '/admin/content-admin/blog', icon: Newspaper },
    { title: 'Document Uploads', description: 'Manage pharmacy licenses and other documents.', href: '#', icon: FileUp },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">Content Admin Dashboard</h1>
       <Card className="mb-8">
        <CardHeader>
            <CardTitle>Welcome, Content Admin!</CardTitle>
            <CardDescription>Manage all website content, uploads, and visual settings from this portal.</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {managementAreas.map((area) => (
          <Card key={area.title}>
            <CardHeader>
              <div className='flex items-center gap-4'>
                <area.icon className="h-8 w-8 text-primary" />
                <div>
                    <CardTitle>{area.title}</CardTitle>
                    <CardDescription>{area.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link href={area.href}>
                <Button>Manage {area.title.replace('Manage ', '')}</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
