// @ts-ignore
const path = require("path");

module.exports = {
    entry: "./src/index.ts",
    mode: "development",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "main.ts",
    },
};
