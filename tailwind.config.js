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
        'poppins-thin': ['Poppins-Thin'],
        'poppins-extralight': ['Poppins-ExtraLight'],
        'poppins-light': ['Poppins-Light'],
        'poppins-regular': ['Poppins-Regular'],
        'poppins-medium': ['Poppins-Medium'],
        'poppins-semibold': ['Poppins-SemiBold'],
        'poppins-bold': ['Poppins-Bold'],
        'poppins-extrabold': ['Poppins-ExtraBold'],
        'poppins-black': ['Poppins-Black'],
      },
      colors,
    },
  },
};
