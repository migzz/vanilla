/**
 * Created by Migz on 7/11/14.
 */


/**
 *  Roles Model
 */

define( function () {
    return vanilla.app.module('RoleAccess.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/role_accesses'
        });

        // Model
        Model.Item_ = Backbone.Model.extend({
            urlRoot : aurora.url + '/role_accesses'
        });

        // Model
        Model.Access = Backbone.Model.extend({
            urlRoot : aurora.url + '/role_accesses?r_role_id=',
            url : function (){
                return this.urlRoot + this.get('r_role_id')
            }
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/role_accesses',

            lite : function (fields) {

                fields = fields || 'access_code,r_role_id';
                this.url += '&fields=' + fields;

            },

            getAccess : function(roleId) {
                return this.where({ r_role_id : roleId});
            },

            setRoleId : function () {
                return this.set({'role_id' : this.get('id')})
            },

            save : function (options) {
                return Backbone.sync("create", this, options);
                l('collection_save');
            },

            update : function (options) {
                return Backbone.sync('create', this, {
                    success: function(){
                        console.log('collection_saved');
                    }
                });
            },

            filterByRole : function(roleId) {
                return this.where({ r_role_id : roleId});
            },

            filterAccess : function(roleId, module) {
                return this.where({
                    r_role_id : roleId,
                    module_id : module
                });
            }
        });

        // Change status of role
        Model.ChangeStatus = Backbone.Model.extend({
            urlRoot : aurora.url + '/role_accesses',
            url : function (){
                return this.urlRoot + '/' + this.get('role_id') + '/status'
            }
        });

    });
});
