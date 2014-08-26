module.exports = function(grunt) {
    var path = require("path");

    grunt.initConfig({
        jsbeautifier: {
            files: [
                "**/*.js",
                "!**/*.min.js",
                "!node_modules/**/*"
            ]
        },
        uglify: {
            compress: {
                options: {
                    output: {
                        beautify: false,
                        space_colon: false,
                        bracketize: true
                    },
                    compress: {
                        sequences: true,
                        hoist_vars: true
                    },
                    preserveLicenseComments: true,
                    mangle: true,

                    generateSourceMaps: false,
                    warnings: true
                },
                files: {
                    "build/require.min.js": [
                        "build/require.js"
                    ]
                }
            }
        },
        requirejs: {
            options: {
                out: "build/require.js",
                file: "src/index.js",
                verbose: true
            }
        },
        watch: {
            scripts: {
                files: [
                    "**/*.js",
                    "!node_modules/**/*"
                ],
                tasks: ["requirejs"],
                options: {
                    spawn: false,
                }
            }
        }
    });

    grunt.registerTask("requirejs", "Compiles CommonJS modules to one file", function() {
        var options = this.options(),
            RequireJS, requirejs, fs, out, file, verbose;

        if (!options) {
            grunt.fail.error("no options for requirejs");
            return;
        }
        file = options.file;
        out = options.out;
        verbose = options.verbose != undefined ? !!options.verbose : true;

        RequireJS = require("./bin/requirejs");
        fs = require("fs");

        requirejs = new RequireJS(file, {
            verbose: !!verbose,
            exportName: options.exportName
        });

        if (verbose) grunt.log.write("\nwriting compiled file " + out + "\n");
        fs.writeFileSync(out, requirejs.compile());
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-jsbeautifier");

    grunt.registerTask("jsb", ["jsbeautifier"]);
    grunt.registerTask("default", ["requirejs", "jsbeautifier", "uglify"]);
};
