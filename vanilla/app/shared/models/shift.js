/**
 * Created by Migeru on 7/20/14.
 */
/**
 *  Shift Model
 */

define( function () {
    return vanilla.app.module('Shift.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/shifts'
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/shifts',

            lite : function (fields) {

                fields = fields || 'shift_name,start_time,end_time,is_public,status';
                this.url += '&fields=' + fields;

            }
        });

    });
});
