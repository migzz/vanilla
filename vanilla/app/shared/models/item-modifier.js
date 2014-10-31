/**
 *  Item Modifier Model
 */

define( function () {
    return vanilla.app.module('ItemModifier.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/item_modifiers'
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/item_modifiers',

            lite : function (fields) {
                fields = fields || 'priority_level,i_href,i_item_id,i_item_name,i_item_code,i_item_sku,i_description,i_unit_of_measure,i_item_cost,i_item_price,i_preparation_time,i_alert_level,i_max_stock,i_re_order_quantity,i_item_purchase_code,i_photo_url,i_tax_setting,i_status,m_href,m_modifier_id,m_modifier_name,m_selection_type,m_modifier_type,m_status';
                this.url += '&fields=' + fields;
            }
        });

    });
});

