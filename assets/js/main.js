/**
 *  Leap Learn
 * ----------------------
 * GNU GPLv3 License (c) - 2014
 *
 * @link http://www.github.com/learnlab
 * @copyright GNU GPLv3 License, http://gnu.org/copyleft/gpl.html
 * @author Jesus Garcia <ctw@ctwhome.com> 25/07/14, 22:35.
 *
 * Styles css
 * ---------------------
 */
requirejs.config({
    baseUrl: 'assets/js/',
    paths: {
        jquery                  : 'bower_components/jquery/dist/jquery.min',

        <!--LEAP MOTION -->
        leapMotion              : 'bower_components/leap-0.6.0.min/index',
        leapPlugins             : 'bower_components/leap-plugins-0.1.6.min/index',
        leapRiggedHands         : 'bower_components/leap.rigged-hand-0.1.4.min/index',
        threeJs                 : 'bower_components/threejs/build/three.min'
    },
    shim: {
        jquery: {
            exports: '$'
        }
    }
});