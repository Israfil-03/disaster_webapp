export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#0ea5e9', // sky-500
        dark: '#0f172a', // slate-900
        darker: '#020617', // slate-950
        surface: '#1e293b', // slate-800
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
