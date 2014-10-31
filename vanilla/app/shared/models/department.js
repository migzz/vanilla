
    /**
     *  Department Model
     */

    define( function () {
        return vanilla.app.module('Department.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

            // Model
            Model.Item = Backbone.Model.extend({
                urlRoot : aurora.url + '/departments'
            });

            // Collection
            Model.Collection = Backbone.Collection.extend({
                url : aurora.url + '/departments',

                lite : function (fields) {
                    fields = fields || 'department_name,is_public,status';
                    this.url += '&fields=' + fields;
                }
            });

        });
    });