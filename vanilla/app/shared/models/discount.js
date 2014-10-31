/**
 * Created by Migeru on 7/20/14.
 */
/**
 *  Discount Model
 */

define( function () {
    return vanilla.app.module('Discount.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/discounts'
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/discounts',

            lite : function (fields) {
                fields = fields || 'discount_name,print_label,multiplier,constant,discount_type,applicable_to,require_authorization,is_public,status';
                this.url += '&fields=' + fields;
            }

        });

    });
});
