import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        'fade-in': {
            '0%': { opacity: '0' },
          '100%': { opacity: '1'},
        },
        'side-to-side': {
  
          '33%': {transform: 'translateX(4px)'},
          '100%': {transform: '-translateX(4px)'},
          
        },
      },
      animation: {
        'fade-in': 'fade-in ease-in 2s',
        'side-to-side': 'side-to-side ease-in-out 2s infinite'
      },
    },
  },
  plugins: [],
  

  // corePlugins: {
  //   preflight: false,
  // }
  
};
export default config;
