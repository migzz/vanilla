
    /**
     *  Menu Category
     */

    define( function () {
        return vanilla.app.module('MenuCategory.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

            // Model
            Model.Item = Backbone.Model.extend({
                urlRoot : aurora.url + '/menu_categories'
            });

            // Collection
            Model.Collection = Backbone.Collection.extend({
                url : aurora.url + '/menu_categories',

                lite : function (fields) {
                    fields = fields || 'menu_category_name,is_public,status,a_href,a_area_id,a_area_name,a_status';
                    this.url += '&fields=' + fields;
                },

                filterLink: function(modelId) {
                    var filtered = this.filter(function(model) {
                        return model.get('mc_menu_category_id') === modelId;
                    });
                    return filtered;
                }
            });

            // Model
            Model.MoveItem = Backbone.Model.extend({
                urlRoot : aurora.url + '/menu_group_categories/',

                url : function (){
                    return this.urlRoot + this.get('menu_group_category_id') + '/priority_level'
                }
            });

            // Model
            Model.LinkItem = Backbone.Model.extend({
                urlRoot : aurora.url + '/menu_group_categories'
            });

            // Collection
            Model.GroupCategories = Backbone.Model.extend({
                urlRoot : aurora.url + '/menu_group_categories?mg_menu_group_id=',

                lite : function (fields) {
                    fields = fields || 'priority_level,mg_href,mg_menu_group_id,mg_menu_group_name,mg_priority_level,mg_status,mc_href,mc_menu_category_id,mc_menu_category_name,mc_status';
                    this.url += '&fields=' + fields;
                },

                url : function (){
                    return this.urlRoot + this.get('menu_group_id')
                }
            });

        });
    });
