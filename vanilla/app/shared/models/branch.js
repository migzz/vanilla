/**
 * Created by migz on 5/24/14.
 */

    /**
     *      Branch models
     */
    define( function () {
        return vanilla.app.module('Branch.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

            // Model
            Model.Item = Backbone.Model.extend({
                urlRoot     : aurora.url + '/branches'
            });

            // Collection
            Model.Collection = Backbone.Collection.extend({
                url : aurora.url + '/branches',

                lite : function (fields) {
                    fields = fields || 'host_address,branch_code,branch_name,address,city,province,zip_code,country,email,phone,phone2,fax,website,general_manager,photo_url,status';
                    this.url += '&fields=' + fields;
                }
            });

            // Change status of role
            Model.BranchSelection = Backbone.Model.extend({
                url : aurora.url + '/branches/list'
            });

        });
    });