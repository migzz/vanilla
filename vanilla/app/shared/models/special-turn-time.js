/**
 *  Special Turn Time Model
 */

define( function () {
    return vanilla.app.module('SpecialTurnTime.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/special_turn_times'
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/special_turn_times',

            lite : function (fields) {

                fields = fields || 'day_of_week,turn_time';
                this.url += '&fields=' + fields;

            }
        });

    });
});

