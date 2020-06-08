let address = null;
const interfaces = require("os").networkInterfaces();

export const getLocalIPAddress = () => {
  for (const dev in interfaces) {
    interfaces[dev].filter(details =>
      details.family === "IPv4" && details.internal === false
        ? (address = details.address)
        : undefined,
    );
  }

  return address;
};
