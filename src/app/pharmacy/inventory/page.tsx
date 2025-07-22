import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function InventoryPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-6">Inventory Management</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Manage Your Drug Inventory</CardTitle>
                    <CardDescription>
                        Add new drugs, update stock levels, and set prices.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-end mb-4">
                        <Button>Add New Product</Button>
                    </div>
                    <p>Your inventory list will appear here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
