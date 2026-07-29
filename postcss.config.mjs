/** PostCSS config — compiles Tailwind v4 at build time (replaces the previously
 *  committed, hand-generated src/index.css snapshot). */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
