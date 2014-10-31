/**
 *  table_layout
 */

(function () {

    // region for layout collection
    var region_default = 'region_main',

    // this module name like vanilla.app.BranchVariable
        module_name      = 'TableLayout',

        model_name  = 'table_layout',

        class_name  = 'table-layout',

        template_path    = vanilla.path.requireText + '/app/pos/templates/';

    define([
        template_path + class_name + '/layout.html',
        template_path + class_name + '/area-item.html',
        template_path + class_name + '/location-item.html'
    ], function (
        tableLayoutTemplate,
        areaItemTemplate,
        locationItemTemplate
        ) {

        //
        return vanilla.app.module(module_name + '.View', function ( View, App, Backbone, Marionette, $, _ ) {

            var $this = App[module_name];

            /* Location */
            View.EmptyItemView = Marionette.ItemView.extend({

                // template
                template : _.template( '<div> Table is empty.</div>' ),

                // element tag
                tagName : 'li'

            });

            /* Location */
            View.LocationItemView = Marionette.ItemView.extend({

                // template
                template : _.template( locationItemTemplate ),

                // element tag
                tagName : 'li',

                // events
                events : {
                    'click' : 'showItem'
                },

                // show item details
                showItem : function (e) {
                    console.log('show_menu');
                },

                //
                modelEvents : {
                    'change': 'modelChanged'
                },

                //
                modelChanged : function () {
                    this.render();
                    console.log('rendering_item');
                }

            });

            // Item View
            View.TableViews = Marionette.CompositeView.extend({

                childView  : View.LocationItemView,

                emptyView : View.EmptyItemView,

                childViewContainer  : '.table-layout',

                template  : _.template( tableLayoutTemplate ),

                className : 'pos',

                initialize : function () {
                    $this.fetchArea();


                },

                onRender : function () {
                    //vanilla.app.Area.renderCollection('region_table_layout');
                }

            });


            /* Area */
            View.AreaItemView = Marionette.ItemView.extend({

                // template
                template : _.template( areaItemTemplate ),

                // element tag
                tagName : 'li',

                // events
                events : {
                    'click' : 'showItem'
                },

                // show item details
                showItem : function (e) {
                    //
                    var areaName = this.model.get('area_name');

                    $this.filterArea(areaName);
                },

                //
                modelEvents : {
                    'change': 'modelChanged'
                },

                //
                modelChanged : function () {
                    this.render();
                }

            });

            View.AreaView = Marionette.CollectionView.extend({
                //childViewContainer : '.area-carousel > ul',
                childView  : View.AreaItemView,
                tagName   : 'ul',
                className : 'areas controller-collection-list'

            });

        }); /* code_ */

    });
    /* encapsulate */
})();