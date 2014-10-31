
    /**
     *  Menu Item
     */

    define( function () {
        return vanilla.app.module('MenuItem.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

            // Model
            Model.Item = Backbone.Model.extend({
                urlRoot : aurora.url + '/items'
            });

            // Collection
            Model.Collection = Backbone.Collection.extend({
                url : aurora.url + '/items',

                lite : function (fields) {
                    fields = fields || 'item_name,item_code,item_sku,description,unit_of_measure,item_cost,item_price,preparation_time,alert_level,max_stock,re_order_quantity,item_purchase_code,photo_url,tax_setting,is_public,status,a_href,a_area_id,a_area_name,a_status,assoc_href,assoc_associate_id,assoc_associate_name,assoc_associate_code,assoc_associate_type,assoc_physical_address,assoc_physical_city,assoc_physical_province,assoc_physical_zip_code,assoc_mailing_address,assoc_mailing_city,assoc_mailing_province,assoc_mailing_zip_code,assoc_email,assoc_phone,assoc_phone2,assoc_fax,assoc_remarks,assoc_photo_url,assoc_status';
                    this.url += '&fields=' + fields;
                },

                filterLink: function(modelId) {
                    var filtered = this.filter(function(model) {
                        return model.get('i_item_id') === modelId;
                    });
                    return filtered;
                }
            });

            //
            Model.MoveItem = Backbone.Model.extend({
                urlRoot : aurora.url + '/menu_category_items/',
                url : function (){
                    return this.urlRoot + this.get('menu_category_item_id') + '/priority_level'
                }
            });

            // Model
            Model.LinkItem = Backbone.Model.extend({
                urlRoot : aurora.url + '/menu_category_items'
            });

            // Collection
            Model.CategoryItem = Backbone.Model.extend({
                urlRoot : aurora.url + '/menu_category_items?mc_menu_category_id=',

                lite : function (fields) {
                    fields = fields || 'priority_level,mc_href,mc_menu_category_id,mc_menu_category_name,mc_status,i_href,i_item_id,i_item_name,i_item_code,i_item_sku,i_description,i_unit_of_measure,i_item_cost,i_item_price,i_preparation_time,i_alert_level,i_max_stock,i_re_order_quantity,i_item_purchase_code,i_photo_url,i_tax_setting,i_status';
                    this.url += '&fields=' + fields;
                },

                url : function (){
                    return this.urlRoot + this.get('mc_menu_category_id')
                }
            });

        });
    });
