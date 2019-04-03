/*jshint esversion: 6 */

const fs = require('fs'); //file system

//expects string path, returns the content of the specified file, if found
exports.readFile = (path) => {
    return fs.readFileSync(path);
};

//expects valid json string jsonString, returns a json object
exports.getJson = (jsonString) => {
    return JSON.parse(jsonString);
};