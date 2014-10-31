/**
 *  Happy Hour Timing Model
 */

define( function () {
    return vanilla.app.module('HappyHourTiming.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/happy_hour_timings'
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/happy_hour_timings',

            lite : function (fields) {
                fields = fields || 'sun,mon,tue,wed,thu,fri,sat,start_time,end_time,status,hh_href,hh_happy_hour_id,hh_happy_hour_name,hh_multiplier,hh_constant,hh_apply_discount_on_modifier,hh_status';
                this.url += '&fields=' + fields;
            }
        });

    });
});

