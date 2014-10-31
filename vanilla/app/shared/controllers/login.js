/**
 * Created by Migz on 8/26/14.
 */


    /**
     *  Controller Branch Selection
     */

    define(['login_view'], function (View, Model) {

        return vanilla.app.module('Shared', function ( Shared, App, Backbone, Marionette, $, _ ) {

            //
            Shared.renderLogin = function ($container) {

                var loginView = new Shared.View.Login();

                // Render to region
                $container = $container || 'main';

                //
                App.renderRegion( $container, loginView );

            };

        });

    });