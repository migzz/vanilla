
/**
 *  Location Model
 */

define( function () {
    return vanilla.app.module('Location.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/locations'
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/locations',

            lite : function (fields) {
                fields = fields || 'location_name,max_covers,remarks,condition_status,status,a_href,a_area_id,a_area_name,a_status';
                this.url += '&fields=' + fields;
            },

            filterArea: function(areaName) {
                return this.where({ a_area_name : areaName});
            }
        });

    });
});
