export default {
  name: "colors",
  description: "Display all ansi colors in console",
  group: "Demo",
  run: ({ utils }) => {
    console.log("colors");
    const c = utils.color();
    let colors = `${c.black("black")}\n`;
    colors += `${c.red("red")}\n`;
    colors += `${c.green("green")}\n`;
    colors += `${c.yellow("yellow")}\n`;
    colors += `${c.blue("blue")}\n`;
    colors += `${c.magenta("magenta")}\n`;
    colors += `${c.cyan("cyan")}\n`;
    colors += `${c.white("white")}\n\n`;
    colors += `${c.gray("gray")}\n`;
    colors += `${c.grey("grey")}\n`;
    colors += `${c.blackBright("blackBright")}\n`;
    colors += `${c.redBright("redBright")}\n`;
    colors += `${c.greenBright("greenBright")}\n`;
    colors += `${c.yellowBright("yellowBright")}\n`;
    colors += `${c.blueBright("blueBright")}\n`;
    colors += `${c.magentaBright("magentaBright")}\n`;
    colors += `${c.cyanBright("cyanBright")}\n`;
    colors += `${c.whiteBright("whiteBright")}\n\n`;

    colors += `${c.bgBlack("bgBlack")}\n`;
    colors += `${c.bgRed("bgRed")}\n`;
    colors += `${c.bgGreen("bgGreen")}\n`;
    colors += `${c.bgYellow("bgYellow")}\n`;
    colors += `${c.bgBlue("bgBlue")}\n`;
    colors += `${c.bgMagenta("bgMagenta")}\n`;
    colors += `${c.bgCyan("bgCyan")}\n`;
    colors += `${c.bgWhite("bgWhite")}\n`;
    colors += `${c.bgBlackBright("bgBlackBright")}\n`;
    colors += `${c.bgRedBright("bgRedBright")}\n`;
    colors += `${c.bgGreenBright("bgGreenBright")}\n`;
    colors += `${c.bgYellowBright("bgYellowBright")}\n`;
    colors += `${c.bgBlueBright("bgBlueBright")}\n`;
    colors += `${c.bgMagentaBright("bgMagentaBright")}\n`;
    colors += `${c.bgCyanBright("bgCyanBright")}\n`;
    colors += `${c.bgWhiteBright("bgWhiteBright")}\n\n`;

    colors += `${c.bold.cyan("cyan bold")}\n`;
    colors += `${c.dim.cyan("cyan dim")}\n`;
    colors += `${c.italic.cyan("cyan italic")}\n`;
    colors += `${c.underline.cyan("cyan underline")}\n`;
    colors += `${c.inverse.cyan("cyan inverse")}\n`;
    colors += `${c.hidden.cyan("cyan hidden")}\n`;
    colors += `${c.strikethrough.cyan("cyan strikethrough")}\n`;
    colors += `${c.visible.cyan("cyan visible")}\n`;
    console.log(colors);
  },
};
