/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
      },
    },
  },
  darkMode: 'selector',
  plugins: [() => import('tailwindcss-primeui')],
  corePlugins: {
    preflight: false
  }
}

