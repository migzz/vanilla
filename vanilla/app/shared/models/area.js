/**
 *  Area Model
 */

define( function () {
    return vanilla.app.module('Area.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/areas'
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/areas',

            lite : function (fields) {

                fields = fields || 'area_name,status';
                this.url += '&fields=' + fields;

            }

        });

    });
});

