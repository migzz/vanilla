/**
 * Created by Migz on 8/26/14.
 */

    /**
     *  Controller Branch Selection
     */

    define(['master_page_view'], function (View) {

        return vanilla.app.module('MasterPage', function ( MasterPage, App, Backbone, Marionette, $, _ ) {

            //
            MasterPage.renderLayout = function ($container) {

                var vanillaLayout = new View.Layout();

                // Render to region
                $container = $container || 'body';

                //
                App.renderRegion( $container, vanillaLayout );
            };

        });

    });