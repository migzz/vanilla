
    define( function () {
        return vanilla.app.module('Controller.Setting', function ( Setting, App, Backbone, Marionette, $, _ ) {

        //
            Setting.SettingMenus = [
                {
                    menu_name : 'General',
                    menu_icon : 'cogs',
                    menu_class : 'general',
                    menu_visible: true
                },
                {
                    menu_name : 'Branch',
                    menu_icon : 'code-fork',
                    menu_class : 'branch',
                    menu_visible: true
                },
                {
                    menu_name : 'POS',
                    menu_icon : 'exchange',
                    menu_class : 'pos',
                    menu_visible: true
                },
                {
                    menu_name : 'Department',
                    menu_icon : 'adjust',
                    menu_class : 'department',
                    menu_visible: true
                },
                {
                    menu_name : 'Shift',
                    menu_icon : 'sitemap',
                    menu_class : 'shift',
                    menu_visible: true
                },
                {
                    menu_name : 'Areas & Locations',
                    menu_icon : 'th-large',
                    menu_class : 'area-location',
                    menu_visible: true
                },
                {
                    menu_name : 'Reservations',
                    menu_icon : 'cutlery',
                    menu_class : 'reservations',
                    menu_visible: true
                },
                {
                    menu_name : 'Terminals',
                    menu_icon : 'terminal',
                    menu_class : 'terminal',
                    menu_visible: true
                },
                {
                    menu_name : 'Users',
                    menu_icon : 'user',
                    menu_class : 'users',
                    menu_visible: true
                },
                {
                    menu_name : 'Roles & Permission',
                    menu_icon : 'users',
                    menu_class : 'roles-permission',
                    menu_visible: true
                },
                {
                    menu_name : 'Printer',
                    menu_icon : 'print',
                    menu_class : 'printer',
                    menu_visible: true
                },
                {
                    menu_name : 'Promotions',
                    menu_icon : 'credit-card',
                    menu_class : 'promotions',
                    menu_visible: true
                },
                {
                    menu_name : 'Receipt Template',
                    menu_icon : 'file-o',
                    menu_class : 'receipt-template',
                    menu_visible: true
                }
            ];

        });
    });