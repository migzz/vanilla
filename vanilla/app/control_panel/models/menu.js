/**
 * Created by Migz on 8/26/14.
 */


    define( function () {
        return vanilla.app.module('Controller.Menu', function ( Menu, App, Backbone, Marionette, $, _ ) {

        //
            Menu.MenuMenus = [
                {
                    menu_name : 'Menu Groups',
                    menu_icon : 'th-large',
                    menu_class : 'menu-groups',
                    menu_visible: false
                },
                {
                    menu_name : 'Menu Categories',
                    menu_icon : 'th-list',
                    menu_class : 'menu-categories',
                    menu_visible: false
                },
                {
                    menu_name : 'Menu Items',
                    menu_icon : 'th',
                    menu_class : 'menu-items',
                    menu_visible: false
                },
                {
                    menu_name : 'Item Modifiers',
                    menu_icon : 'adjust',
                    menu_class : 'item-modifiers',
                    menu_visible: false
                },
                {
                    menu_name : 'Item Modifier Groups',
                    menu_icon : 'sitemap',
                    menu_class : 'item-modifier-groups',
                    menu_visible: false
                },
                {
                    menu_name : 'Item Super Groups',
                    menu_icon : 'futbol-o',
                    menu_class : 'item-super-groups',
                    menu_visible: true
                },
                {
                    menu_name : 'Item Promo',
                    menu_icon : 'star',
                    menu_class : 'item-promo',
                    menu_visible: true
                }
            ];

        });
    });