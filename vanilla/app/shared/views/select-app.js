/**
 * Created by Migz on 8/26/14.
 */

    /**
     *  App Selection
     */

    define([
        vanilla.path.requireText + '/app/shared/templates/select-app.html'
    ], function (
        appSelectTemplate
        ) {

        //
        return vanilla.app.module('Shared.View', function ( View, App, Backbone, Marionette, $, _ ) {

            var $this = vanilla.app.Shared;
            // Item View
            View.SelectApp = Marionette.ItemView.extend({

                template  : _.template( appSelectTemplate ),
                className : 'hammer',
                 events : {
                     'click a#controller' : 'selectApp'
                 },

                selectApp : function (event) {
                    return false;

                }

            });

        });

    });