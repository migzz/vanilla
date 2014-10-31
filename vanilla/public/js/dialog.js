
// encapsulate like marionette module
(function () {

    //
    return Dialog = {

        //
        el : 0,

        //
        template : '<div class="dialog-container"><div class="dialog-content">{content}<button class="close-dialog hidden"><i class="fa fa-times"></i></button></div></div>',

        // default options
        defaults : {
            modeless : false
        },

        //
        options : this.defaults,

        //
        setEl : function () {
            this.el = $('.dialog-container');

            // set events
            this.events();
        },

        //
        setOptions : function (options) {
            var $this = this;
            $this.options = options || $this.defaults;
        },

        //
        events : function () {
            this.el.off('click').on('click', function (event) {

                // allow close dialog when we click overlay
                if (Dialog.options.modeless == true && event.currentTarget == event.target ) {
                    Dialog.close();
                }

                // return false;
            });

            // close dialog via button
            this.el.find('.close-dialog').on('click', function () {
                Dialog.close();
                return false;
            });
        },

        // compose dialog
        render : function (type, content, options) {

            var $body = $('body');

            // set options
            this.setOptions(options);

            // close existing dialog
            if ( this.el.length > 0) {
                this.close(true);
            }

            //
            switch (type) {
                case 'alert':

                    content = content || {
                        message : 'This is an Alert dialog.',
                        title : 'Alert!',
                        alert : ''
                    };

                    var template = '<div><div class="dialog-title {alert}">{title}</div><div class="dialog-message">{message}</div>';

                    content = template.replace(/{message}/, content.message)
                                      .replace(/{title}/, content.title)
                                      .replace(/{alert}/, content.alert);

                    break;
                default:
                    content = content || 'This is a dialog.';
            }

            // append to dom
            content = this.template.replace(/{content}/, content);

            $body.append(content);

            //
            this.show();

        },

        // get jquery el, animate
        show : function () {

            // get el
            this.setEl();

            //
            setTimeout( function () {

                Dialog.el.addClass('show-dialog');

                if ( Dialog.options.callback != null ) {
                    Dialog.options.callback();
                }

            }, 100);
        },

        // animate
        hide : function () {
            this.el.removeClass('show-dialog');
        },

        // on destroy
        close : function (dialogExist) {

            // if already exist
            if ( dialogExist ) {

                // destroy dialog
                this.destroy();

            }

            //
            else {
                // hide animation
                if ( this.el.length > 0) {
                    this.hide();
                }

                // destroy dialog
                setTimeout( function () {
                    Dialog.destroy();
                }, 200);
            }

        },

        // remove from dom, set to null
        destroy : function () {
            this.el.remove();
            this.el = 0;
        }

    }; /* dialog_end */

})(); /* code_end */
