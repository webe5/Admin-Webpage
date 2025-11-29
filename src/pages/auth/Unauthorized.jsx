import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

export default function Unauthorized() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-50">
            <div className="text-center space-y-6 max-w-md px-4">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <ShieldAlert className="w-12 h-12 text-red-600" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-slate-900">Access Denied</h1>
                    <p className="text-slate-500">
                        You do not have permission to access this resource. Please contact your administrator if you believe this is a mistake.
                    </p>
                </div>

                <div className="flex gap-4 justify-center">
                    <Button variant="outline" onClick={() => navigate(-1)}>
                        Go Back
                    </Button>
                    <Button onClick={() => navigate('/')}>
                        Back to Dashboard
                    </Button>
                </div>
            </div>
        </div>
    );
}
