/**
 *  Time Sitting Model
 */

define( function () {
    return vanilla.app.module('TimeSitting.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/time_sittings'
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/time_sittings',

            lite : function (fields) {

                fields = fields || 'time_sitting_name,sun,mon,tue,wed,thu,fri,sat,start_time,end_time,status';
                this.url += '&fields=' + fields;

            }
        });

    });
});

