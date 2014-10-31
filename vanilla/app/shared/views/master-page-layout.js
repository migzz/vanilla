/**
 * Created by Migz on 8/26/14.
 */

    /**
     *  Branch Selection
     */

    define([
        vanilla.path.requireText + '/app/shared/templates/master-page-layout.html'
    ], function (
        masterPageLayoutTemplate
        ) {

        //
        return vanilla.app.module('Shared.View', function ( View, App, Backbone, Marionette, $, _ ) {

            //
            View.Layout = Marionette.LayoutView.extend({
                template : _.template( masterPageLayoutTemplate ),
                id :'vanilla'
            });

        });

    });