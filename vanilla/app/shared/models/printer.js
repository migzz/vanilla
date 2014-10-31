/**
 *  Printer Model
 */

define( function () {
    return vanilla.app.module('Printer.Model', function ( Model, App, Backbone, Marionette, $, _ ) {

        // Model
        Model.Item = Backbone.Model.extend({
            urlRoot : aurora.url + '/printers'
        });

        // Collection
        Model.Collection = Backbone.Collection.extend({
            url : aurora.url + '/printers',

            lite : function (fields) {
                fields = fields || 'printer_name,data_type,printer_address,parameter_name,printer_type,status';
                this.url += '&fields=' + fields;
            }
        });

    });
});

