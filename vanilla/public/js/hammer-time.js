
/**
 *  Crousel + Hammerjs
 */

define(['hammer'], function(Hammer){

    HammerTime = function(element, eventType, events){

        var self = this;
        element = $(element);

        var container = $(">ul", element);
        var panes = $(">ul>li", element);

        var pane_width = 0;
        var pane_count = panes.length;

        var current_pane = 0;


        /**
         * initial
         */
        this.init = function() {
            setPaneDimensions();

            $(window).on("load resize orientationchange", function() {
                setPaneDimensions();
            });

            //$('.hammer > ul').trigger('create').hide().show(0);
        };


        /**
         * set the pane dimensions and scale the container
         */
        function setPaneDimensions() {
            pane_width = element.width();
            panes.each(function() {
                $(this).width(pane_width);
            });
            container.width(pane_width*pane_count);
        }


        /**
         * show pane by index
         */
        this.showPane = function(index, animate) {

            // between the bounds
            index = Math.max(0, Math.min(index, pane_count-1));
            current_pane = index;

            var offset = -((100/pane_count)*current_pane);
            setContainerOffset(offset, animate);
        };


        function setContainerOffset(percent, animate) {

            container.removeClass("animate");

            if(animate) {
                container.addClass("animate");
            }

            if(Modernizr.csstransforms3d) {
                container.css("transform", "translate3d("+ percent +"%,0,0) scale3d(1,1,1)");

            }
            else if(Modernizr.csstransforms) {
                container.css("transform", "translate("+ percent +"%,0)");
            }
            else {
                var px = ((pane_width*pane_count) / 100) * percent;
                container.css("left", px+"px");
            }

            //console.log(container);
        }

        this.setIndex = function(index) {
            current_pane = index;
            return this;
        };
        this.getIndex = function() {
            return current_pane;
        };
        this.next = function() {
            this.showPane(current_pane+1, true);
            return this;
        };
        this.prev = function() {
            this.showPane(current_pane-1, true);
            return this;
        };


        //
        var handler = 0;
        //
        switch(eventType) {

            case 'select_app':

                //
                function handleSelectApp(ev) {
                    // disable browser scrolling

                    // if ( ev.type != 'touch')
                    // ev.preventDefault();
                    var direction = ev.offsetDirection,
                        deltaX    = ev.deltaX;

                    switch(ev.type) {
                        case 'tap':

                            //
                            switch (ev.target.parentElement.id) {

                                case 'controller':
                                    vanilla.app.Controller.renderDashboard();
                                    break;
                                case 'pos':
                                    vanilla.app.TableLayout.fetchTable();
                                    break;
                                case 'extension':
                                    break;
                                default :
                            }

                            break;

                        case 'swipeleft':
                        case 'swiperight':
                            // vanilla.ui.notification.render(ev.type);
                            break;
                        case 'panright':
                        case 'panleft':
                            // stick to the finger
                            var pane_offset = -(100/pane_count)*current_pane;
                            var drag_offset = ((100/pane_width)*deltaX) / pane_count;


                            // slow down at the first and last pane
                            if((current_pane == 0 && direction == 2) || (current_pane == pane_count-1 && direction == 4)) {
                                drag_offset *= .2;
                            }
                            //drag_offset *= .4;

                            //console.log('drag_offset: ' + drag_offset );

                            setContainerOffset(drag_offset + pane_offset);
                            break;

                        case 'panend':
                            //ev.stopDetect();
                            // more then 50% moved, navigate (pane_width/6)

                            if(Math.abs(deltaX) > 1) {
                                if(direction == 2) {
                                    self.prev();
                                } else if(direction == 4) {
                                    self.next();
                                }
                            }
                            self.showPane(current_pane, true);

                            break;
                        case 'release':
                            console.log('release');
                            break;
                        case 'pancancel':
                            console.log('pancancel');
                            break;
                        case 'touchend':
                            console.log('touchend');
                    }

                    //var deltaX = Math.abs(ev.deltaX);
                    //console.log('deltaX: ' + deltaX );

                }

                handler = handleSelectApp;

                break;

            default:

                // default
                function handleHammer(ev) {
                    // disable browser scrolling

                    // if ( ev.type != 'touch')
                    // ev.preventDefault();
                    var direction = ev.offsetDirection,
                        deltaX    = ev.deltaX;

                    switch(ev.type) {
                        case 'tap':
                            console.log('hammer_tap');
                            break;

                        case 'swipeleft':
                        case 'swiperight':
                            // vanilla.ui.notification.render(ev.type);
                            break;
                        case 'panright':
                        case 'panleft':
                            // stick to the finger
                            var pane_offset = -(100/pane_count)*current_pane;
                            var drag_offset = ((100/pane_width)*deltaX) / pane_count;


                            // slow down at the first and last pane
                            if((current_pane == 0 && direction == 2) || (current_pane == pane_count-1 && direction == 4)) {
                                //drag_offset *= .2;
                            }
                            drag_offset *= .4;

                            //console.log('drag_offset: ' + drag_offset );

                            setContainerOffset(drag_offset + pane_offset);
                            break;

                        case 'panend':
                            //ev.stopDetect();
                            // more then 50% moved, navigate (pane_width/6)
                            if(Math.abs(deltaX) > 1) {
                                if(direction == 2) {
                                    self.prev();
                                } else if(direction == 4) {
                                    self.next();
                                }
                            }
                            else {
                                self.showPane(current_pane, true);
                            }
                            self.showPane(current_pane, true);
                            break;
                        case 'release':
                            console.log('release');
                            break;
                        case 'pancancel':
                            console.log('pancancel');
                            break;
                        case 'touchend':
                            console.log('touchend');
                    }

                    //var deltaX = Math.abs(ev.deltaX);
                    //console.log('deltaX: ' + deltaX );

                }

                handler = handleHammer;

        }

        //
        new Hammer(element[0], {
            dragLockToAxis : true,
            touchAction    : 'manipulation'
        }).on(events, handler);

    };


    Hammr = {
        carousel : function ($container, eventType, events) {
            var car = new HammerTime($container, eventType, events || '');
            car.init();
            return car;
        }
    };

});

