const colors = require('./src/components/ui/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins'],
        'poppins-thin': ['Poppins-Thin'],
        'poppins-extralight': ['Poppins-ExtraLight'],
        'poppins-light': ['Poppins-Light'],
        'poppins-medium': ['Poppins-Medium'],
        'poppins-semibold': ['Poppins-SemiBold'],
        'poppins-bold': ['Poppins-Bold'],
        'poppins-extrabold': ['Poppins-ExtraBold'],
        'poppins-black': ['Poppins-Black'],
      },
      colors,
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.font-poppins-thin': { fontWeight: '100' },
        '.font-poppins-extralight': { fontWeight: '200' },
        '.font-poppins-light': { fontWeight: '300' },
        '.font-poppins': { fontWeight: '400' },
        '.font-poppins-medium': { fontWeight: '500' },
        '.font-poppins-semibold': { fontWeight: '600' },
        '.font-poppins-bold': { fontWeight: '700' },
        '.font-poppins-extrabold': { fontWeight: '800' },
        '.font-poppins-black': { fontWeight: '900' },
      };
      addUtilities(newUtilities);
    },
  ],
};
