
'use client';

import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
import { DataTable } from '@/components/data-table';
import { Product } from '@/types';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { allProducts } from '@/lib/mock-data';

export default function InventoryTable() {
    const [inventory, setInventory] = useState<Product[]>(allProducts);
    const { toast } = useToast();
    const router = useRouter();

    const handleRemove = (productId: string) => {
      setInventory(prev => prev.filter(p => p.id !== productId));
      toast({
        title: "Product Removed",
        description: "The product has been removed from your inventory."
      });
    }

    const columns: ColumnDef<Product>[] = [
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
             <AlertDialog>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => toast({ description: "This would open an edit form."})}>Edit Product</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/product/${product.id}`)}>View Product Page</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialogTrigger asChild>
                        <DropdownMenuItem className="text-destructive">Remove from list</DropdownMenuItem>
                    </AlertDialogTrigger>
                </DropdownMenuContent>
                </DropdownMenu>
                 <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will permanently remove "{product.name}" from your inventory.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                         onClick={() => handleRemove(product.id)}
                         className="bg-destructive hover:bg-destructive/90"
                        >
                            Remove
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
             </AlertDialog>
          );
        },
      },
    ];

    return (
        <DataTable columns={columns} data={inventory} searchColumn='name' searchPlaceholder="Filter by product name..." />
    );
}
