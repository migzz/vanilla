/**
 * Created by migz on 6/21/14.
 */

function NoClickDelay(el) {
    this.element = typeof el == 'object' ? el : document.getElementById(el);
    if( window.Touch ) this.element.addEventListener('touchstart', this, false);
}

NoClickDelay.prototype = {
    handleEvent: function(e) {
        switch(e.type) {
            case 'touchstart': this.onTouchStart(e); break;
            case 'touchmove': this.onTouchMove(e); break;
            case 'touchend': this.onTouchEnd(e); break;
        }
    },

    onTouchStart: function(e) {
        e.preventDefault();
        this.moved = false;

        this.theTarget = document.elementFromPoint(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
        if(this.theTarget.nodeType == 3) this.theTarget = theTarget.parentNode;
        this.theTarget.className+= ' pressed';

        this.element.addEventListener('touchmove', this, false);
        this.element.addEventListener('touchend', this, false);
    },

    onTouchMove: function(e) {
        this.moved = true;
        this.theTarget.className = this.theTarget.className.replace(/ ?pressed/gi, '');
    },

    onTouchEnd: function(e) {
        this.element.removeEventListener('touchmove', this, false);
        this.element.removeEventListener('touchend', this, false);

        if( !this.moved && this.theTarget ) {
            this.theTarget.className = this.theTarget.className.replace(/ ?pressed/gi, '');
            var theEvent = document.createEvent('MouseEvents');
            theEvent.initEvent('click', true, true);
            this.theTarget.dispatchEvent(theEvent);
        }

        this.theTarget = undefined;
    }
};


//new NoClickDelay(document.getElementById('vanilla'));

/**
 *  dialog
 */

(window.dialog = {

    /**
     * container
     *   :before:overlay
     *   content container
     *     title
     *     content
     *   action
     */

    close : function () {
        // add blur to #vanilla
        $('#vanilla').removeClass('blur');

        //
        $('.dialog').removeClass('show');

        setTimeout(function(){
            $('body .dialog').remove();
        }, 210);
    },

      closeEvent : function () {
        // close event
        $('.dialog').on('click', function (e) {
            e.preventDefault();

            //
            if (dialog.required == false){
                dialog.close();
            }

            else {
                // shake
            }

        });

          $('.dialog-container').on('click', function (e) {
              e.stopPropagation();
          });
    },

    //
    callFunction : function (foo, model){

        if ( foo != null) {
            foo(model);
        }
        //trace('callback: ' + model || '-');
        //alert('callback');

    },
    required : false,

    // {title}, {content}, {action}
    template : '<div class="dialog"><div><div class="dialog-container"><h3 class="dialog-title">{title}</h3><p class="dialog-content">{content}</p><div class="dialog-action">{action}</div></div></div></div>',

    //
    confirm : function (title, message, callback, model, action, modelType) {

        action = action || '<button class="yes"><i class="fa fa-check"></i> Yes</button><button class="cancel"><i class="fa fa-times"></i> No</button>';

        dialog.render(title, message, action, callback, model, modelType, 'confirm');

    },

    //
    input : function (title, message, type, callback, model, modelType) {

        var input = '';
        switch (type){
            case '':
                break;

            default:
        }

        var action = '<button><i class="fa fa-check"></i> Ok</button><button class="cancel"><i class="fa fa-times"></i> Cancel</button>';

        dialog.render(
            title,
            '<label>' + (message || '') + '<input type="' + type + '"/></label>',
            action,
            callback,
            model,
            modelType,
            'input'
        );
        //(title, content, action, callback, model, modelType, dialogType)
    },

    //
    alert : function (title, message) {

        var action = '<button><i class="fa fa-check"></i> Ok</button>';

        dialog.render(title, message, action);

    },

    //
    loader : function (title) {

        var action = '';

        dialog.render(title, '', action);

        setTimeout(function () {
            NProgress.start('.dialog-content');
        }, 300);

    },


    //
    render : function (title, content, action, callback, model, modelType, dialogType) {

        action  = action || '<button><i class="fa fa-check"></i> Close</button>';
        title   = title || 'vanilla.app';
        content = content || 'Hello.';

        //
        switch (dialogType){

            //
            case 'confirm':
                break;

            //
            case 'input':
                break;

            //
            case 'alert':
                break;

            //
            case 'loader':
                break;

            //
            default:

        }

        //
        var template = dialog.template
                        .replace(/{title}/,title)
                        .replace(/{content}/,content)
                        .replace(/{action}/,action);

        // append to body hidden
        $('body .dialog').remove();

        $('body').append(template);

        //
        var $dialog  = $('.dialog');

        $dialog.find('.dialog-container').css({
            'max-width':$('.dialog .dialog-content').outerWidth() + 'px'
        });

        // show
        setTimeout(function(){

            // add blur to #vanilla
            // $('#vanilla').addClass('blur');

            //
            $dialog.addClass('show');

        }, 100);

        // close event
        dialog.closeEvent();

        //todo add Callback
        $('.dialog-action button').on('click', function (e) {
            e.stopPropagation();

            var inputValue = $('.dialog-content input').val();

           switch (e.currentTarget.className){

               case 'Yes':
                   break;
               default:
                   dialog.close();

           }

            //trace(e.currentTarget.className);

            // TODO optimize / what model / data / a string/ an object?

            if ( inputValue != null && model == null) {
                model = {
                    department_name : inputValue,
                    is_public : 'N'
                };
            }

            else {
                model.set({
                    department_name : inputValue
                });
            }

            // TODO no call back if cancel

            //trace(inputValue);

            //
            switch (dialogType){

                //
                case 'confirm':
                    break;

                //
                case 'input':
                    break;

                //
                case 'alert':
                    break;

                //
                case 'loader':
                    break;

                //
                default:

            }

            //
            if(e.currentTarget.className != 'cancel') dialog.callFunction(callback, model)
        });




        // TODO add FOCUS
    }
});


/**
 *  Custom dropdown
 */
/**
 * dropme
 */
(window.dropme = function () {

    // get all select
    var $target = $('select'),
        $select = {},
        id = 0;

    for (i = 0; i < $target.length; i++) {
        $select = $($target[i]);
        // if no target, apply to all
        $select = ($select != null) ? $select : false;

        // no id
        if ($select == false) return false;

        // get target id
        id = $select.attr('id') || 'no-id';

        // used for max width
        var longText = 0,

        //
            disabled = false,

        // template
            template = '<div class="' + id + ' select list-container close">';

        // toggle and placeholder
        template = template.concat('<input class="select-toggle" type="checkbox"/>');

        // if$target[index].attr('placeholder')

        // $select[0].selectedIndex
        //console.log($select.context[$select.context.selectedIndex].innerText);

        //window.drop = $select.context[$select.context.selectedIndex];
        // if selected index == 0 and has placeholder show placeholder

        // template = template.concat('<div class="list-title box">' + (($select.attr('placeholder') != null) ? $select.attr('placeholder') : $select.find('option:first-of-type').html()) + '</div>');
        template = template.concat('<div class="list-title box">' + $select.context[$select.context.selectedIndex].innerText + '</div>');

        // placeholder on list
        template = template.concat('<ul class="list-option">');

        if ($select.attr('placeholder') != null) {
            // placeholder on list
            template = template.concat('<li class="placeholder">' + $select.attr('placeholder') + '</li>');
        }

        var index = 1;
        // get options and concat it to our template


        $select.find('option').each(function () {

            //
            var $this = $(this);

            template = template.concat('<li data-index="' + index++ + '">' + $this.html() + '</li>');
        });

        // concat dropdown arrow
        template = template.concat('</ul><i class="fa fa-chevron-down dropdown-arrow"></i></div>');

        // insert where our target is located
        $(template).insertAfter($select);

        // remove our target
        $select.hide();


        var $customSelect = $('.' + id);

        //
        $customSelect.find('li').each(function () {
            var $this = $(this);

            var width = $this.outerWidth() + parseInt($this.css('padding-left')) +
                parseInt($this.css('padding-right')) +
                parseInt($this.css('border-left-width')) +
                parseInt($this.css('border-right-width'));

            if (longText < width) longText = width;

        });

        longText += 15;
        $customSelect.css({
            'min-width': longText  + 'px'
        });

        $customSelect.find('.list-option').addClass('block');
    }


    // events

    $('.select .list-option li').off('click').on('click', function (e) {

        var $this = $(this);
        var $customSelect = $this.offsetParent().offsetParent();

        // if option selected has placeholder do nothing
        if ($this.hasClass('placeholder')) return false;

        //console.log(e);

        // show selected
        $customSelect.find('.list-title').html($this.html());

        // has placeholder
        if ($this.parent().find('li:first-of-type').hasClass('placeholder')) {
            $customSelect.parent().find($customSelect).prev().find('option:nth-child(' + ($this.index()) + ')').prop('selected', 'selected');
        }

        else {
            // select the original select
            $customSelect.parent().find($customSelect).prev().find('option:nth-child(' + ($this.index() + 1) + ')').prop('selected', 'selected');
        }

        // close select
        $customSelect.find('.select-toggle').prop('checked', false);

    });

    // close on mouse up
    $('body').off('mouseup').on('mouseup', function (e) {

        if ($(e.srcElement).attr('class') != 'select-toggle' && $(e.srcElement).parent().attr('class') != 'list-option') {
            $('.select .select-toggle').prop('checked', false);
        }

        else {
            // not the target
            var $target = $(e.srcElement).parent().attr('class');
            $('.select:not(.' + $target + ') .select-toggle').prop('checked', false);

        }

    });

    //$('select').show();
}); // dropme

