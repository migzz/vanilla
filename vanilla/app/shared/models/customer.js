/**
 *  Customer Model
 */

define( function () {
    return vanilla.app.module('Customer.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/customers'
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/customers',

            lite : function (fields) {
                fields = fields || 'customer_code,title,first_name,last_name,date_of_birth,address,city,province,zip_code,alt_address,alt_city,alt_province,alt_zip_code,email,phone,phone2,remarks,photo_url,status';
                this.url += '&fields=' + fields;
            }
        });

    });
});



