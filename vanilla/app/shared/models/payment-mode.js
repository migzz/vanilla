/**
 *  Payment Mode Model
 */

define( function () {
    return vanilla.app.module('PaymentMode.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/payment_modes'
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/payment_modes',
            lite : function (fields) {
                fields = fields || 'payment_mode_name,print_label,payment_mode_type,post_action,require_data,prompt_title,prompt_input_type,require_authorization,is_public,status';
                this.url += '&fields=' + fields;
            }
        });

    });
});

