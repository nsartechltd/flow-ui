/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    colors: {
      red: '#b91c1c',
      flowblue: '#0284c7'
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
}