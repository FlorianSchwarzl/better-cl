const methodToColorMap = {
    log: "white",
    warn: "yellow",
    error: "red",
    info: "blue",
    debug: "magenta",
    success: "green"
};

const bold = "\u001b[1m";
const reset = "\u001b[0m";

const text = {
    black: "\u001b[30m",
    brightBlack: "\u001b[30;1m",
    red: "\u001b[31m",
    brightRed: "\u001b[31;1m",
    green: "\u001b[32m",
    brightGreen: "\u001b[32;1m",
    yellow: "\u001b[33m",
    brightYellow: "\u001b[33;1m",
    blue: "\u001b[34m",
    brightBlue: "\u001b[34;1m",
    magenta: "\u001b[35m",
    brightMagenta: "\u001b[35;1m",
    cyan: "\u001b[36m",
    brightCyan: "\u001b[36;1m",
    white: "\u001b[37m",
    brightWhite: "\u001b[37;1m",
};

const background = {
    black: "\u001b[40m",
    brightBlack: "\u001b[40;1m",
    red: "\u001b[41m",
    brightRed: "\u001b[41;1m",
    green: "\u001b[42m",
    brightGreen: "\u001b[42;1m",
    yellow: "\u001b[43m",
    brightYellow: "\u001b[43;1m",
    blue: "\u001b[44m",
    brightBlue: "\u001b[44;1m",
    magenta: "\u001b[45m",
    brightMagenta: "\u001b[45;1m",
    cyan: "\u001b[46m",
    brightCyan: "\u001b[46;1m",
    white: "\u001b[47m",
    brightWhite: "\u001b[47;1m",
};

module.exports = {
    bold,
    reset,
    text,
    background,
    methodToColorMap
}