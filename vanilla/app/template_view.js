/**
 *  Pin
 */

(function () {

    // region for layout collection
    var region_default = 'region_main',

    // this module name like vanilla.app.BranchVariable
        module_name      = 'Pin',

    //
        template_path    = vanilla.path.requireText + '/app/shared/templates/';


    define([template_path + '/pin.html'], function (pinTemplate) {

        //
        return vanilla.app.module(module_name + '.View', function ( View, App, Backbone, Marionette, $, _ ) {

            var $this = vanilla.app[module_name];

            // Item View
            View.PinView = Marionette.ItemView.extend({

                template  : _.template( pinTemplate ),

                className : 'vanilla-pin',

                events : {
                    'click .pad-number'    : 'padInput',
                    'click .button-erase'    : 'erasePin',
                    'click .button-save'    : 'sendPin'
                },

                padInput : function (e) {

                    var pin = this,
                        pinHidden = pin.$el.find('[name=pin_code]'),
                        pinDisplay = pinHidden.next(),
                        pinDisplayValue = pinDisplay.val();

                    //
                    if ($this.pinCode.length >= 4) return false;

                    //
                    $this.pinCode += e.target.innerText;
                    pinDisplayValue += '*';

                    //
                    pinDisplay.val(pinDisplayValue);

                    return false;
                },

                erasePin : function () {

                    var pin = this,
                        pinHidden = pin.$el.find('[name=pin_code]'),
                        pinDisplay = pinHidden.next(),
                        pinDisplayValue = pinDisplay.val();

                    //
                    if ($this.pinCode.length < 1) return false;

                    //
                    pinDisplayValue = pinDisplayValue.substr(0,pinDisplayValue.length-1);
                    $this.pinCode = $this.pinCode.substr(0,$this.pinCode.length-1);

                    //
                    pinDisplay.val(pinDisplayValue);

                    return false;
                },

                sendPin : function () {

                    /* check if user is already logged in
                     check if user is authorized
                     add a flag so even if user disable the model, user still cant do anything
                     */

                    alert('send_pin');

                    return false;
                }

            });

        }); /* code_ */

    });
    /* encapsulate */
})();