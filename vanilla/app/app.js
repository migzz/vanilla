/* */
function l(message, newline) {
    console.log(message);
    if (newline) console.log('-------------------------------------');
}

/* shenanigans */
( function ($) {

    /* */
    var vanilla = window.vanilla = {
        app : {},
        ui : {},
        fn : {},
        path : {
            requireText : '../public/js/core/require-text-2.0.12/require-text!'
        }
    };
    var aurora = window.aurora = {};

    vanilla['protocol'] = 'http://';
    vanilla['port'] = ':8081';
    vanilla['domain'] = '192.168.1.2';

    /* */
    aurora['protocol'] = 'http://';
    aurora['port'] = ':8091';
    aurora['domain'] = '192.168.1.2';
    aurora['server'] = '127.0.0.1';

    /* */
    if (window.location.hostname == '192.168.0.7' ) {
        vanilla['domain'] = '192.168.0.7';
        aurora['domain'] = '192.168.0.7';
    }

    vanilla['url'] = vanilla.protocol + vanilla.domain + vanilla.port;
    aurora['url'] = aurora.protocol + aurora.domain + aurora.port;

    /**
     * Functions
     */

        // Random between two numbers. can have negative value but not decimal
    vanilla.fn.random = function (min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    };

    //
    require.config({
        waitSeconds : 10,
        paths : {

            /* Core Dependencies */
            jquery     : '/public/js/core/jquery-2.1.0/jquery.min',
            underscore : '/public/js/core/underscore-1.6.0/underscore',
            backbone   : '/public/js/core/backbone-1.1.2/backbone',
            marionette : '/public/js/core/backbone-marionette-2.2.0/backbone.marionette',

            /* Plugins */
            modernizr    : '/public/js/plugin/modernizr-2.6.2/modernizr',
            nprogress    : '/public/js/plugin/nprogress-0.1.3/nprogress',
            paceProgress : '/public/js/plugin/pace-0.5.1/pace.min',
            validation   : '/public/js/plugin/jquery-validation-1.13.0/jquery.validate.min',
            fastclick    : '/public/js/plugin/fastclick-1.0.2/fastclick',
            hammer       : '/public/js/plugin/hammer-2.0.4/hammer',
            md5          : '/public/js/plugin/cryptojs-3.1.2/md5',


            /* Customs */
            notification : '/public/js/notification',
            tooltip      : '/public/js/tooltip',
            hammer_time  : '/public/js/hammer-time',
            data_storage : '/public/js/data-storage',
            dialog       : '/public/js/dialog',
            dropdown     : '/public/js/dropdown',

            /* App */

            apps : '/app/shared/views/apps',
            //ui   : '/app/ui',

            //
            main_controller : '/app/shared/controllers/main',

            main_router : '/app/shared/routers/main',

            //
            http_header : '/app/http-header',

            vanilla : '/app/vanilla',

            // Regions
            regions : '/app/regions',


            /* Shared */

            // Models
            base_model : '/app/shared/models/base-model',

            shared_branch_model : '/app/shared/models/branch',
            shared_user_model   : '/app/shared/models/user',

            // Master Page
            master_page      : '/app/shared/controllers/master-page-layout',
            master_page_view : '/app/shared/views/master-page-layout',

            // Branch Selection
            branch_selection     : '/app/shared/controllers/branch-selection',
            branch_selection_view : '/app/shared/views/branch-selection',

            // Pin
            pin     : '/app/shared/controllers/pin',
            pin_view : '/app/shared/views/pin',

            // Login
            login     : '/app/shared/controllers/login',
            login_view : '/app/shared/views/login',

            // Select App
            select_app     : '/app/shared/controllers/select-app',
            select_app_view : '/app/shared/views/select-app',

            // Select User
            select_user     : '/app/shared/controllers/select-user',
            select_user_view : '/app/shared/views/select-user',


            /*
             * Controller
             */

            control_panel      : '/app/control_panel/controllers/dashboard',
            control_panel_view  : '/app/control_panel/views/dashboard',
            control_panel_model : '/app/control_panel/models/dashboard',

            /* Menu */

            control_panel_menu      : '/app/control_panel/controllers/menu',
            control_panel_menu_view  : '/app/control_panel/views/menu',
            control_panel_menu_model : '/app/control_panel/models/menu',

            menu_group      : '/app/control_panel/controllers/menu/menu-group',
            menu_group_view  : '/app/control_panel/views/menu/menu-group',
            menu_group_model : '/app/shared/models/menu-group',

            menu_category       : '/app/control_panel/controllers/menu/menu-category',
            menu_category_view  : '/app/control_panel/views/menu/menu-category',
            menu_category_model : '/app/shared/models/menu-category',

            menu_item       : '/app/control_panel/controllers/menu/menu-item',
            menu_item_view  : '/app/control_panel/views/menu/menu-item',
            menu_item_model : '/app/shared/models/menu-item',

            /* POS */

            // Table Layout
            table_layout     : '/app/pos/controllers/table-layout',
            table_layout_view : '/app/pos/views/table-layout',

            /* setting */

            control_panel_setting      : '/app/control_panel/controllers/setting',
            control_panel_setting_view  : '/app/control_panel/views/setting',
            control_panel_setting_model : '/app/control_panel/models/setting',

            menu       : '/app/control_panel/controllers/setting/menu',
            menu_view  : '/app/control_panel/views/setting/menu',
            menu_model : '/app/shared/models/menu',

            area       : '/app/control_panel/controllers/setting/area',
            area_view  : '/app/control_panel/views/setting/area',
            area_model : '/app/shared/models/area',

            associate       : '/app/control_panel/controllers/setting/associate',
            associate_view  : '/app/control_panel/views/setting/associate',
            associate_model : '/app/shared/models/associate',

            associate_contact       : '/app/control_panel/controllers/setting/associate-contact',
            associate_contact_view  : '/app/control_panel/views/setting/associate-contact',
            associate_contact_model : '/app/shared/models/associate-contact',

            branch_variable       : '/app/control_panel/controllers/setting/branch-variable',
            branch_variable_view  : '/app/control_panel/views/setting/branch-variable',
            branch_variable_model : '/app/shared/models/branch-variable',

            contact       : '/app/control_panel/controllers/setting/contact',
            contact_view  : '/app/control_panel/views/setting/contact',
            contact_model : '/app/shared/models/contact',

            customer       : '/app/control_panel/controllers/setting/customer',
            customer_view  : '/app/control_panel/views/setting/customer',
            customer_model : '/app/shared/models/customer',

            customer_variable       : '/app/control_panel/controllers/setting/customer-variable',
            customer_variable_view  : '/app/control_panel/views/setting/customer-variable',
            customer_variable_model : '/app/shared/models/customer-variable',

            department       : '/app/control_panel/controllers/setting/department',
            department_view  : '/app/control_panel/views/setting/department',
            department_model : '/app/shared/models/department',

            discount       : '/app/control_panel/controllers/setting/discount',
            discount_view  : '/app/control_panel/views/setting/discount',
            discount_model : '/app/shared/models/discount',

            global_setting       : '/app/control_panel/controllers/setting/global-setting',
            global_setting_view  : '/app/control_panel/views/setting/global-setting',
            global_setting_model : '/app/shared/models/global-setting',

            happy_hour       : '/app/control_panel/controllers/setting/happy-hour',
            happy_hour_view  : '/app/control_panel/views/setting/happy-hour',
            happy_hour_model : '/app/shared/models/happy-hour',

            happy_hour_timing       : '/app/control_panel/controllers/setting/happy-hour-timing',
            happy_hour_timing_view  : '/app/control_panel/views/setting/happy-hour-timing',
            happy_hour_timing_model : '/app/shared/models/happy-hour-timing',

            inventory_group       : '/app/control_panel/controllers/setting/inventory-group',
            inventory_group_view  : '/app/control_panel/views/setting/inventory-group',
            inventory_group_model : '/app/shared/models/inventory-group',

            inventory_item       : '/app/control_panel/controllers/setting/inventory-item',
            inventory_item_view  : '/app/control_panel/views/setting/inventory-item',
            inventory_item_model : '/app/shared/models/inventory-item',

            item       : '/app/control_panel/controllers/setting/item',
            item_view  : '/app/control_panel/views/setting/item',
            item_model : '/app/shared/models/item',

            item_happy_hour       : '/app/control_panel/controllers/setting/item-happy-hour',
            item_happy_hour_view  : '/app/control_panel/views/setting/item-happy-hour',
            item_happy_hour_model : '/app/shared/models/item-happy-hour',

            item_modifier       : '/app/control_panel/controllers/setting/item-modifier',
            item_modifier_view  : '/app/control_panel/views/setting/item-modifier',
            item_modifier_model : '/app/shared/models/item-modifier',

            item_tag       : '/app/control_panel/controllers/setting/item-tag',
            item_tag_view  : '/app/control_panel/views/setting/item-tag',
            item_tag_model : '/app/shared/models/item-tag',

            item_time_sitting       : '/app/control_panel/controllers/setting/item-time-sitting',
            item_time_sitting_view  : '/app/control_panel/views/setting/item-time-sitting',
            item_time_sitting_model : '/app/shared/models/item-time-sitting',

            location       : '/app/control_panel/controllers/setting/location',
            location_view  : '/app/control_panel/views/setting/location',
            location_model : '/app/shared/models/location',

            location_variable       : '/app/control_panel/controllers/setting/location-variable',
            location_variable_view  : '/app/control_panel/views/setting/location-variable',
            location_variable_model : '/app/shared/models/location-variable',

            modifier       : '/app/control_panel/controllers/setting/modifier',
            modifier_view  : '/app/control_panel/views/setting/modifier',
            modifier_model : '/app/shared/models/modifier',

            modifier_option       : '/app/control_panel/controllers/setting/modifier-option',
            modifier_option_view  : '/app/control_panel/views/setting/modifier-option',
            modifier_option_model : '/app/shared/models/modifier-option',

            module_       : '/app/control_panel/controllers/setting/module',
            module_view  : '/app/control_panel/views/setting/module',
            module_model : '/app/shared/models/module',

            operating_time       : '/app/control_panel/controllers/setting/operating-time',
            operating_time_view  : '/app/control_panel/views/setting/operating-time',
            operating_time_model : '/app/shared/models/operating-time',

            payment_mode       : '/app/control_panel/controllers/setting/payment-mode',
            payment_mode_view  : '/app/control_panel/views/setting/payment-mode',
            payment_mode_model : '/app/shared/models/payment-mode',

            printer       : '/app/control_panel/controllers/setting/printer',
            printer_view  : '/app/control_panel/views/setting/printer',
            printer_model : '/app/shared/models/printer',

            role       : '/app/control_panel/controllers/setting/role',
            role_view  : '/app/control_panel/views/setting/role',
            role_model : '/app/shared/models/role',

            role_access       : '/app/control_panel/controllers/setting/role-access',
            role_access_view  : '/app/control_panel/views/setting/role-access',
            role_access_model : '/app/shared/models/role-access',

            shift       : '/app/control_panel/controllers/setting/shift',
            shift_view  : '/app/control_panel/views/setting/shift',
            shift_model : '/app/shared/models/shift',

            special_operation_date       : '/app/control_panel/controllers/setting/special-operation-date',
            special_operation_date_view  : '/app/control_panel/views/setting/special-operation-date',
            special_operation_date_model : '/app/shared/models/special-operation-date',

            special_turn_time       : '/app/control_panel/controllers/setting/special-turn-time',
            special_turn_time_view  : '/app/control_panel/views/setting/special-turn-time',
            special_turn_time_model  : '/app/shared/models/special-turn-time',

            tag       : '/app/control_panel/controllers/setting/tag',
            tag_view  : '/app/control_panel/views/setting/tag',
            tag_model : '/app/shared/models/tag',

            tax       : '/app/control_panel/controllers/setting/tax',
            tax_view  : '/app/control_panel/views/setting/tax',
            tax_model : '/app/shared/models/tax',

            tax_profile       : '/app/control_panel/controllers/setting/tax-profile',
            tax_profile_view  : '/app/control_panel/views/setting/tax-profile',
            tax_profile_model : '/app/shared/models/tax-profile',

            time_sitting       : '/app/control_panel/controllers/setting/time-sitting',
            time_sitting_view  : '/app/control_panel/views/setting/time-sitting',
            time_sitting_model : '/app/shared/models/time-sitting',

            transaction_type       : '/app/control_panel/controllers/setting/transaction-type',
            transaction_type_view  : '/app/control_panel/views/setting/transaction-type',
            transaction_type_model : '/app/shared/models/transaction-type',

            user       : '/app/control_panel/controllers/setting/user',
            user_view  : '/app/control_panel/views/setting/user',
            user_model : '/app/shared/models/user',

            user_credential     : '/app/control_panel/controllers/setting/user-credential',
            user_credential_view  : '/app/control_panel/views/setting/user-credential',
            user_credential_model : '/app/shared/models/user-credential',

            user_role     : '/app/control_panel/controllers/setting/user-role',
            user_role_view  : '/app/control_panel/views/setting/user-role',
            user_role_model : '/app/shared/models/user-role'
        },

        shim : {
            jquery : {
                exports : '$'
            },
            underscore  : {
                exports : '_'
            },
            backbone : {
                deps    : ['jquery', 'underscore']
            },
            marionette : {
                deps    : ['jquery', 'underscore', 'backbone'],
                exports : 'Marionette'
            },
            vanilla : {
                deps    : ['marionette', 'data_storage']
            },
            hammer : {
                deps    : ['jquery', 'modernizr'],
                exports : 'Hammer'
            },
            md5 : {
                deps    : ['jquery'],
                exports : 'CryptoJS'
            }

        }
    });

    // Load App
    require(['vanilla'], function () {
        console.log('vanilla.app');
    });

})();