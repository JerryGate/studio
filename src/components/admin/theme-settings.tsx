
'use client';

import { useTheme } from '@/contexts/theme-context';
import { THEMES } from '@/lib/themes';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { cn } from '@/lib/utils';
import { CheckCircle, Palette } from 'lucide-react';
import * as React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useToast } from '@/hooks/use-toast';
import { ColorResult, SketchPicker } from 'react-color';

const hslToHex = (h: number, s: number, l: number): string => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

export default function ThemeSettings() {
    const { theme, setTheme, setCustomColor, customColors } = useTheme();
    const { toast } = useToast();
    
    const handleCustomColorChange = (colorType: 'primary' | 'accent', color: ColorResult) => {
      setCustomColor(colorType, color.hsl);
      setTheme('custom');
    };

    const handleSaveCustom = () => {
        toast({
            title: 'Custom Theme Saved',
            description: 'Your custom color selections have been applied.'
        });
    }

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Predefined Themes</CardTitle>
                    <CardDescription>Select a theme to instantly change the look and feel of the entire website.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {THEMES.map((t) => (
                         <button key={t.name} onClick={() => setTheme(t.name.toLowerCase())}>
                            <Card className={cn("cursor-pointer hover:shadow-lg transition-shadow", theme.name === t.name && "ring-2 ring-primary")}>
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-base">{t.name}</CardTitle>
                                        {theme.name === t.name && <CheckCircle className="h-5 w-5 text-primary" />}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex gap-2">
                                        <div className="h-8 w-8 rounded-full" style={{ backgroundColor: `hsl(${t.colors.primary})`}} />
                                        <div className="h-8 w-8 rounded-full" style={{ backgroundColor: `hsl(${t.colors.accent})`}} />
                                    </div>
                                </CardContent>
                            </Card>
                         </button>
                    ))}
                </CardContent>
            </Card>
            
            <Card>
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Palette />
                        Custom Theme
                    </CardTitle>
                    <CardDescription>
                        Create your own theme by picking custom colors. Your custom theme will be applied automatically.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <Label>Primary Color</Label>
                        <SketchPicker
                            color={hslToHex(customColors.primary.h, customColors.primary.s, customColors.primary.l)}
                            onChange={(color) => handleCustomColorChange('primary', color)}
                            presetColors={THEMES.map(t => hslToHex(
                                parseInt(t.colors.primary.split(' ')[0]),
                                parseInt(t.colors.primary.split(' ')[1].replace('%','')),
                                parseInt(t.colors.primary.split(' ')[2].replace('%',''))
                            ))}
                        />
                    </div>
                     <div className="space-y-4">
                        <Label>Accent Color</Label>
                         <SketchPicker
                            color={hslToHex(customColors.accent.h, customColors.accent.s, customColors.accent.l)}
                            onChange={(color) => handleCustomColorChange('accent', color)}
                            presetColors={THEMES.map(t => hslToHex(
                                parseInt(t.colors.accent.split(' ')[0]),
                                parseInt(t.colors.accent.split(' ')[1].replace('%','')),
                                parseInt(t.colors.accent.split(' ')[2].replace('%',''))
                            ))}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
