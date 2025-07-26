
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InventoryTable from './inventory-table';
import { PlusCircle } from 'lucide-react';


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
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Product
                    </Button>
                </Link>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Your Drug Inventory</CardTitle>
                </CardHeader>
                <CardContent>
                     <InventoryTable />
                </CardContent>
            </Card>
        </div>
    );
}
