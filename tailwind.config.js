/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        fill: {
          '0%': { 'background-position': '100%' },
          '50%': { 'background-position': '0' },
          '100%': { 'background-position': '0' },
        },
      },
      animation: {
        fill: 'fill 3s infinite',
      },
      transitionDelay: {
        0.2: '0.2s',
        2: '2s',
      },
      fontSize: {
        xxs: '0.6rem',
      },
      fontWeight: {
        600: 600,
        400: 400,
        800: 800,
        500: 500,
        700: 700,
      },
      colors: {
        disableButon: '#4dcaf0',
        primaryBlue: '#04BDF5',
        bgColorDark: '#212121',
        secondBlue: '#00509B',
        darkGray: '#6A6A6A',
        white: '#FFFFFF',
        grayTag: '#A0A0A0',
        blackPrimary: '#212121',
        grayWhite: '#F6F6F6',
        fondoFooter: '#151515',
        fondoInput: '#DFDFDF',
      },

      backgroundOpacity: (theme) => theme('opacity'),
      fontFamily: {
        poppins: "'Poppins', sans-serif",
        inter: "'Inter', sans-serif",
      },
      borderRadius: {
        22: '22px',
        44: '44px',
        8: '8px',
        4: '4px',
      },
    },
  },
  plugins: [],
}
