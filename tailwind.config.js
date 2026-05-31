/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        coral: '#FF6B35',
        'coral-light': '#FFF0EB',
        'duo-green': '#58CC02',
        'duo-green-light': '#E8F9ED',
        'forest': '#1A3320',
        'forest-mid': '#2D7A3A',
        yellow: '#FFD23F',
        'yellow-light': '#FFFBDE',
        lime: '#56C271',
        'lime-light': '#E8F9ED',
        purple: '#7B5EA7',
        'purple-light': '#F0EBFF',
        pink: '#FF6B9D',
        'pink-light': '#FFF0F6',
        sky: '#38BDF8',
        'sky-light': '#E0F6FF',
        cream: '#FFFBF5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
