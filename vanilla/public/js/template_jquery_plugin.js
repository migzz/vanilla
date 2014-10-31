// encapsulate like marionette module
(function ($) {

    $.fn.dropdown = function(options) {

        this.id = 0;

        // defaults
        this.options = $.extend({
            template : '<div class="dropdown"><input class="dropdown-toggle" type="checkbox"><div class="dropdown-value">{value</div><ul class="dropdown-options">{options}</ul><i class="fa fa-chevron-down dropdown-arrow"></i></div>'
        }, options );

        //
        this.init = function () {
            var $this = this;
            //
            $this.id = $this.attr('id');
            console.log($this);

        };

        //
        this.init();

//        Dialog.render('alert', {message: 'I like turtles. <select id="dropdown-id"><option>Potato</option><option>Poop</option><option>Migz</option></select>',title: 'Woohhooo!', alert : 'error'}, {modeless : false})

        //
        return this[0];

    };

})($);
