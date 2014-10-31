/**
 * Created by Migz on 8/26/14.
 */

    /**
     *  Controller
     */

    define(['control_panel_menu_view', 'control_panel_menu_model'], function (View, Model) {

        return vanilla.app.module('Controller.Menu', function ( Menu, App, Backbone, Marionette, $, _ ) {

            Menu.renderLayout = function ($container) {

                var menuLayout = new View.Layout();

                // Render to region
                $container = $container || 'region_controller';

                //
                App.renderRegion( $container, menuLayout );

            };


            Menu.renderMenu = function ($container) {

                //
                var CDM = Backbone.Collection.extend();

                //
                var menuMenu = new View.MenuCollection({
                    collection: new CDM(Model.MenuMenus)
                });

                // Render to region
                $container = $container || 'region_menu_menu';

                //
                App.renderRegion( $container, menuMenu );
            };

        });

    });