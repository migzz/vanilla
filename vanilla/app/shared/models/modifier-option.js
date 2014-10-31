/**
 *  Modifier Option Model
 */

define( function () {
    return vanilla.app.module('ModifierOption.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/modifier_options'
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/modifier_options',

            lite : function (fields) {
                fields = fields || 'modifier_option_name,print_label,price_change,photo_url,priority_level,status,m_href,m_modifier_id,m_modifier_name,m_selection_type,m_modifier_type,m_status,fm_href,fm_modifier_id,fm_modifier_name,fm_selection_type,fm_modifier_type,fm_status';
                this.url += '&fields=' + fields;
            }
        });

    });
});

