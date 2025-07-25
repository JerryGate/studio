
'use client';

import ThemeSettings from "@/components/admin/theme-settings";

export default function ThemeSettingsPage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold text-primary mb-6">Theme Settings</h1>
            <ThemeSettings />
        </div>
    );
}
