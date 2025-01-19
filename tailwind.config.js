/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 2s linear infinite',
        'spin-fast': 'spin 1s linear infinite',
        'fade-in': 'fadeIn 1.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      colors: {
        primary: "#8437c7",
        secondary: {
          100: "#8437c8",
          200: "#888883",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // background: "var(--background)", // Define a background color if it's not predefined
        // foreground: "var(--foreground)", // Optional, for consistency
      },
    },

  },
  plugins: [],
  darkMode: ["class", "class"],
};
