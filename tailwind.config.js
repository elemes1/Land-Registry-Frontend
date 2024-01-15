/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}',
    'node_modules/preline/dist/*.js',
    './components/**/*.{js,vue,ts}'
  ],
  theme: {
    extend: {}
  },
  plugins: [require('preline/plugin')]
}
