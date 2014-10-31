/**
 *  Special Operation Date Model
 */

define( function () {
    return vanilla.app.module('SpecialOperationDate.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/special_operation_dates'
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/special_operation_dates',

            lite : function (fields) {

                fields = fields || 'special_operation_name,special_operation_date,opening_time,closing_time,remarks';
                this.url += '&fields=' + fields;

            }
        });

    });
});

