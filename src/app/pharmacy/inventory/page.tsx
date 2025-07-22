
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DataTable } from '@/components/data-table';
import { Product } from '@/types';
import Link from 'next/link';

// Mock data for products in inventory
const mockInventory: Product[] = [
    { id: '1', name: 'Paracetamol 500mg', price: 500, imageUrls: ['https://placehold.co/300x300.png'], dataAiHint: 'white pills', category: 'Pain Relief', stock: 10, description: 'An effective pain reliever and fever reducer.' },
    { id: '2', name: 'Vitamin C 1000mg', price: 1200, imageUrls: ['https://placehold.co/300x300.png'], dataAiHint: 'orange tablets', category: 'Vitamins', stock: 25, description: 'Supports immune system.' },
    { id: '3', name: 'Amoxicillin 250mg', price: 800, imageUrls: ['https://placehold.co/300x300.png'], dataAiHint: 'capsules antibiotic', category: 'Antibiotics', stock: 0, description: 'Treats bacterial infections.' },
    { id: '4', name: 'Loratadine 10mg', price: 750, imageUrls: ['https://placehold.co/300x300.png'], dataAiHint: 'allergy medicine', category: 'Allergy', stock: 15, description: 'Non-drowsy antihistamine.' },
];

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'imageUrls',
    header: 'Image',
    cell: ({ row }) => {
        const urls = row.getValue('imageUrls') as string[];
        return <Image src={urls[0]} alt={row.getValue('name')} width={40} height={40} className="rounded-md" />
    }
  },
  {
    accessorKey: 'name',
    header: 'Product Name',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'price',
    header: 'Price (₦)',
    cell: ({ row }) => {
        const amount = parseFloat(row.getValue('price'))
        return <div>{amount.toLocaleString()}</div>
    }
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
     cell: ({ row }) => {
      const stock = row.getValue('stock') as number;
      const variant = stock > 10 ? 'default' : stock > 0 ? 'secondary' : 'destructive';
      const text = stock > 0 ? `${stock} units` : 'Out of Stock'
      return <Badge variant={variant as any}>{text}</Badge>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const product = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit Product</DropdownMenuItem>
            <DropdownMenuItem>View Product Page</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Remove from list</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function InventoryPage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                 <div>
                    <h1 className="text-3xl font-bold text-primary">Inventory Management</h1>
                    <div className="text-sm text-muted-foreground">
                        Add new drugs, update stock levels, and set prices.
                    </div>
                </div>
                <Link href="/pharmacy/inventory/add">
                    <Button>Add New Product</Button>
                </Link>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Your Drug Inventory</CardTitle>
                </CardHeader>
                <CardContent>
                     <DataTable columns={columns} data={mockInventory} searchColumn='name' searchPlaceholder="Filter by product name..." />
                </CardContent>
            </Card>
        </div>
    );
}
