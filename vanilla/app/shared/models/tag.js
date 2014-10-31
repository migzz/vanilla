/**
 *  Tag Model
 */

define( function () {
    return vanilla.app.module('Tag.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/tags'
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/tags',

            lite : function (fields) {

                fields = fields || 'tag_name';
                this.url += '&fields=' + fields;

            }
        });

    });
});

