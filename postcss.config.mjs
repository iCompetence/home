/** PostCSS config — compiles Tailwind v4 at build time for the redesign
 *  (src/styles/globals.css); the live pages keep the committed
 *  src/index.css snapshot. */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
