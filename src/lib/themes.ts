
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
            primary: { h: 224, s: 76, l: 48 }, // Rich Blue: #1D4ED8
            accent: { h: 160, s: 64, l: 52 }, // Vibrant Teal: #34D399
        },
    },
    {
        name: 'Aqua Serenity',
        colors: {
            primary: { h: 204, s: 96, l: 40 }, // #0284C7
            accent: { h: 190, s: 81, l: 59 },  // #22D3EE
        },
    },
    {
        name: 'Crimson Tide',
        colors: {
            primary: { h: 0, s: 72, l: 51 }, // #DC2626
            accent: { h: 0, s: 95, l: 81 },  // #FCA5A5
        },
    },
    {
        name: 'Emerald Glow',
        colors: {
            primary: { h: 160, s: 94, l: 25 }, // #047857
            accent: { h: 147, s: 73, l: 67 }, // #6EE7B7
        },
    },
    {
        name: 'Twilight Pulse',
        colors: {
            primary: { h: 259, s: 80, l: 56 }, // #7C3AED
            accent: { h: 249, s: 86, l: 84 },  // #C4B5FD
        },
    },
    {
        name: 'Slate Modern',
        colors: {
            primary: { h: 220, s: 13, l: 52 }, // #374151
            accent: { h: 42, s: 95, l: 57 },  // #FBBF24
        },
    },
    {
        name: 'Coral Dream',
        colors: {
            primary: { h: 326, s: 86, l: 64 }, // #F472B6
            accent: { h: 327, s: 85, l: 87 },  // #FBCFE8
        },
    },
    {
        name: 'Golden Aura',
        colors: {
            primary: { h: 32, s: 93, l: 39 }, // #B45309
            accent: { h: 45, s: 96, l: 65 },  // #FCD34D
        },
    },
    {
        name: 'Sky Bliss',
        colors: {
            primary: { h: 221, s: 83, l: 53 }, // #2563EB
            accent: { h: 208, s: 93, l: 77 },  // #93C5FD
        },
    },
    {
        name: 'Earthy Calm',
        colors: {
            primary: { h: 28, s: 91, l: 30 },  // #92400E
            accent: { h: 249, s: 86, l: 84 },  // #D8B4FE
        },
    },
    {
        name: 'Mint Breeze',
        colors: {
            primary: { h: 174, s: 86, l: 31 }, // #0D9488
            accent: { h: 170, s: 79, l: 69 },  // #5EEAD4
        },
    },
];
