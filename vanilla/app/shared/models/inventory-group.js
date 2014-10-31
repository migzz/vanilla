/**
 *  Inventory Group Model
 */

define( function () {
    return vanilla.app.module('InventoryGroup.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/inventory_groups'
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/inventory_groups',

            lite : function (fields) {
                fields = fields || 'inventory_group_name,is_public,status';
                this.url += '&fields=' + fields;
            }
        });

    });
});

