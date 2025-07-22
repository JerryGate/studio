import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const orders = [
    { id: 'ORD001', date: '2024-07-20', total: 3700, status: 'Delivered', items: 2 },
    { id: 'ORD002', date: '2024-07-22', total: 1500, status: 'Shipped', items: 1 },
    { id: 'ORD003', date: '2024-07-23', total: 800, status: 'Processing', items: 1 },
];

export default function OrderHistoryPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-6">Order History</h1>
            <Card>
                <CardHeader>
                    <CardTitle>My Orders</CardTitle>
                    <CardDescription>
                        View your past and current orders.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>{order.date}</TableCell>
                                    <TableCell>₦{order.total.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            order.status === 'Delivered' ? 'default' : 
                                            order.status === 'Shipped' ? 'secondary' : 'destructive'
                                        } className={
                                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                                        }>
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="sm">View Details</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
