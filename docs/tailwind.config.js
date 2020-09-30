module.exports = {
  theme: {
    fontFamily: {
      sans: [
        " -apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Inter",
        "system-ui",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
    },
    extend: {
      colors: {
        window: {
          first: "#FF6058",
          second: "#FFBD2E",
          third: "#29CA41",
        },
        dark: {
          100: "#3D4961",
          200: "#4A5874",
          300: "#5B6985",
          400: "#4A5874",
        },
        light: "#f9fafb",
        primary: "#d5695f",
        secondary: "#596AA8",
        body: "#5D7095",
        heading: "#222A57",
        subheading: "#585C75",
        subtext: "#A4B6D1",
      },
      fontFamily: {
        heading: ["Gilroy"],
        icon: ["remixicon"],
      },
    },
  },
  purge: ["./src/**/*.js", "./src/**/*.jsx"],
  variants: {
    textColor: [
      "hover",
      "focus",
      "active",
      "group-hover",
      "active",
      "active-hover",
    ],
  },
  plugins: [
    function ({ addVariant, e }) {
      addVariant("active", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.active .${e(`active${separator}${className}`)}`;
        });
      });
    },
    function ({ addVariant, e }) {
      addVariant("active-hover", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(
            `active-hover${separator}${className}`,
          )}:hover , .active:hover .${e(
            `active-hover${separator}${className}`,
          )}`;
        });
      });
    },
  ],
};
