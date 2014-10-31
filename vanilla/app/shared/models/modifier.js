/**
 *  Modifier Model
 */

define( function () {
    return vanilla.app.module('Modifier.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/modifiers'
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/modifiers',

            lite : function (fields) {
                fields = fields || 'modifier_name,selection_type,modifier_type,is_public,status';
                this.url += '&fields=' + fields;
            }
        });

    });
});

