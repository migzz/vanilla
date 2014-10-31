/**
 *  User Credential Model
 */

define( function () {
    return vanilla.app.module('UserCredential.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/user_credentials'
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/user_credentials',

            lite : function (fields) {

                fields = fields || 'username,pin_code,last_activity,status,u_href,u_user_id,u_designation,u_employee_id,u_first_name,u_last_name,u_address,u_city,u_province,u_zip_code,u_email,u_phone,u_phone2,u_remarks,u_photo_url,u_status';
                this.url += '&fields=' + fields;

            }
        });

        // Login user
        Model.UserLogin = Backbone.Model.extend({
            urlRoot     : aurora.url + '/user_credentials/login'
        });

        // List of user on a branch
        Model.BranchUsers = Backbone.Model.extend({
            urlRoot     : aurora.url + '/user_credentials/list'
        });

    });
});

