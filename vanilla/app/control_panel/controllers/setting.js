/**
 * Created by Migz on 8/26/14.
 */

    /**
     *  Controller Branch Selection
     */

    define(['control_panel_setting_view', 'control_panel_setting_model'], function (View, Model) {

        return vanilla.app.module('Controller.Setting', function ( Setting, App, Backbone, Marionette, $, _ ) {

            //
            Setting.renderLayout = function ($container) {

                var settingLayout = new View.Layout();

                // Render Region
                $container = $container || 'region_controller';

                //
                App.renderRegion( $container, settingLayout );

            };

            //
            Setting.renderMenu = function ($container) {

                var menus = Model.SettingMenus;

                //
                var collection = new Backbone.Collection(menus);

                collection = new Backbone.Collection(collection.where({ menu_visible: true}));

                //
                var menuCollectionView = new View.MenuCollection({
                    collection : collection
                });

                // Render Region
                $container = $container || 'region_setting_menu';

                //
                App.renderRegion( $container, menuCollectionView );

            };

        });

    });