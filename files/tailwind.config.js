module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  //presets: [require("./preset-app")],
  purge: ["./public/**/*.html"],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
  experimental: {
    applyComplexClasses: true,
  },
};
