function removeNumbers(object) {
    const current = object;

    for (const property in current) {
        if (Object.prototype.hasOwnProperty.call(current, property)) {
            if (current[property] !== null && typeof current[property] === "object") {
                current[property] = removeNumbers(current[property]);
            }
            if (Number.isInteger(current[property])) {
                delete current[property];
            }
        }
    }

    return current;
}

module.exports = function exports(source) {
    this.cacheable();

    const current = removeNumbers(JSON.parse(source));

    this.value = JSON.stringify(current);
    return JSON.stringify(current);
};
