/**
 * Created by Migeru on 7/20/14.
 */
/**
 *  TaxProfile Model
 */

define( function () {
    return vanilla.app.module('TaxProfile.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/tax_profiles'
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/tax_profiles',

            lite : function (fields) {

                fields = fields || 'tax_profile_name,is_public,status';
                this.url += '&fields=' + fields;

            }
        });

    });
});
