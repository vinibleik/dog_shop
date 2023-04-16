const path = require("path");

// Look for the entry file at ./src/index.js.
// Output the bundled file to ./dist/bundle.js.
// Use the babel-loader to transpile any JavaScript files that match the regex /\\.js$/.
// Exclude any files in the node_modules or bower_components directories from being transpiled.
// Use the @babel/preset-env preset to transpile your code to run in the latest versions of all major browsers.

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components|coverage|tests)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
};
