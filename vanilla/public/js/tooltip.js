    /**
     * Created by Migeru on 9/7/14.
     */

    /*
     * Tool Tip
     */

    //
    define ([], function () {

        //
        vanilla.ui.tooltip = {

            // tooltip-container > ul
            $el : 0,

            //
            options : {
                isInitialized : false
            },

            // initialize tooltip
            initialize : function () {

                var $tooltip = this;

                // set element
                $tooltip.$el = $('.tooltip-container');

                //
                $tooltip.options.isInitialized = true;
            },

            // remove notification on click
            checkInitialize : function () {
                var $this = this;

                // if not yet initialized
                if ($this.options.isInitialized == false) {
                    $this.initialize();
                }

            },

            // remove notification on click
            setItemOptionPosition : function (target) {

                var $this = this,
                    itemOption = $('.item-option'),
                    targetX = 0,
                    targetY = 0;

                // left
                    targetX = target.offset().left - 9,

                // right
                    targetX = target.offset().left + ( target.width() / 2 ),

                // bottom
                    targetY = target.offset().top + target.outerHeight();

                // bottom right
                itemOption.css({
                    'top':targetY + 'px',
                    'left':targetX + 'px'
                });

                // add delay to show animation
                setTimeout(function () {
                    //
                    itemOption.addClass('show');
                }, 300);

            },

            // item options
            itemOption : function (Model, itemModel, itemModelIdName, itemView) {
                var $this = this,
                    template = '<ul class="item-option tooltip-container bottom right">' +
                    '<li><div class="edit-item"><i class="fa fa-pencil"></i> <span>Edit</span></div></li>' +
                    '<li><div class="delete-item"><i class="fa fa-trash"></i> <span>Delete</span></div></li>' +
                    '</ul>',

                    //
                    $itemOption = $('.item-option'),

                    ItemOption = Marionette.ItemView.extend({

                        template : _.template( template ),

                        events : {
                            'click .edit-item' : 'editItem',
                            'click .delete-item' : 'deleteItem'
                        },

                        editItem : function () {

                            //
                            Model.renderEditModel(itemModel, itemView);

                            //
                            $itemOption.removeClass('show');

                            setTimeout(function () {
                                itemOptionView.close();
                            }, 100);

                        },

                        deleteItem : function () {

                            itemModel.set({
                                id : itemModel.get(itemModelIdName)
                            });

                            Model.destroy(itemModel);

                            //
                            $itemOption.removeClass('show');

                            setTimeout(function () {
                                itemOptionView.close();
                            }, 100);

                        }

                    }),

                //
                itemOptionView = new ItemOption();

                // if not yet initialized
                $this.checkInitialize();

                //
                $itemOption.parent().remove();

                // prepend to DOM
                $('body').prepend(itemOptionView.render().el);

                // TODO
                this.setItemOptionPosition(itemView);
/*
               setTimeout(function () {
                    //
                    $itemOption.addClass('show');

                }, 100);*/

            },

            // render notification
            simple : function (message, icon) {

                // Template
                var $this = this,

                    template = '<div class="tooltip-container bottom right"><div class="tooltip-content">' +
                                '<div class="tooltip-icon">{icon}</div>' +
                                '<div class="tooltip-message">{message}</div>' +
                            '</div></div>',

                    //
                icon = icon || '<i class="fa-exclamation-triangle fa"></i>',

                //
                message = message || 'It\'s a trap!..';

                // if not yet initialized
                $this.checkInitialize();

                // replace data
                template = template.replace(/{icon}/, icon)
                    .replace(/{message}/, message);

                // prepend to DOM
                $('body').prepend(template);


                // TODO check if tooltip overflows, re-position on resize
                var $tooltip = $('.tooltip-container');

                var target = $('.dashboard.dashboard-menu'),

                    // left
                    targetX = target.offset().left - 9,

                    // right
                    targetX = target.offset().left - ($tooltip.width() - 29 ) ,

                    // bottom
                    targetY = target.offset().top + target.outerHeight() + 6;


                // bottom right
                $tooltip.css({
                    'top':targetY + 'px',
                    'left':targetX + 'px'
                });

                // add delay to show animation
                setTimeout(function () {
                    //
                    $tooltip.addClass('show');
                }, 300);

            },

            // remove notification on click
            hide : function ($item) {

                //
            }
        };

        //
        return vanilla.ui.tooltip;
    });
