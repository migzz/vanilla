
    /**
     *  Item Happy Hour
     */

    define( function () {
        return vanilla.app.module('ItemHappyHour.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

            // Model
            Model.Item = Backbone.Model.extend({
                urlRoot : aurora.url + '/item_happy_hours'
            });

            // Collection
            Model.Collection = Backbone.Collection.extend({
                url : aurora.url + '/item_happy_hours',

                lite : function (fields) {
                    fields = fields || 'i_href,i_item_id,i_item_name,i_item_code,i_item_sku,i_description,i_unit_of_measure,i_item_cost,i_item_price,i_preparation_time,i_alert_level,i_max_stock,i_re_order_quantity,i_item_purchase_code,i_photo_url,i_tax_setting,i_status,hh_href,hh_happy_hour_id,hh_happy_hour_name,hh_multiplier,hh_constant,hh_apply_discount_on_modifier,hh_status';
                    this.url += '&fields=' + fields;
                }
            });

        });
    });

