
    /**
     *  Item
     */

    define( function () {
        return vanilla.app.module('Item.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

            // Model
            Model.Item = Backbone.Model.extend({
                urlRoot : aurora.url + '/items'
            });

            // Collection
            Model.Collection = Backbone.Collection.extend({
                url : aurora.url + '/items',

                lite : function (fields) {
                    fields = fields || 'item_name,item_code,item_sku,description,unit_of_measure,item_cost,item_price,preparation_time,alert_level,max_stock,re_order_quantity,item_purchase_code,photo_url,tax_setting,is_public,status';
                    this.url += '&fields=' + fields;
                }
            });

            // Collection
            Model.Item = Backbone.Model.extend({
                urlRoot : aurora.url + '/menu_category_items?mc_menu_category_id=',
                url : function (){
                    return this.urlRoot + this.get('mc_menu_category_id')
                }
            });

        });
    });
