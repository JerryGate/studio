
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
];
