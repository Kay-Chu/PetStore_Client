// tailwind.config.js
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          'fire-bush': {
            '50': '#fef8ec',
            '100': '#faeccb',
            '200': '#f5d692',
            '300': '#f0bc59',
            '400': '#eca12d',
            '500': '#e5831b',
            '600': '#cb6114',
            '700': '#a84415',
            '800': '#893517',
            '900': '#712d16',
            '950': '#411407',
          },
        }
      },
    },
    plugins: [],
  }
  