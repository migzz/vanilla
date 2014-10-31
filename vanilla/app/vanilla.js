/**
 * Created by migz on 5/24/14.
 */


    Marionette.deprecate = function(message, test) {
        if (test === undefined || !test) {
            var error = new Marionette.Error({
                name: 'DEPRECATION',
                message: message
            });
            error.captureStackTrace(Marionette.deprecate);
            console.warn(error.stack);
        }
    };

    var loadingMessage      = [
        'You\'re suppose to be working right now and rather than readin this crap..',
        'Potato is in progress..',
        'Yes We are serious about this..',
        'Loading crap..',
        '640K ought to be enough for anybody..',
        'Architects are still drafting..',
        'We\'re building the buildings as fast as we can..',
        'Would you prefer chicken, steak, or tofu?',
        'Feeding the cat..',
        'Cooking potato..',
        '[insert funny loading message]',
        'Spreading bacteria..',
        'Hello Kitty is not a cat! o_O',
        'Diamond\'s chemical name is Carbon..',
        'Making vanilla..',
        'The quick brown fox jumps over the lazy dog..',
        'Locating the required gigapixels to render..',
        'Spinning up the hamster..',
        'Shovelling coal into the server..',
        'Programming the flux capacitor..',
        'Little things means a lot..'
    ],
        $appLoadingMessage  = $('.app-loading-message'),
        $appLoadingContent  = $('.app-loading-content'),
        $appLoadingTitle  = $appLoadingContent.find('.app-title'),
        appLoadingTimer     = 0;

    //
    var randomLoadingMessage = function () {

        var duration = vanilla.fn.random(10, 200) * 10,
            message  = vanilla.fn.random(0, loadingMessage.length);

        // if long
        if ( message < 1) duration = 3000;

        //
        message = loadingMessage[message];

        // render
        $appLoadingMessage.html(message);

        //
        clearTimeout(appLoadingTimer);

        // recursion
        appLoadingTimer = setTimeout(function () {
            //
            randomLoadingMessage();
        }, duration);

        //console.log('randomLoadingMessage: ' + duration);
    };


//randomLoadingMessage();

//
var loadingApptitleColor = function () {

    var duration = 2000;

    //
    clearTimeout(appLoadingTimer);

    //
    appLoadingTimer = setTimeout(function () {

        //
        $appLoadingTitle.toggleClass('color1');

        //
        loadingApptitleColor();

    }, duration);

};

// show splash
$appLoadingContent.addClass('show');

// splash title color change
loadingApptitleColor();

// loading message
// randomLoadingMessage();

// load fastclick and progress plugin first
define ([
    'fastclick',
    'nprogress'

], function ( FastClick, NProgress) {

    var ajaxStartTime = 0,
        ajaxEndTime = 0,
        ajaxDuration = 0;

    // Remove device click delay
    FastClick.attach(document.body);

    //NProgress.start();

    // Bind progress to ajax start
    $( document ).ajaxStart(function(ajax) {
        //NProgress.configure({pageLoad : false, container : 'footer h1'})
        //ajaxStartTime =  new Date().getTime();
        ajaxStartTime = ajax.timeStamp;
        NProgress.start();
    });

    // Bind progress to ajax stop
    $( document ).ajaxStop(function(ajax) {
        //ajaxEndTime = new Date().getTime();

        ajaxEndTime = ajax.timeStamp;

        ajaxDuration = (ajaxEndTime - ajaxStartTime) / 1000;


        if ( ajaxDuration > 1) {
            ajaxDuration = ajaxDuration + ' sec';
        }

        else {
            ajaxDuration = ajaxDuration + ' ms';
        }

        console.log('server run: ' + ajaxDuration);
        //trace(ajaxDuration);
        NProgress.done(1);
    });

    // Bind progress to ajax stop
    $( document ).ajaxError(function(e, b) {

        // show exclamation
        NProgress.done(1);
    });

    //  our vanilla.app
    vanilla.app = new Marionette.Application();

    //
    require ([
        'http_header',
        'hammer_time',
        'validation',
        'notification',
        'tooltip',
        'regions',
        'ui'
    ], function (Request) {

        // form to JSON
        $.fn.serializeFormJSON = function() {
            var data = {};
            this.serializeArray().map(
                function (formEl){
                    data[formEl.name] = formEl.value;
                }
            );
            return data;
        };

        // set Validation Regex
        $.validator.addMethod(
            'regex',
            function(value, element, regexp) {
                var check = false;
                return this.optional(element) || regexp.test(value);
            },
            '<i class="fa fa-ban"></i> Invalid character input.'
        );


        /*
             $.extend($.validator.messages, {
             required: "This field is required.",
             remote: "Please fix this field.",
             email: "Please enter a valid email address.",
             url: "Please enter a valid URL.",
             date: "Please enter a valid date.",
             dateISO: "Please enter a valid date (ISO).",
             number: "Please enter a valid number.",
             digits: "Please enter only digits.",
             creditcard: "Please enter a valid credit card number.",
             equalTo: "Please enter the same value again.",
             accept: "Please enter a value with a valid extension.",
             maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
             minlength: jQuery.validator.format("Please enter at least {0} characters."),
             rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
             range: jQuery.validator.format("Please enter a value between {0} and {1}."),
             max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
             min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
             });
         */

        // Before we initialize vanilla.app
        vanilla.app.on('initialize:before', function () {

            // overide backbone sync
            var backboneSync = Backbone.sync;

            //
            Backbone.sync = function(method, model, options) {

                // Set http header
                Request.token();

                //
                NProgress.done();

                // Overwrite backbone sync function
                return backboneSync(method, model, options);
            };

        });

        // DataStorage.clear();
        //trace('DataStorage', 'clear');

         //
        vanilla.app.offsetTimeZone = function(date) {

        };

        // start Marionette app
        vanilla.app.start();

        // Insert layout to DOM
        //new vanilla.app.MasterPage.View.Layout();

        // TODO call authentication first

        require ([

            'master_page',
            'control_panel',
            'branch_selection',
            'select_app',

            'menu',
            //'select_user',

            'menu_group',
            'menu_category',
            'menu_item',

            'location',
            'area',
            'role',
            'role_access',
            'module_',
            'department',
            'printer',
            'shift',
            'user',
            'user_credential',
            'user_role',

/*
            'area',
            'associate',
            'associate_contact',
            'branch_variable',
            'contact',
            'customer',
            'customer_variable',
            'department',
            'discount',
            'global_setting',
            'happy_hour',
            'happy_hour_timing',
            'inventory_group',
            'inventory_item',
            'item',
            'item_happy_hour',
            'item_modifier',
            'item_tag',
            'item_time_sitting',
            'location',
            'location_variable',
            'modifier',
            'modifier_option',
            'module_',
            'operating_time',
            'payment_mode',
            'printer',
            'role',
            'role_access',
            'shift',
            'special_operation_date',
            'special_turn_time',
            'tag',
            'tax',
            'tax_profile',
            'time_sitting',
            'transaction_type',
            'user',
            'user_credential',
            'user_role',*/

            'control_panel_menu',
            'control_panel_setting',
            'login',
            'pin',
            'table_layout',
            'dialog',
            'dropdown'
        ], function (MasterPage, Controller, Branch, Group, Category, Item ) {

            // TODO get all setting on load and wait for it before we display the app

            // delay for display
            setTimeout(function () {

                // Render masterpage where first view is rendered
                MasterPage.renderLayout();

                //
                Controller.renderDashboard();

                //
                // Branch.renderBranchSelection();

                //
                clearTimeout(appLoadingTimer);

                //
                vanilla.ui.notification.initialize();

                //
                Controller.fetchControlPanel();

                //
                //vanilla.app.Tooltip.initialize();

                //
                //MG.fetchList();


                //_controller.renderMenuMenu('main');

                 //vanilla.app.Tooltip.simple();
                //$('.menu.dashboard-menu').trigger('click');
                //$('header, nav, .controller-collection-list, .tooltip-container').hide();

                // fetch list

                // vanilla.app.MenuGroup.renderMenu();

                //$('.settings.dashboard-menu').trigger('click');
                //$('.general.dashboard-setting-menu').trigger('click');
            }, 0);
        });


    }); /* code end */

});
