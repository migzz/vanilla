// encapsulate like marionette module
(function ($) {

    $.fn.dropdown = function(options) {

        this.id = 0;
        this.$el = 0;
        this.el = 0;

        this.template = '<div data-value="{value}" data-dropdown="{dropdown}" class="dropdown"><input class="dropdown-toggle" type="checkbox"><div class="dropdown-value">{value}</div><ul class="dropdown-options">{options}</ul><i class="fa fa-chevron-down dropdown-arrow"></i></div>';

        // defaults
        this.options = $.extend({

        }, options );

        //
        this.init = function () {
            var $this = this;

            $this.$el = $($this);

            //
            $this.id = $this.attr('id');

            var opt = '',
                index = 0;

            //
            $this.find('option').each( function () {
                var $el = this;
                opt = opt.concat('<li data-index="' + index++ + '" data-option="' + $el.value + '">' + $el.text + '</li>');

            } );

            //
            $this.render(opt);

        };

        //
        this.render = function (opt) {

            var $this = this;

            var dropdown = $this.template
                            .replace(/{dropdown}/, $this.id)
                            .replace(/{options}/, opt)
                            .replace(/{value}/g, $this.val());

            //
            $this.hide();

            //
            $(dropdown).insertAfter($this);

            //
            $this.events();

            // this[0].selectedIndex
            // this[0].selectedOptions[0]

        };

        //
        this.events = function () {
            var $this = this;

            //
            $this.el = $('[data-dropdown=' + $this.id || 0 + ']');

            $this.el.on('click', function () {
                $('.dropdown').css({
                    'z-index' : ''
                });
                $this.el.css({
                    'z-index' : '10'
                });
            });

            $this.el.css({
                'width' : ($this.el.find('li')[0].clientWidth + 32) + 'px'
            });

            //

            //
            $this.el.find('li').off('click').on('click', function (event) {

                //
                $this.el.find('li').removeClass('selected');

                var $li = $(this);

                //
                $li.toggleClass('selected');

                //console.log([event.target]);
                //console.log(event.target.dataset.option);
                //console.log(event.target.innerText);
                //console.log($li.attr('data-index'));
                //console.log($this.$el[0].selectedOptions[0].value);
                //console.log($this.$el[0].selectedIndex);


                //
                $this.$el[0].selectedIndex = $li.attr('data-index');
                //$this.$el[0].selectedOptions[0].value = event.target.innerText;

                //
                $this.el.find('.dropdown-value').html(event.target.innerText);

                //
                $this.el[0].dataset.value = event.target.innerText;

                //
                // $this.close();

                $this.trigger('change');
            });

            // close dialog id
            $(window).off('mouseup').on('mouseup', function (event) {

                var dropdowns = $('body').find('.dropdown-toggle'),
                    target = event.target.parentElement.dataset.dropdown;

                //
                dropdowns.each( function () {

                    var dropdown = $(this);

                    if (dropdown.parent().data().dropdown != target) {
                        dropdown.prop('checked', false);
                    }

                });

            });

        };

        //
        this.close = function (toggle) {
            var $this = this,
                el = $this.el.find('.dropdown-toggle');

            el.prop('checked', false);


        };

        //
        this.init();

//        Dialog.render('alert', {message: 'I like turtles. <select id="dropdown-id"><option>Potato</option><option>Poop</option><option>Migz</option></select>',title: 'Woohhooo!', alert : 'error'}, {modeless : false})

        //
        return this;

    };

})($);

