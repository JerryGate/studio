
'use client';

import { useTheme } from '@/contexts/theme-context';
import { THEMES } from '@/lib/themes';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { cn } from '@/lib/utils';
import { CheckCircle, Palette } from 'lucide-react';
import * as React from 'react';
import { Label } from '../ui/label';
import { useToast } from '@/hooks/use-toast';
import { ColorResult, SketchPicker } from 'react-color';
import { motion } from 'framer-motion';

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
  return `#${f(0)}${f(8)}$f(4)}`;
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

export default function ThemeSettings() {
    const { theme, setTheme, setCustomColor, customColors } = useTheme();
    const { toast } = useToast();
    
    const handleThemeSelect = (themeName: string) => {
        setTheme(themeName);
        toast({
            title: 'Theme Updated!',
            description: `The "${themeName}" theme has been applied.`
        });
    }

    const handleCustomColorChange = (colorType: 'primary' | 'accent', color: ColorResult) => {
      setCustomColor(colorType, color.hsl);
      toast({
        title: 'Custom Color Updated',
        description: `Your custom ${colorType} color has been applied.`,
      });
    };

    const getHslString = (hslObj: {h: number, s: number, l: number}) => {
        return `hsl(${Math.round(hslObj.h)}, ${Math.round(hslObj.s * 100)}%, ${Math.round(hslObj.l * 100)}%)`;
    }
    
    // Create unique lists of preset colors
    const uniquePrimaryPresets = Array.from(new Set(THEMES.map(t => hslToHex(t.colors.primary.h, t.colors.primary.s, t.colors.primary.l))));
    const uniqueAccentPresets = Array.from(new Set(THEMES.map(t => hslToHex(t.colors.accent.h, t.colors.accent.s, t.colors.accent.l))));

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Predefined Themes</CardTitle>
                    <CardDescription>Select a theme to instantly change the look and feel of the entire website.</CardDescription>
                </CardHeader>
                <CardContent>
                    <motion.div 
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {THEMES.map((t) => (
                            <motion.div key={t.name} variants={itemVariants}>
                                <button onClick={() => handleThemeSelect(t.name.toLowerCase())} className="w-full text-left">
                                    <Card className={cn("cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1", theme.name === t.name && "ring-2 ring-primary")}>
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <CardTitle className="text-base">{t.name}</CardTitle>
                                                {theme.name === t.name && <CheckCircle className="h-5 w-5 text-primary shrink-0" />}
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex gap-2">
                                                <div className="h-8 w-8 rounded-full border" style={{ backgroundColor: getHslString(t.colors.primary)}} />
                                                <div className="h-8 w-8 rounded-full border" style={{ backgroundColor: getHslString(t.colors.accent)}} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </button>
                            </motion.div>
                        ))}
                    </motion.div>
                </CardContent>
            </Card>
            
            <Card>
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Palette />
                        Custom Theme
                    </CardTitle>
                    <CardDescription>
                        Create your own theme by picking custom colors. Your custom theme will be applied automatically when you select a color.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <Label className="font-semibold text-lg">Primary Color</Label>
                        <SketchPicker
                            color={hslToHex(customColors.primary.h, customColors.primary.s, customColors.primary.l)}
                            onChangeComplete={(color) => handleCustomColorChange('primary', color)}
                            presetColors={uniquePrimaryPresets}
                        />
                    </div>
                     <div className="space-y-4">
                        <Label className="font-semibold text-lg">Accent Color</Label>
                         <SketchPicker
                            color={hslToHex(customColors.accent.h, customColors.accent.s, customColors.accent.l)}
                            onChangeComplete={(color) => handleCustomColorChange('accent', color)}
                            presetColors={uniqueAccentPresets}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
