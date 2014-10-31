/**
 *  Happy Hour Model
 */

define( function () {
    return vanilla.app.module('HappyHour.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/happy_hours'
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/happy_hours',

            lite : function (fields) {
                fields = fields || 'happy_hour_name,multiplier,constant,apply_discount_on_modifier,status';
                this.url += '&fields=' + fields;
            }
        });

    });
});
