import React from "react";

const ThemeSwitch = ({ children, name = "app", prefix = "" }) => {
  const handler = () => window.__toggleTheme(name, prefix);
  const Icon = ({ className }) => (
    <i className={`theme-icon text-2xl ${name} ${className}`} />
  );
  return children(handler, Icon);
};

export default ThemeSwitch;
