
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'primary-gradient-start': 'rgba(10, 51, 53, 1)',
        'primary-gradient-mid': 'rgba(8, 66, 68, 1)',
        'primary-gradient-end': 'rgba(10, 51, 53, 1)',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(90deg, var(--primary-gradient-start) 0%, var(--primary-gradient-mid) 50%, var(--primary-gradient-end) 100%)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [ require('flowbite/plugin')],
};

