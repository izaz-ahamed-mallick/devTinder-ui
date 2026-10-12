/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#A78BFA",
          secondary: "#8B8CF8",
          accent: "#C4B5FD",
        },
        app: {
          background: "#101114",
          surface: "#17181D",
          elevated: "#24262E",
        },
      },
    },
  },
  plugins: [daisyui],
daisyui: {
  themes: [
    {
      devtinder: {
        "color-scheme": "dark",
        "primary": "#A78BFA",
        "primary-content": "#100B20",
        "secondary": "#8B8CF8",
        "accent": "#C4B5FD",
        "neutral": "#292A32",
        "base-100": "#101114",
        "base-200": "#17181D",
        "base-300": "#24262E",
        "base-content": "#F4F4F5",
        "info": "#7DD3FC",
        "success": "#86EFAC",
        "warning": "#FCD34D",
        "error": "#FCA5A5",
      },
    },
  ],
},
};
