
export interface Theme {
  name: string;
  label: string;
  colors: {
    primary: string;
    accent: string;
    background: string;
  };
}

export const themes: Theme[] = [
  {
    name: 'default',
    label: 'Default',
    colors: {
        primary: '221 83% 53%', // Blue
        accent: '142 76% 36%',  // Green
        background: '240 10% 99%',
    },
  },
  {
    name: 'teal',
    label: 'Teal',
    colors: {
      primary: '174 76% 42%', // Teal
      accent: '204 90% 54%', // Light Blue
      background: '180 15% 98%',
    },
  },
  {
    name: 'rose',
    label: 'Rose',
    colors: {
      primary: '347 84% 61%', // Rose
      accent: '257 69% 67%', // Lavender
      background: '350 100% 99%',
    },
  },
  {
    name: 'indigo',
    label: 'Indigo',
    colors: {
      primary: '245 83% 60%', // Indigo
      accent: '29 93% 65%', // Orange
      background: '240 10% 99%',
    },
  },
   {
    name: 'emerald',
    label: 'Emerald',
    colors: {
      primary: '158 64% 52%', // Emerald Green
      accent: '45 93% 59%',  // Amber
      background: '160 10% 98%',
    },
  },
  {
    name: 'crimson',
    label: 'Crimson',
    colors: {
      primary: '350 78% 54%', // Crimson Red
      accent: '220 13% 69%', // Slate
      background: '0 0% 99%',
    },
  },
  {
    name: 'amethyst',
    label: 'Amethyst',
    colors: {
      primary: '270 60% 55%', // Purple
      accent: '50 95% 60%', // Yellow
      background: '270 20% 99%',
    },
  },
  {
    name: 'ocean',
    label: 'Ocean',
    colors: {
      primary: '210 80% 50%', // Deep Blue
      accent: '180 70% 45%', // Cyan
      background: '210 30% 98%',
    },
  },
  {
    name: 'sunset',
    label: 'Sunset',
    colors: {
      primary: '25 90% 55%', // Orange
      accent: '330 85% 65%', // Pink
      background: '30 100% 98%',
    },
  },
  {
    name: 'forest',
    label: 'Forest',
    colors: {
      primary: '120 40% 30%', // Dark Green
      accent: '90 30% 55%', // Light Green
      background: '120 10% 98%',
    },
  },
  {
    name: 'slate',
    label: 'Slate',
    colors: {
      primary: '220 20% 35%', // Dark Slate Blue
      accent: '220 15% 65%', // Lighter Slate
      background: '220 10% 99%',
    },
  },
];
