

    /**
     *      User models
     */

    define( function () {
        return vanilla.app.module('User.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

            // Model
            Model.Item = Backbone.Model.extend({
                urlRoot : aurora.url + '/users'
            });

            // Collection
            Model.Collection = Backbone.Collection.extend({
                url : aurora.url + '/users',

                lite : function (fields) {

                    fields = fields || 'designation,employee_id,first_name,last_name,address,city,province,zip_code,email,phone,phone2,remarks,photo_url,status,uc_href,uc_user_credential_id,uc_username,uc_last_activity,uc_status,d_href,d_department_id,d_department_name,d_status,s_href,s_shift_id,s_shift_name,s_start_time,s_end_time,s_status';
                    this.url += '&fields=' + fields;

                }
            });

            // Collection
            Model.UserCollection = Backbone.Collection.extend();

        });
    });