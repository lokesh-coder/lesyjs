const plugin = require("tailwindcss/plugin");
module.exports = {
  purge: ["./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: [
        "DM Sans",
        "system-ui",
        "-apple-system",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
      ],
      mono: ["bsmono", "monospace"],
      icon: ["remixicon"],
    },
    extend: {
      fontSize: {
        tiny: "0.95rem",
      },
      colors: {
        light: "#f9fafb",
        primary: "#d5695f",
        primarylight: "rgba(213,105,94,0.2)",
        secondary: "#596AA8",
        body: "#5D7095",
        window: {
          first: "#FF6058",
          second: "#FFBD2E",
          third: "#29CA41",
        },
        denim: {
          50: "#f5f9fb",
          100: "#e9f5f9",
          200: "#cde7f4",
          300: "#a9d3f0",
          400: "#72b0ea",
          500: "#4287e3",
          600: "#3063d0",
          700: "#2b4dac",
          800: "#253c7e",
          900: "#1f3161",
        },
        royalblue: {
          50: "#f7f9fb",
          100: "#eff3fa",
          200: "#dbe0f7",
          300: "#c4c6f4",
          400: "#a49bf0",
          500: "#7e6eec",
          600: "#5e4cdf",
          700: "#483bbd",
          800: "#372f8d",
          900: "#2c276b",
        },
        orchid: {
          50: "#f8f9fb",
          100: "#f4f2f9",
          200: "#e6ddf4",
          300: "#d9c1f0",
          400: "#c793e9",
          500: "#b166e1",
          600: "#8d44ce",
          700: "#6735a9",
          800: "#4b2a7b",
          900: "#3a235e",
        },
        hotpink: {
          50: "#fbf9fa",
          100: "#faf2f6",
          200: "#f4dbed",
          300: "#f0bbe0",
          400: "#ec88c9",
          500: "#e85bae",
          600: "#d13a89",
          700: "#a02d6a",
          800: "#73244e",
          900: "#561e3d",
        },
        blush: {
          50: "#fbfaf9",
          100: "#fbf3f4",
          200: "#f6dee6",
          300: "#f2c0d1",
          400: "#ef8dab",
          500: "#ec6181",
          600: "#d73e5b",
          700: "#a72f49",
          800: "#78253a",
          900: "#5a1f2f",
        },
        tomato: {
          50: "#fcfaf8",
          100: "#fbf4f0",
          200: "#f7e1db",
          300: "#f4c4ba",
          400: "#f19483",
          500: "#ee6851",
          600: "#da4434",
          700: "#ac332e",
          800: "#7d2829",
          900: "#5f2124",
        },
        coral: {
          50: "#fbfaf7",
          100: "#fbf5ee",
          200: "#f6e5d5",
          300: "#f2cbae",
          400: "#ec9e70",
          500: "#e6733f",
          600: "#ce4e27",
          700: "#9e3b25",
          800: "#722d23",
          900: "#56251f",
        },
        chocolate: {
          50: "#fbfaf8",
          100: "#faf5ee",
          200: "#f5e7d4",
          300: "#efcfac",
          400: "#e7a56e",
          500: "#dd7b3c",
          600: "#bf5525",
          700: "#8e4023",
          800: "#663122",
          900: "#4c271f",
        },
        beaver: {
          50: "#fafaf9",
          100: "#f7f6f2",
          200: "#edeae0",
          300: "#e0d5c6",
          400: "#c8af98",
          500: "#a98767",
          600: "#816145",
          700: "#5e4a3a",
          800: "#453831",
          900: "#352d29",
        },
        steel: {
          50: "#f7fafa",
          100: "#eff6f7",
          200: "#dbe9ee",
          300: "#c0d5e4",
          400: "#90b2d3",
          500: "#5f8abc",
          600: "#5d7095",
          700: "#384f79",
          800: "#2d3d59",
          900: "#243146",
        },
      },
    },
  },
  variants: {
    extend: {
      textColor: [
        "hover",
        "focus",
        "active",
        "group-hover",
        "active",
        "active-hover",
        "important",
      ],
      backgroundColor: ["important"],
      borderColor: ["important"],
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    plugin(function ({ addVariant }) {
      addVariant("important", ({ container }) => {
        container.walkRules(rule => {
          rule.selector = `.\\!${rule.selector.slice(1)}`;
          rule.walkDecls(decl => {
            decl.important = true;
          });
        });
      });
    }),
    plugin(function ({ addVariant, e }) {
      addVariant("active", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.active .${e(`active${separator}${className}`)}`;
        });
      });
    }),
    plugin(function ({ addVariant, e }) {
      addVariant("active-hover", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(
            `active-hover${separator}${className}`
          )}:hover , .active:hover .${e(
            `active-hover${separator}${className}`
          )}`;
        });
      });
    }),
  ],
};
