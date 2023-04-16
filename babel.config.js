// This tells Babel to use the @babel/preset-env preset, which allows you to use modern JavaScript features and transpile them down to a version of JavaScript that can run in your environment.

module.exports = {
    presets: [["@babel/preset-env", { targets: { node: "current" } }]],
};
