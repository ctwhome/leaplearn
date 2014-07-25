/**
 * Media Injection
 * ---------------
 * Copyright (c) 2010-2013 Media Injection
 *
 * All code is the property of Media Injection. This code may not be
 * redistributed, resole or released to the public without the prior written
 * consent of its copyright holders.
 *
 * @link http://www.mediainjection.com/
 * @copyright 2013 Media Injection
 * @author Edwin Duinkerken <edwin@mediainjection.com> Apr 24, 2014 11:52am
 *
 * TNA Application Base File
 */
require.config({
//	urlArgs: 'v=' + (new Date()).getTime(),
    baseUrl: 'assets/js/',
    paths: {
        jquery                 : 'lib/jquery-1.10.2/jquery-1.10.2.min',
        jqueryUI               : 'lib/jquery-ui-1.10.4.custom/jquery-ui-1.10.4.custom.min',
        underscore             : 'lib/underscore-1.4.4/underscore-min',
        backbone               : 'lib/backbone-0.9.10/backbone-min',
        templates              : '../templates'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        jqueryUI: {
            deps: ['jquery']
        },
        underscore: {
            exports: '_'
        },
        handlebars: {
            exports: 'Handlebars'
        },
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        }
    }
});

require([
    'jquery',
    'backbone',
    'TNA/Collections/Navigation/NavigationItems',
    'MIC/Views/Navigation/Navigation',
    'MIC/Models/Lang',
        'TNA/Models/Lang/' + document.documentElement.lang
], function(
    $,
    Backbone,
    NavigationCollection,
    NavigationView,
    Language,
    LanguageMap
    ) {
    window.TNA = new (Backbone.Router.extend({
        collections: [],
        models: [],
        views: [],
        routes: {
            '*dashboard(/step/:step)': 'dashboard'
        },

        /**
         * Initialize Application
         *
         * Load User Settings and Language
         * Set an array for keeping the history
         */
        initialize: function() {
            this.Lang     = new Language({map: LanguageMap});
            this.history = [];
        },
        /**
         * Start TNA Application
         */
        start: function() {
            // Initialize Nav View
            this.initNavigation();

            // Start Router
            if (!Backbone.History.started) {
                Backbone.history.start();
            }
        },

        /**
         * Initialize navigation
         */
        initNavigation: function() {
            this.collections.navigationItems = new NavigationCollection();
            this.views.navigationView = new NavigationView({
                el: $('#main-navigation > ul'),
                collection: this.collections.navigationItems,
                app: this
            });
            this.views.navigationView.listenTo(this.collections.navigationItems, 'reset', this.views.navigationView.render);
            this.collections.navigationItems.fetch();
        },

        /**
         * Load Dashboard based on current route
         *
         * @param {string} dashboard
         */
        dashboard: function(dashboard, step) {
            // Overview Dashboard is the default
            if (dashboard === '') {
                dashboard = 'overview';
            }

            var dashboardFileName = dashboard.substring(0, 1).toUpperCase() + dashboard.substring(1).toLocaleLowerCase();

            // Destroy current dashboard
            this.destroyDashboard();

            require([
                    'TNA/Views/Dashboards/' + dashboardFileName,
                    'TNA/Models/Dashboards/'+ dashboardFileName
            ], function(DashboardView, DashboardModel) {
                TNA.views.dashboard = new DashboardView({
                    el: $('#dashboard'),
                    step: step,
                    model: new DashboardModel()
                });
            });
        },
        /**
         * Destroy current dashboard
         */
        destroyDashboard: function() {
            TNA.models.dashboard && delete TNA.models.dashboard;
//			TNA.views.dashboard && TNA.views.dashboard.remove();               // N O T E:  Why is there to delete the dashboard?
        },
        /**
         * Reset the Application
         *
         * @param {boolean} restart after reset
         */
        reset: function(restart) {
            /**
             * In the future we might want to destroy all models, views and collections here
             * And then start the application again without a hard refresh.
             * For now, we just do a hard refresh to reset
             */
            window.location = '';
        }
    }));
    window.TNA.start();
});
