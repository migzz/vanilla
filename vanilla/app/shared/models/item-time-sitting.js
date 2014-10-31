/**
 *  Item Time Sitting Model
 */

define( function () {
    return vanilla.app.module('ItemTimeSitting.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/item_time_sittings'
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/item_time_sittings',

            lite : function (fields) {
                fields = fields || 'i_href,i_item_id,i_item_name,i_item_code,i_item_sku,i_description,i_unit_of_measure,i_item_cost,i_item_price,i_preparation_time,i_alert_level,i_max_stock,i_re_order_quantity,i_item_purchase_code,i_photo_url,i_tax_setting,i_status,ts_href,ts_time_sitting_id,ts_time_sitting_name,ts_start_time,ts_end_time,ts_status';
                this.url += '&fields=' + fields;
            }
        });

    });
});

