
    /**
     *  Associate Contact Model
     */

    define( function () {
        return vanilla.app.module('AssociateContact.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

            // Model
            Model.Item = Backbone.Model.extend({
                urlRoot : aurora.url + '/associate_contacts'
            });

            // Collection
            Model.Collection = Backbone.Collection.extend({
                url : aurora.url + '/associate_contacts'
            });

        });
    });
