
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
            primary: '217 91% 60%', // Soft Blue #3B82F6
            accent: '158 82% 42%', // Emerald Green #10B981
        },
    },
    {
        name: 'Coastal Calm',
        colors: {
            primary: '210 100% 39%', // #1E90FF
            accent: '180 100% 40%',  // #00CED1
        },
    },
    {
        name: 'Warm Sunset',
        colors: {
            primary: '27 82% 53%', // Orange
            accent: '0 100% 71%',  // #FF6B6B
        },
    },
    {
        name: 'Lush Forest',
        colors: {
            primary: '158 82% 21%', // #065F46
            accent: '99 57% 55%', // Lime Green #84CC16
        },
    },
    {
        name: 'Night Pulse',
        colors: {
            primary: '273 66% 36%', // #6B21A8
            accent: '276 94% 87%', // #D8B4FE
        },
    },
    {
        name: 'Urban Slate',
        colors: {
            primary: '215 15% 34%', // #4B5563
            accent: '39 92% 58%',  // #F59E0B
        },
    },
    {
        name: 'Coral Breeze',
        colors: {
            primary: '0 84% 60%', // #EF4444
            accent: '180 100% 40%', // #00CED1
        },
    },
    {
        name: 'Golden Serenity',
        colors: {
            primary: '33 93% 43%', // #D97706
            accent: '45 96% 65%',  // #FCD34D
        },
    },
    {
        name: 'Sky Haven',
        colors: {
            primary: '217 91% 60%', // #3B82F6
            accent: '208 93% 77%',  // #93C5FD
        },
    },
    {
        name: 'Earthy Harmony',
        colors: {
            primary: '27 34% 36%',  // #7F5539
            accent: '32 37% 74%',  // #D9C2A6
        },
    },
    {
        name: 'Mint Fresh',
        colors: {
            primary: '173 82% 40%', // #14B8A6
            accent: '170 79% 69%',  // #5EEAD4
        },
    },
];
