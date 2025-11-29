import React from 'react';

export default function PlaceholderPage({ title }) {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">🚧</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
            <p className="text-slate-500 mt-2 max-w-md">
                This module is currently under development. Check back soon for updates.
            </p>
        </div>
    );
}
