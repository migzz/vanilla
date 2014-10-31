
    /**
     *  Associate Model
     *  Created by Migeru on 7/20/14.
     */

    define( function () {
        return vanilla.app.module('Associate.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

            // Model
            Model.Item = Backbone.Model.extend({
                urlRoot : aurora.url + '/associates'
            });

            // Collection
            Model.Collection = Backbone.Collection.extend({
                url : aurora.url + '/associates',

                lite : function (fields) {

                    fields = fields || 'associate_name,associate_code,associate_type,physical_address,physical_city,physical_province,physical_zip_code,mailing_address,mailing_city,mailing_province,mailing_zip_code,email,phone,phone2,fax,remarks,photo_url,is_public,status';
                    this.url += '&fields=' + fields;

                }
            });

        });
    });
