'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/theme-context';
import { Paintbrush } from 'lucide-react';
import { SketchPicker } from 'react-color';
import { useState } from 'react';

const colorToHslString = (color: { h: number, s: number, l: number }) => {
    return `${Math.round(color.h)}, ${Math.round(color.s * 100)}%, ${Math.round(color.l * 100)}%`;
}

const hslStringToObject = (hsl: string) => {
    const [h, s, l] = hsl.split(',').map(val => parseFloat(val.replace('%', '')));
    return { h, s: s / 100, l: l / 100, a: 1 };
}

export default function ThemeSettingsPage() {
    const { theme, setTheme, resetTheme } = useTheme();
    
    // Local state for color pickers to avoid performance issues on drag
    const [primaryColor, setPrimaryColor] = useState(hslStringToObject(theme.primary));
    const [accentColor, setAccentColor] = useState(hslStringToObject(theme.accent));
    const [backgroundColor, setBackgroundColor] = useState(hslStringToObject(theme.background));

    const handleSave = () => {
        setTheme({
            primary: colorToHslString(primaryColor),
            accent: colorToHslString(accentColor),
            background: colorToHslString(backgroundColor),
        });
    };

    return (
        <div>
            <div className="flex items-center gap-2 mb-6">
                <Paintbrush className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold text-primary">Theme Settings</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Customize Website Colors</CardTitle>
                    <CardDescription>
                        Select your desired colors for the website theme. Changes will be applied globally.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Primary Color */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Primary Color</h3>
                            <SketchPicker 
                                color={primaryColor}
                                onChange={(color) => setPrimaryColor(color.hsl)}
                            />
                        </div>

                        {/* Accent Color */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Accent Color</h3>
                            <SketchPicker 
                                color={accentColor}
                                onChange={(color) => setAccentColor(color.hsl)}
                            />
                        </div>

                        {/* Background Color */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Background Color</h3>
                             <SketchPicker 
                                color={backgroundColor}
                                onChange={(color) => setBackgroundColor(color.hsl)}
                            />
                        </div>
                    </div>

                     <div className="flex gap-4 pt-4 border-t">
                        <Button size="lg" onClick={handleSave}>Save Changes</Button>
                        <Button size="lg" variant="outline" onClick={resetTheme}>Reset to Default</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
