var Test = require("./lib/test"),
    Route = require("../route/"),
    pkg = require("../../../package.json"),
    test = new Test("HAL"),
    utils = require("utils/../Gruntfile");

test.example();

global.utils = utils;
global.process = process;
global.Test = Test;

exports.route = new Route("GET:/");
