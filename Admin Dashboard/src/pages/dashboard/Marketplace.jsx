import React, { useState } from 'react';
import {
    Search,
    Store,
    Plus,
    Edit,
    Trash2,
    Eye,
    Star,
    ShoppingBag,
    TrendingUp,
    DollarSign
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const products = [
    {
        id: 1,
        name: 'Handcrafted Pashmina Shawl',
        vendor: 'Kashmir Crafts',
        category: 'Textiles',
        price: 5000,
        stock: 45,
        sales: 128,
        rating: 4.8,
        status: 'active',
        image: 'placeholder'
    },
    {
        id: 2,
        name: 'Blue Pottery Set',
        vendor: 'Jaipur Artisans',
        category: 'Handicrafts',
        price: 2500,
        stock: 30,
        sales: 89,
        rating: 4.6,
        status: 'active',
        image: 'placeholder'
    },
    {
        id: 3,
        name: 'Darjeeling Tea Collection',
        vendor: 'Tea Gardens India',
        category: 'Food & Beverage',
        price: 800,
        stock: 120,
        sales: 256,
        rating: 4.9,
        status: 'active',
        image: 'placeholder'
    },
    {
        id: 4,
        name: 'Madhubani Painting',
        vendor: 'Bihar Art Gallery',
        category: 'Art',
        price: 3500,
        stock: 15,
        sales: 42,
        rating: 4.7,
        status: 'low_stock',
        image: 'placeholder'
    },
];

export default function Marketplace() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Local Marketplace</h1>
                    <p className="text-muted-foreground mt-2">Manage local products and souvenirs</p>
                </div>
                <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Product
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Total Products</p>
                                <p className="text-3xl font-bold text-foreground">{products.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <ShoppingBag className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Total Sales</p>
                                <p className="text-3xl font-bold text-green-600">
                                    {products.reduce((sum, p) => sum + p.sales, 0)}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Revenue</p>
                                <p className="text-3xl font-bold text-purple-600">₹2.4M</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Avg Rating</p>
                                <p className="text-3xl font-bold text-yellow-600">4.8</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <Star className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="glass-card border-border">
                <CardContent className="p-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                    <Card key={product.id} className="glass-card border-border hover:shadow-xl transition-all">
                        <div className="h-48 bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                            <ShoppingBag className="w-16 h-16 text-muted-foreground/50" />
                        </div>
                        <CardContent className="p-6 space-y-4">
                            <div>
                                <h3 className="font-bold text-lg text-foreground">{product.name}</h3>
                                <p className="text-sm text-muted-foreground">{product.vendor}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <Badge variant="outline">{product.category}</Badge>
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold text-foreground">{product.rating}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div>
                                    <p className="text-muted-foreground">Price</p>
                                    <p className="font-bold text-lg text-foreground">₹{product.price}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Stock</p>
                                    <p className="font-semibold text-foreground">{product.stock}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Sales</p>
                                    <p className="font-semibold text-foreground">{product.sales}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 pt-2">
                                <Button variant="outline" className="flex-1" size="sm">
                                    <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" className="flex-1" size="sm">
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="destructive" size="sm">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
