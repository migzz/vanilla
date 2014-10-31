
    /**
     *      Location Variable models
     */
    define( function () {
        return vanilla.app.module('LocationVariable.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

            // Model
            Model.Item = Backbone.Model.extend({
                urlRoot     : aurora.url + '/location_variables'
            });

            // Collection
            Model.Collection = Backbone.Collection.extend({
                url : aurora.url + '/location_variables',

                lite : function (fields) {
                    fields = fields || 'variable_name,variable_value,l_href,l_location_id,l_location_name,l_max_covers,l_remarks,l_condition_status,l_status';
                    this.url += '&fields=' + fields;
                }
            });


        });
    });