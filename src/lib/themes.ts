
export interface HSLColor {
    h: number;
    s: number;
    l: number;
}

export interface Theme {
    name: string;
    colors: {
        primary: HSLColor;
        accent: HSLColor;
    };
}

export const THEMES: Theme[] = [
    {
        name: 'Default',
        colors: {
            primary: { h: 217, s: 91, l: 60 }, // Soft Blue #3B82F6
            accent: { h: 158, s: 82, l: 42 }, // Emerald Green #10B981
        },
    },
    {
        name: 'Coastal Calm',
        colors: {
            primary: { h: 210, s: 100, l: 39 }, // #1E90FF
            accent: { h: 180, s: 100, l: 40 },  // #00CED1
        },
    },
    {
        name: 'Warm Sunset',
        colors: {
            primary: { h: 27, s: 82, l: 53 }, // Orange
            accent: { h: 0, s: 100, l: 71 },  // #FF6B6B
        },
    },
    {
        name: 'Lush Forest',
        colors: {
            primary: { h: 158, s: 82, l: 21 }, // #065F46
            accent: { h: 99, s: 57, l: 55 }, // Lime Green #84CC16
        },
    },
    {
        name: 'Night Pulse',
        colors: {
            primary: { h: 273, s: 66, l: 36 }, // #6B21A8
            accent: { h: 276, s: 94, l: 87 }, // #D8B4FE
        },
    },
    {
        name: 'Urban Slate',
        colors: {
            primary: { h: 215, s: 15, l: 34 }, // #4B5563
            accent: { h: 39, s: 92, l: 58 },  // #F59E0B
        },
    },
    {
        name: 'Coral Breeze',
        colors: {
            primary: { h: 0, s: 84, l: 60 }, // #EF4444
            accent: { h: 180, s: 100, l: 40 }, // #00CED1
        },
    },
    {
        name: 'Golden Serenity',
        colors: {
            primary: { h: 33, s: 93, l: 43 }, // #D97706
            accent: { h: 45, s: 96, l: 65 },  // #FCD34D
        },
    },
    {
        name: 'Sky Haven',
        colors: {
            primary: { h: 217, s: 91, l: 60 }, // #3B82F6
            accent: { h: 208, s: 93, l: 77 },  // #93C5FD
        },
    },
    {
        name: 'Earthy Harmony',
        colors: {
            primary: { h: 27, s: 34, l: 36 },  // #7F5539
            accent: { h: 32, s: 37, l: 74 },  // #D9C2A6
        },
    },
    {
        name: 'Mint Fresh',
        colors: {
            primary: { h: 173, s: 82, l: 40 }, // #14B8A6
            accent: { h: 170, s: 79, l: 69 },  // #5EEAD4
        },
    },
];
