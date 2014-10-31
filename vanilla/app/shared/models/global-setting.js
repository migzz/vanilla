/**
 *  Global Setting Model
 */

define( function () {
    return vanilla.app.module('GlobalSetting.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/global_settings'
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/global_settings'
        });

    });
});

