/* Pin */

(function () {
    /* local setting */

    // region for layout collection
    var region_default = 'region_main',

    // this module name like vanilla.app.BranchVariable
        module_name      = 'Pin',

        model_name      = 'pin';

    define([model_name + '_view'], function (View) {

        //
        return vanilla.app.module(module_name, function ( Pin, App, Backbone, Marionette, $, _ ) {

            // private
            var $this = this;

            //
                $this.pinCode = '';

            /* render */
            $this.renderPin = function (access, region) {

                // instantiate view
                var pinView = new View.PinView();

                // render to region
                App.renderRegion(region, pinView);

            }


        }); /* code_ */

    });

    /* encapsulate */
})();