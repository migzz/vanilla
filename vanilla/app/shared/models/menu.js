
/**
 *  Menu Model
 */

define( function () {
    return vanilla.app.module('Menu.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/menu_groups'
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/menu_groups',

            lite : function (fields) {
                fields = fields || 'menu_group_name,priority_level,is_public,status';
                this.url += '&fields=' + fields;
            }
        });

    });
});

