/**
 * Created by Migz on 8/26/14.
 */


    define( function () {
        return vanilla.app.module('Controller.Dashboard', function ( Dashboard, App, Backbone, Marionette, $, _ ) {

        //
        Dashboard.DashboardMenus = [
            {
                menu_name : 'Dashboard',
                menu_icon : 'home',
                menu_class : 'dashboard',
                menu_visible: true
            },
            {
                menu_name : 'Menu',
                menu_icon : 'cutlery',
                menu_class : 'menu',
                menu_visible: true
            },
            {
                menu_name : 'Inventory',
                menu_icon : 'archive',
                menu_class : 'inventory',
                menu_visible: true
            },
            {
                menu_name : 'Reports',
                menu_icon : 'bar-chart',
                menu_class : 'reports',
                menu_visible: true
            },
            {
                menu_name : 'Settings',
                menu_icon : 'wrench',
                menu_class : 'settings',
                menu_visible: true
            }
        ];

        });
    });