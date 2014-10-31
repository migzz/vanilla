/**
 * Created by Migz on 5/30/14.
 */

    /**
     *  Main router
     */

    vanilla.app.module('Router', function ( Router, App, Backbone, Marionette, $, _ ) {

        // App routes
        vanilla.app.Routers = Marionette.AppRouter.extend({
            appRoutes : {
                ''              : 'index',
                'contact'       : 'contact',
                'settings'      : 'settings',
                'dashboard'     : 'dashboard',
                '*path'         : 'pageNotFound'
            }
        });

        // Require main controller
        require(['main_controller'], function () {

            // Set router
            vanilla.app.router = new vanilla.app.Routers({
                controller : new vanilla.app.Controller.Main()
            });

            // Start router navigation
            if( Backbone.history ){
                Backbone.history.start();
            }

        });
    });

