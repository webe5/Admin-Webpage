import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
    const { user, loading, hasRole } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-slate-50">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles.length > 0 && !hasRole(allowedRoles)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}
