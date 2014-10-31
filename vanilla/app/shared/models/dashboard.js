/**
 * Created by Migeru on 8/13/14.
 */

vanilla.app.module('Dashboard', function ( Dashboard, App, Backbone, Marionette, $, _ ) {

    //
    Dashboard.menus = [
        {
            menu_name : 'Dashboard',
            menu_icon : 'cogs',
            menu_class : 'dashboard',
            menu_visible: true
        },
        {
            menu_name : 'Menu',
            menu_icon : 'cogs',
            menu_class : 'menu',
            menu_visible: true
        },
        {
            menu_name : 'Inventory',
            menu_icon : 'cogs',
            menu_class : 'inventory',
            menu_visible: true
        },
        {
            menu_name : 'Reports',
            menu_icon : 'cogs',
            menu_class : 'reports',
            menu_visible: true
        },
        {
            menu_name : 'Settings',
            menu_icon : 'cogs',
            menu_class : 'settings',
            menu_visible: true
        }];

    // Model
    Dashboard.Model = {

        // Single model
        Item : Backbone.Model.extend({
            urlRoot : aurora.url + '/'
        }),

        // Collection
        Collection : Backbone.Collection.extend({
            url : aurora.url + '/'
            /*,
             comparator: function( collection ){
             return( -collection.get( 'menu_visible' ) );
             }
             */
        })

    };
});