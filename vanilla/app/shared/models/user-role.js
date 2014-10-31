/**
 *  User Role Model
 */

define( function () {
    return vanilla.app.module('UserRole.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/user_roles'
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/user_roles',

            lite : function (fields) {

                fields = fields || 'uc_href,uc_user_credential_id,uc_username,uc_last_activity,uc_status,r_href,r_role_id,r_role_name,r_status';
                this.url += '&fields=' + fields;

            }
        });

    });
});

