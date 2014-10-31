/**
 * Created by migz on 6/13/14.
 */


    /**
     *  Roles Model
     */

    define( function () {
        return vanilla.app.module('Role.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

            // Model
            Model.Item = Backbone.Model.extend({
                urlRoot : aurora.url + '/roles'
            });

            // Model
            Model.ItemAccess = Backbone.Model.extend({
                urlRoot : aurora.url + '/roles/',
                url : function (){
                    return this.urlRoot + this.get('role_id') + '/?_access=show'
                }
            });


            // Collection
            Model.Collection = Backbone.Collection.extend({
                url : aurora.url + '/roles',

                lite : function (fields) {
                    fields = fields || 'role_name,is_public,status';
                    this.url += '&fields=' + fields;
                }
            });

            // Change status of role
            Model.ChangeStatus = Backbone.Model.extend({
                urlRoot : aurora.url + '/roles/',
                url : function (){
                    return this.urlRoot + this.get('role_id') + '/status'
                }
            });

        });
    });