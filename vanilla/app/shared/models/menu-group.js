
    /**
     *  Menu Group
     */

    define( function () {
        return vanilla.app.module('MenuGroup.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

            // Model
            Model.Item = Backbone.Model.extend({
                urlRoot : aurora.url + '/menu_groups'
            });

            // Model
            Model.MoveItem = Backbone.Model.extend({
                urlRoot : aurora.url + '/menu_groups/',
                url : function (){
                    return this.urlRoot + this.get('menu_group_id') + '/priority_level'
                }
            });

            // Collection
            Model.Collection = Backbone.Collection.extend({
                url : aurora.url + '/menu_groups',

                lite : function (fields) {
                    fields = fields || 'priority_level,mg_href,mg_menu_group_id,mg_menu_group_name,mg_priority_level,mg_status,mc_href,mc_menu_category_id,mc_menu_category_name,mc_status';
                    this.url += '&fields=' + fields;
                },

                comparator : function(model) {
                    return model.get("priority_level");
                },

                initialize : function () {
                    //this.sort();
                }
            });


        });
    });
