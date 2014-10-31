/**
 * Created by Migz on 9/22/14.
 */

    /**
     *  Base Model
     */

    define( function () {
        return vanilla.app.module('Base.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

            /* code_start */

                // Model
            Model.Item = function (urlRoot) {

                    //
                    return Backbone.Model.extend({
                        urlRoot : aurora.url + '/' + urlRoot || ''
                    });
                };

                // Collection
            Model.Collection = function (url) {

                    //
                    return Backbone.Collection.extend({
                        url : aurora.url + '/' + url || ''
                    });
                };

            /* code_end */

        });
    });
