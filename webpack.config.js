const path = require("path");

module.exports = {
    entry: "./index.js",
    output: {
        filename: "source.js",
        path: path.resolve(__dirname, "scripts"),
    },
};
