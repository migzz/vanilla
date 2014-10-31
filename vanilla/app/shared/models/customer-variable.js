
    /**
     *      Customer Variable models
     */
    define( function () {
        return vanilla.app.module('CustomerVariable.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

            // Model
            Model.Item = Backbone.Model.extend({
                urlRoot     : aurora.url + '/customer_variables'
            });

            // Collection
            Model.Collection = Backbone.Collection.extend({
                url : aurora.url + '/customer_variables',

                lite : function (fields) {
                    fields = fields || 'variable_name,variable_value';
                    this.url += '&fields=' + fields;
                }
            });


        });
    });