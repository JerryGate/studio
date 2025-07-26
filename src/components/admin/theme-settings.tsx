
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/theme-context';
import { CheckCircle, Palette } from 'lucide-react';
import { themes } from '@/lib/themes';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '../theme-toggle';

export default function ThemeSettings() {
    const { theme, setTheme, resetTheme } = useTheme();

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Palette className="h-6 w-6 text-primary" />
                        <CardTitle>Theme Settings</CardTitle>
                    </div>
                    <ThemeToggle />
                </div>
                <CardDescription>
                    Choose a predefined color scheme. Changes apply globally in both light and dark modes.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                   {themes.map((t) => (
                       <div key={t.name} className="space-y-2">
                           <h3 className="text-sm font-semibold text-center">{t.label}</h3>
                           <button 
                                onClick={() => setTheme(t)}
                                className={cn(
                                    "w-full h-20 rounded-lg border-2 p-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 relative",
                                    theme.name === t.name ? 'border-primary' : 'border-border'
                                )}
                            >
                                <div className="flex h-full w-full rounded-md overflow-hidden">
                                    <div style={{ backgroundColor: `hsl(${t.colors.primary})` }} className="h-full w-1/2"></div>
                                    <div style={{ backgroundColor: `hsl(${t.colors.accent})` }} className="h-full w-1/4"></div>
                                    <div style={{ backgroundColor: `hsl(${t.colors.background})` }} className="h-full w-1/4 border-l border-border"></div>
                                </div>
                                 {theme.name === t.name && (
                                    <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                                        <CheckCircle className="h-8 w-8 text-primary" />
                                    </div>
                                )}
                            </button>
                       </div>
                   ))}
                </div>

                 <div className="flex gap-4 pt-4 border-t">
                    <Button size="sm" variant="outline" onClick={resetTheme}>Reset to Default</Button>
                </div>
            </CardContent>
        </Card>
    );
}
