/**
 *  Inventory Item Model
 */

define( function () {
    return vanilla.app.module('InventoryItem.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/inventory_items'
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/inventory_items',

            lite : function (fields) {
                fields = fields || 'ig_href,ig_inventory_group_id,ig_inventory_group_name,ig_status,i_href,i_item_id,i_item_name,i_item_code,i_item_sku,i_description,i_unit_of_measure,i_item_cost,i_item_price,i_preparation_time,i_alert_level,i_max_stock,i_re_order_quantity,i_item_purchase_code,i_photo_url,i_tax_setting,i_status';
                this.url += '&fields=' + fields;
            }
        });

    });
});
