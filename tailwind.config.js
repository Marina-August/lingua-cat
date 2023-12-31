/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        merry:['Merriweather', 'serif'],
        philosopher:['Philosopher', 'sans-serif'],
        merrySans:['Merriweather Sans', 'sans-serif' ],
        dog:['Underdog', 'cursive'],
        baby:['Oooh Baby', 'cursive']
      },
      colors: {
        'primary-orange': '#FF5722',
      }
    },
  },
  plugins: [],

}

