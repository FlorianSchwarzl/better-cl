import { LegacyLevelFormat } from "./modifyConsole";

export default (args: LegacyLevelFormat) => {
    const values: { [key: string]: number | undefined } = {};
    const color: { [key: string]: string | undefined } = {};
    const notIntoFile: { [key: string]: boolean | undefined } = {};
    for (const elm of args) {
        values[elm.name] = elm.value;
        color[elm.name] = elm.color ? elm.color : "white";
        notIntoFile[elm.name] = elm.notIntoFile ? true : false;
    }

    return { value: values, color: color, notIntoFile: notIntoFile };
}