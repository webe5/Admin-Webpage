import React, { useState } from 'react';
import {
    Search,
    HelpCircle,
    Plus,
    Edit,
    Trash2,
    ChevronDown,
    ChevronUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const faqs = [
    {
        id: 1,
        category: 'Visa & Travel',
        question: 'What documents do I need for an Indian tourist visa?',
        answer: 'You need a valid passport with at least 6 months validity, recent passport-sized photographs, proof of accommodation, return flight tickets, and sufficient funds for your stay.',
        views: 1250,
        helpful: 980
    },
    {
        id: 2,
        category: 'Safety',
        question: 'Is it safe to travel alone in India?',
        answer: 'India is generally safe for solo travelers. Follow standard safety precautions, stay in well-reviewed accommodations, use registered transportation, and keep emergency contacts handy.',
        views: 2100,
        helpful: 1650
    },
    {
        id: 3,
        category: 'Transportation',
        question: 'How do I book train tickets in India?',
        answer: 'You can book train tickets through the official IRCTC website or mobile app. Foreign tourists can also use services like Cleartrip or MakeMyTrip for easier booking.',
        views: 1800,
        helpful: 1420
    },
    {
        id: 4,
        category: 'Currency',
        question: 'Where can I exchange currency in India?',
        answer: 'Currency can be exchanged at airports, authorized money changers, banks, and some hotels. Always use authorized dealers and keep exchange receipts.',
        views: 1500,
        helpful: 1200
    },
    {
        id: 5,
        category: 'Health',
        question: 'What vaccinations do I need before traveling to India?',
        answer: 'Recommended vaccinations include Hepatitis A & B, Typhoid, Tetanus, and Japanese Encephalitis. Consult your doctor 4-6 weeks before travel.',
        views: 950,
        helpful: 750
    },
];

const categories = ['All', 'Visa & Travel', 'Safety', 'Transportation', 'Currency', 'Health', 'Accommodation', 'Food'];

export default function KnowledgeBase() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [expandedFaq, setExpandedFaq] = useState(null);

    const filteredFaqs = selectedCategory === 'All'
        ? faqs
        : faqs.filter(f => f.category === selectedCategory);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">FAQ & Knowledge Base</h1>
                    <p className="text-muted-foreground mt-2">Manage frequently asked questions</p>
                </div>
                <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add FAQ
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Total FAQs</p>
                                <p className="text-3xl font-bold text-foreground">{faqs.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <HelpCircle className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Total Views</p>
                                <p className="text-3xl font-bold text-purple-600">
                                    {(faqs.reduce((sum, f) => sum + f.views, 0) / 1000).toFixed(1)}K
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <Search className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Helpful Votes</p>
                                <p className="text-3xl font-bold text-green-600">
                                    {(faqs.reduce((sum, f) => sum + f.helpful, 0) / 1000).toFixed(1)}K
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <ChevronUp className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Categories</p>
                                <p className="text-3xl font-bold text-orange-600">{categories.length - 1}</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                <HelpCircle className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="glass-card border-border">
                <CardContent className="p-6">
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search FAQs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                    <Card key={faq.id} className="glass-card border-border hover:shadow-xl transition-all">
                        <CardContent className="p-6">
                            <div
                                className="flex items-start justify-between cursor-pointer"
                                onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Badge variant="outline">{faq.category}</Badge>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <span>{faq.views} views</span>
                                            <span>{faq.helpful} found helpful</span>
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-lg text-foreground mb-2">{faq.question}</h3>
                                    {expandedFaq === faq.id && (
                                        <p className="text-muted-foreground mt-3">{faq.answer}</p>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                    <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        {expandedFaq === faq.id ? (
                                            <ChevronUp className="w-5 h-5" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
