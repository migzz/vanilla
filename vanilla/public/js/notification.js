    /**
     * Created by Migeru on 9/7/14.
     */

    /*
     * Notification
     */

    //
    define ([], function () {

        //
        vanilla.ui.notification = {

            // notification-container > ul
            $el : 0,

            //
            options : {
                isEmpty : true,
                isInitialized : false,
                recursionTimer : 0
            },

            // initialize notification
            initialize : function () {

                // add notification container to DOM
                $('body').append('<div class="notification-container"><ul></ul></div>');

                // cache
                var $notification = this;

                // set element
                $notification.$el = $('.notification-container > ul');

                // hover mouseenter events
                $notification.$el.on('mouseenter',function () {

                        // pause recursion
                        clearTimeout($notification.options.recursionTimer);
                    })

                    // hover mouseleave events
                    .on('mouseleave',function () {

                        //
                        clearTimeout($notification.options.recursionTimer);

                        // continue recursion
                        $notification.options.recursionTimer = setTimeout(function () {

                            //
                            $notification.clear();
                            //$notification.loop()
                        }, 1000);

                    });

                //
                $notification.options.isInitialized = true;
            },

            // remove notification on click
            checkInitialize : function () {
                var $this = this;

                // if not yet initialized
                if ($this.options.isInitialized == false) {
                    $this.initialize();
                }

            },

            // render notification
            render : function (message, icon) {

                // cache
                var $notification = this,

                // template
                item = '<li><div>' +
                    '<div class="notification-icon">{icon}</div>' +
                    '<div class="notification-message">{message}</div>' +
                    //'<div class="notification-action"><i class="fa fa-times"></i></div>' +
                    '</div></li>',
                icon = icon || '<i class="fa-exclamation-triangle fa"></i>',
                message = message || 'Loading the Loading message..';

                // if not yet initialized
                $notification.checkInitialize();

                // default values
                /*data = data || {
                    icon : icon,
                    message : message
                };
                data.icon = data.icon || icon;
                data.message = data.message || message;*/

                // replace data
                item = item.replace(/{icon}/, icon)
                    .replace(/{message}/, message);

                // prepend to DOM
                this.$el.prepend(item);

                //
                var $newNotification = $notification.$el.find('li:first-of-type');

                // show notification and set height for animation
                setTimeout(function () {
                    $newNotification.addClass('show');

                    $newNotification.css({
                        'height' : + $newNotification.height() + 'px'
                    });

                }, 100);

                // event
                $newNotification.on('click', function () {
                    $notification.remove(this);
                });

                // if recursion not active
                if ($notification.options.isEmpty) {

                    //
                    $notification.options.isEmpty = false;

                    //
                    clearTimeout($notification.options.recursionTimer);

                    $notification.options.recursionTimer = setTimeout(function () {
                        $notification.clear();
                        //$notification.loop()
                    }, 3000);

                }

            },

            // remove notification on click
            remove : function ($item) {

                // cache
                var $notification = this;

                //
                clearTimeout($notification.options.recursionTimer);

                //
                $item = $($item);

                //
                $item.toggleClass('show remove').attr('style', '');

                //
                setTimeout(function () {
                    $item.remove();

                    // exit when notification count is less 1
                    if ($notification.$el.find('li').length < 1){
                        $notification.options.isEmpty = true;
                    }
                }, 300);
            },

            // remove notification loop
            clear : function () {

                // cache
                var $notification = this;

                //
                var $lastItem = $notification.$el.find('li:last-child');

                $lastItem.toggleClass('show remove').attr('style', '');

                setTimeout(function () {
                    $lastItem.remove();

                    // exit
                    if ($notification.$el.find('li').length < 1){
                        $notification.options.isEmpty = true;
                        return false;
                    }

                    // recursion
                    $notification.options.recursionTimer = setTimeout(function () {
                        $notification.clear();
                    }, 2700);

                }, 300);

            },

            // loop test
            loop : function () {

                // cache
                var $notification = this,

                    //
                    $lastItem = $notification.$el.find('li:last-child'),

                    //
                    messages = window.loadingMessage,

                    //
                    images = [
                        '<div class="notification-img"></div>',
                        '<div class="notification-img test"></div>',
                        '<i class="fa-exclamation-triangle fa"></i>',
                        '<i class="fa fa-truck"></i>',
                        '<i class="fa fa-times"></i></i>'
                    ];

                //
                $lastItem.toggleClass('show remove');

                //
                setTimeout(function () {
                    $lastItem.remove();

                    //
                    $notification.render({
                        icon:images[random(0, images.length)],
                        message : messages[random(0, messages.length)]
                    });

                    // recursion
                    $notification.options.recursionTimer = setTimeout(function () {
                        $notification.loop();
                    }, 1700);

                }, 300);

            }

        };

        //
        return vanilla.ui.notification;
    });
