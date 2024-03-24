/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./templates/**/*.html', './static/**/*.js', './src/**/*.{js,jsx,ts,tsx}'], // Adjust the paths to match where your templates and scripts live
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}

