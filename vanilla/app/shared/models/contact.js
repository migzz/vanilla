/**
 *  Contact Model
 */

define( function () {
    return vanilla.app.module('Contact.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/contacts'
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/contacts',

            lite : function (fields) {
                fields = fields || 'first_name,last_name,department,address,city,province,zip_code,email,phone,phone2,fax,instant_message_id,remarks,photo_url,is_public,status';
                this.url += '&fields=' + fields;
            }
        });

    });
});

