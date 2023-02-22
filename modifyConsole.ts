import { deepClone, merge } from "sussy-util";
import { reset, text } from "./maps";
import defaults from "./defaults";
import Log from "./log";
import compile from "./compile";

export default (con = console, levels: Levels = {}, path: string | undefined = undefined, timestamp = true, label = true) => {
    let mergedLevels: Levels = defaults;
    Object.keys(levels).forEach(e => {
        mergedLevels[e] = merge(mergedLevels[e], levels[e]);
    });

    let legacyLevelFormat: LegacyLevelFormat = new Array(Object.keys(mergedLevels).length);
    let i = 0;
    Object.keys(mergedLevels).forEach(e => {
        // legacyLevelFormat[i].name = e;
        // legacyLevelFormat[i].value = mergedLevels[e].value;
        // legacyLevelFormat[i].color = mergedLevels[e].color;
        // legacyLevelFormat[i].notIntoFile = mergedLevels[e].notIntoFile;
        legacyLevelFormat[i] = {
            name: e,
            value: mergedLevels[e].value,
            color: mergedLevels[e].color,
            notIntoFile: mergedLevels[e].notIntoFile
        };
        i++;
    });
    mergedLevels = compile(legacyLevelFormat);

    let logFile: Log | undefined;
    if (path) logFile = new Log(path, 9);

    Object.keys(mergedLevels.value).forEach(e => {
        const element = e as keyof Console;
        // @ts-ignore
        if (!con[element]) con[element] = con.log;
        const element2 = e as keyof Log;
        // @ts-ignore
        if (logFile && !logFile[element2]) logFile[element2] = function (...args: any[]) {
            this.append(e.toLowerCase(), ...args);
        };
    });

    const consoles = deepClone(con);

    require("console-stamp")(consoles, {
        format: `${timestamp ? ":date([HH:MM:ss.l])" : ""}${label && timestamp ? " " : ""}${label ? ":label(9)" : ""}`,
        include: Object.keys(mergedLevels.value),
        levels: mergedLevels.value
    });

    Object.keys(mergedLevels.value).forEach(e => {
        // @ts-ignore
        con[e] = (mergedLevels.notIntoFile[e] || !path) ? (...args) => {
            // @ts-ignore
            consoles[e](text[mergedLevels.color[e]], ...args, reset);
        } : (...args: any[]) => {
            // @ts-ignore
            consoles[e](text[mergedLevels.color[e]], ...args, reset);
            if (logFile)
                // @ts-ignore
                logFile[e](...args);
        }
    });
}

export interface Levels {
    [key: string]: {
        value?: number,
        color?: string,
        notIntoFile?: boolean
    }
}

interface LegacyLevelValue {
    name: string,
    value: number | undefined;
    color: string | undefined;
    notIntoFile: boolean | undefined;
}

export type LegacyLevelFormat = LegacyLevelValue[];