
    /**
     *      Branch Variable models
     */
    define( function () {
        return vanilla.app.module('BranchVariable.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

            // Model
            Model.Item = Backbone.Model.extend({
                urlRoot     : aurora.url + '/branch_variables'
            });

            // Collection
            Model.Collection = Backbone.Collection.extend({
                url : aurora.url + '/branch_variables',

                lite : function (fields) {
                    fields = fields || 'variable_name,variable_value';
                    this.url += '&fields=' + fields;
                }
            });


        });
    });