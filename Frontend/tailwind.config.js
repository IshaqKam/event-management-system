/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        dim: '#A2A6BB',
        dark: '#1C1C1C',
        white: '#FFFFFF',
        'off-white': '#EFF0F3',
        'dark-purple': '#0A0026',
        'dark-purple-2': '#190159',
        primary: {
          1: '#DC166B',
          2: '#DC1641',
        },
        info: {
          1: '#A2A6BB',
          2: '#A2A6BB',
        },
      },
      backgroundImage: {
        'login-cover': "url('/images/logo/login.png')",
      },
    },
  },
};
