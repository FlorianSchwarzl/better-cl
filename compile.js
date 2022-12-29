module.exports = (args) => {
    const values = {};
    const color = {};
    const notIntoFile = {};
    for (const elm of args) {
        values[elm.name] = elm.value;
        color[elm.name] = elm.color ? elm.color : "white";
        notIntoFile[elm.name] = elm.notIntoFile ? true : false;
    }

    return { value: values, color: color, notIntoFile: notIntoFile };
}