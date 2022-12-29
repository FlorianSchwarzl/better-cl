const { deepClone, merge } = require("sussyutilbyraphaelbader");
const { reset, text } = require("./maps.js");
const defaults = require("./defaults");
const Log = require("./log.js");
const compile = require("./compile.js");

module.exports = (con = console, levels = [], path = undefined, timestamp = true, label = true) => {
    levels = compile(levels);
    levels.value = merge(defaults.value, levels.value);
    levels.color = merge(defaults.color, levels.color);
    levels.notIntoFile = merge(defaults.notIntoFile, levels.notIntoFile);
    const logFile = new Log(path, 9);

    Object.keys(levels.value).forEach(e => {
        if (!con[e]) con[e] = con.log;
        if (!logFile[e]) logFile[e] = function (...args) {
            this.append(e.toLowerCase(), ...args);
        };
    });

    const consoles = deepClone(con);

    require("console-stamp")(consoles, {
        format: `${timestamp ? ":date([HH:MM:ss.l])" : ""}${label && timestamp ? " " : ""}${label ? ":label(9)" : ""}`,
        include: Object.keys(levels.value),
        levels: levels.value
    });

    Object.keys(levels.value).forEach(e => {
        con[e] = (levels.notIntoFile[e] || !path) ? (...args) => {
            consoles[e](text[levels.color[e]], ...args, reset);
        } : (...args) => {
            consoles[e](text[levels.color[e]], ...args, reset);
            logFile[e](...args);
        }
    });
}