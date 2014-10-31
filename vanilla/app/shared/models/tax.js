/**
 * Created by Migeru on 7/20/14.
 */
/**
 *  Tax Model
 */

define( function () {
    return vanilla.app.module('Tax.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/taxes'
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/taxes',

            lite : function (fields) {

                fields = fields || 'tax_name,print_label,multiplier,constant,tax_type,computation_type,priority_level,status,tp_href,tp_tax_profile_id,tp_tax_profile_name,tp_status';
                this.url += '&fields=' + fields;

            }
        });

    });
});
