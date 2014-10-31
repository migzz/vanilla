
    /**
     *  App Selection
     */

    define([
        vanilla.path.requireText + '/app/shared/templates/login.html'
    ], function (
        loginTemplate
        ) {

        //
        return vanilla.app.module('Shared.View', function ( View, App, Backbone, Marionette, $, _ ) {

            // Item View
            View.Login = Marionette.ItemView.extend({

                template  : _.template( loginTemplate ),

                className :'login-form-container',

                events : {
                    'click .login-button'    : 'loginButton'
                },

                loginButton : function () {

                    // dashboard
                    // Render dashboard depending on app.
                    require([
                        'control_panel',
                        'control_panel_menu',
                        'control_panel_setting',
                    ], function (
                        Controller,
                        Menu,
                        Setting
                        ) {

                        //
                        Controller.renderDashboard();
                    });
                }

            });

        });

    });