import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1152px",
      },
    },
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Poppins', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary-hue), var(--primary-saturation), var(--primary-lightness))",
          foreground: "hsl(var(--primary-foreground-hue), var(--primary-foreground-saturation), var(--primary-foreground-lightness))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary-hue), var(--secondary-saturation), var(--secondary-lightness))",
          foreground: "hsl(var(--secondary-foreground-hue), var(--secondary-foreground-saturation), var(--secondary-foreground-lightness))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive-hue), var(--destructive-saturation), var(--destructive-lightness))",
          foreground: "hsl(var(--destructive-foreground-hue), var(--destructive-foreground-saturation), var(--destructive-foreground-lightness))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted-hue), var(--muted-saturation), var(--muted-lightness))",
          foreground: "hsl(var(--muted-foreground-hue), var(--muted-foreground-saturation), var(--muted-foreground-lightness))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent-hue), var(--accent-saturation), var(--accent-lightness))",
          foreground: "hsl(var(--accent-foreground-hue), var(--accent-foreground-saturation), var(--accent-foreground-lightness))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover-hue, var(--background-hue)), var(--popover-saturation, var(--background-saturation)), var(--popover-lightness, 100%))",
          foreground: "hsl(var(--popover-foreground-hue, var(--foreground-hue)), var(--popover-foreground-saturation, var(--foreground-saturation)), var(--popover-foreground-lightness, var(--foreground-lightness)))",
        },
        card: {
          DEFAULT: "hsl(var(--card-hue, var(--background-hue)), var(--card-saturation, var(--background-saturation)), 100%)",
          foreground: "hsl(var(--card-foreground-hue, var(--foreground-hue)), var(--card-foreground-saturation, var(--foreground-saturation)), var(--card-foreground-lightness, var(--foreground-lightness)))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pulse-red": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(239, 68, 68, 0.7)" },
          "70%": { boxShadow: "0 0 0 12px rgba(239, 68, 68, 0)" },
        },
         "pulse": {
          "0%, 100%": {
            transform: "scale(1)",
            boxShadow: "0 0 0 0 hsl(var(--primary-hue), var(--primary-saturation), var(--primary-lightness), 0.7)"
          },
          "70%": {
            transform: "scale(1)",
            boxShadow: "0 0 0 10px hsl(var(--primary-hue), var(--primary-saturation), var(--primary-lightness), 0)"
          },
        },
        "border-spin": {
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-in-out",
        "pulse-red": "pulse-red 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse": "pulse 2s infinite",
        "border-spin": 'border-spin 4s linear infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
