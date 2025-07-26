
export interface Theme {
    name: string;
    colors: {
        primary: string; // HSL format "H S% L%"
        accent: string;  // HSL format "H S% L%"
    };
}

export const THEMES: Theme[] = [
    {
        name: 'Default',
        colors: {
            primary: '221 65% 32%', // Deep Blue
            accent: '142 60% 45%', // Vibrant Green
        },
    },
    {
        name: 'Ocean Breeze',
        colors: {
            primary: '210 33% 32%', // Navy Blue
            accent: '177 47% 48%', // Teal
        },
    },
    {
        name: 'Sunset Glow',
        colors: {
            primary: '27 82% 53%', // Orange
            accent: '339 90% 86%', // Pink
        },
    },
    {
        name: 'Forest Green',
        colors: {
            primary: '158 45% 28%', // Dark Green
            accent: '78 68% 82%', // Beige
        },
    },
    {
        name: 'Midnight Sky',
        colors: {
            primary: '260 67% 35%', // Dark Purple
            accent: '210 17% 82%', // Silver
        },
    },
    {
        name: 'Urban Chic',
        colors: {
            primary: '210 15% 23%', // Charcoal
            accent: '42 69% 51%', // Mustard
        },
    },
    {
        name: 'Coral Reef',
        colors: {
            primary: '0 89% 65%', // Coral
            accent: '175 58% 53%', // Turquoise
        },
    },
    {
        name: 'Golden Hour',
        colors: {
            primary: '38 74% 43%', // Gold
            accent: '0 54% 33%', // Maroon
        },
    },
    {
        name: 'Serenity',
        colors: {
            primary: '207 72% 57%', // Soft Blue
            accent: '260 78% 77%', // Lavender
        },
    },
    {
        name: 'Earth Tones',
        colors: {
            primary: '25 76% 28%', // Brown
            accent: '91 16% 60%', // Sage
        },
    },
];
