module.exports = {
  theme: {
    extend: {
      colors: {
        heading: "#242b54",
        violet: "#537adf",
        overlay: "rgba(144, 163, 208, 0.38) !important",
        vio: {
          100: "#7C9AE7",
          200: "#7292E5",
          300: "#688AE3",
          400: "#5D82E1",
          500: "#537ADF",
          600: "#4E73D2",
          700: "#496BC4",
          800: "#4464B7",
          900: "#3F5DA9",
        },
        syntax: {
          code: "#afb7e0",
          cmd: "#9b5194",
          name: "#878fad",
          arg: "#997fa9",
          flag: "#ba8f70",
          bracket: "#d0d1d6",
        },
        console: {
          bg: "#313654",
        },
      },
      borderRadius: {
        xl: "0.75rem",
      },
      cursor: {
        copy: "copy",
      },
    },
    fontFamily: {
      sans: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        '"Noto Sans"',
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      display: ["Gilroy", "sans-serif"],
      mono: ["Roboto Mono", "Inconsolata"],
    },
  },
  variants: {
    backgroundColor: [
      "responsive",
      "hover",
      "focus",
      "highlight",
      "highlight-hover",
    ],
    textColor: [
      "responsive",
      "hover",
      "focus",
      "active",
      "group-hover",
      "highlight",
      "highlight-hover",
    ],
    opacity: [
      "responsive",
      "hover",
      "focus",
      "active",
      "group-hover",
      "highlight",
      "highlight-hover",
    ],
    borderColor: [
      "responsive",
      "hover",
      "focus",
      "focus-within",
      "highlight",
      "highlight-hover",
    ],
    opacity: [
      "responsive",
      "hover",
      "focus",
      "disabled",
      "highlight",
      "highlight-hover",
    ],
    margin: ["responsive", "highlight", "highlight-hover"],
    display: ["responsive", "highlight", "highlight-hover", "parent"],
  },
  plugins: [
    function ({ addVariant, e }) {
      addVariant("parent", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.parent .${e(`parent${separator}${className}`)}`;
        });
      });
    },
    function ({ addVariant, e }) {
      addVariant("highlight", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.highlight .${e(`highlight${separator}${className}`)}`;
        });
      });
    },
    function ({ addVariant, e }) {
      addVariant("highlight-hover", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(
            `highlight-hover${separator}${className}`,
          )}:hover , .highlight:hover .${e(
            `highlight-hover${separator}${className}`,
          )}`;
        });
      });
    },
    function ({ addUtilities }) {
      const rotateUtilities = {
        ".rotate-90": {
          transform: "rotate(90deg)",
        },
      };

      addUtilities(rotateUtilities);
    },
  ],
};
