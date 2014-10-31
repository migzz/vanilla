/**
 * Created by Migeru on 7/20/14.
 */
/**
 *  Transaction Type Model
 */


define( function () {
    return vanilla.app.module('TransactionType.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/transaction_types'
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/transaction_types',

            lite : function (fields) {

                fields = fields || 'transaction_type_name,print_label,tax_setting,is_public,status';
                this.url += '&fields=' + fields;

            }
        });

    });
});
