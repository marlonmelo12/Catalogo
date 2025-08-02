/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#121212', 
        surface: '#1E1E1E',   
        primary: '#3B82F6',   
        'primary-hover': '#2563EB',
        secondary: '#EF4444', 
        'secondary-hover': '#DC2626',
        accent: '#F59E0B',    
        'accent-hover': '#D97706',
        'text-main': '#E5E7EB',       
        'text-secondary': '#9CA3AF', 
      },
    },
  },
  plugins: [],
}