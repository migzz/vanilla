/**
 *  Operating Time Model
 */

define( function () {
    return vanilla.app.module('OperatingTime.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/operating_times'
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/operating_times',
            lite : function (fields) {
                fields = fields || 'day_of_week,opening_time,closing_time';
                this.url += '&fields=' + fields;
            }
        });

    });
});

