
/**
 *  Module Model
 */

define( function () {
    return vanilla.app.module('Module.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/modules'
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/modules'
        });

    });
});

