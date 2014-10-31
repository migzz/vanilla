
    /* Module View
     */

    (function () {

        // region for layout collection
        var layout_container = 'region_setting_collection',
        
            //
            create_item_container = 'region_setting_item_details',

        // this module name like vanilla.app.BranchVariable
            module_name      = 'Module',

        // display name
            model_display_name = 'Module',

        // rest name
            model_name       = 'module',

        // class name
            model_class       = 'module',

        // rest id
            model_key_id     = model_name + '_id',

        // rest display name
            model_key_name   = model_name + '_name',

            //
            template_path    = vanilla.path.requireText + '/app/control_panel/templates/setting/';

        
        define([
            template_path + model_class + '/layout.html',
            template_path + model_class + '/item.html',
            template_path + model_class + '/empty.html'

        ], function (
            listTemplate,
            itemTemplate,
            emptyTemplate
            ) {

            //
            return vanilla.app.module(module_name + '.View', function ( View, App, Backbone, Marionette, $, _ ) {

                var $this = vanilla.app[module_name];

                View.ModuleItemEmptyView = Marionette.ItemView.extend({

                    // template
                    template : _.template( emptyTemplate ),

                    className : 'empty-item',

                    tagName : 'li'

                });

                View.ModuleItemView = Marionette.ItemView.extend({

                    // template
                    template : _.template( itemTemplate ),

                    // element tag
                    tagName : 'li',

                    //
                    modelEvents : {
                        'change': 'modelChanged'
                    },

                    //
                    modelChanged : function () {
                        this.render();
                    },

                    // view events
                    events : {
                        'click input[type=checkbox]' : 'tick'
                    },

                    //
                    tick : function (event) {
                        // render add item
                        //$this.renderCreateItem(create_item_container);
                        $this.moduleTick(event, this.model);

                        // l('ticked');
                        //l(this);
                    }

                });

                View.ModuleView = Marionette.CompositeView.extend({

                    // template
                    template : _.template( listTemplate ),

                    childView : View.ModuleItemView,

                    emptyView : View.ModuleItemEmptyView,

                    // append collection to view
                    attachHtml: function(collectionView, itemView){
                        collectionView.$('[data-module-access="' + this.model.get('group_name') + '"] > ul').append(itemView.el);
                    },

                    initialize : function () {

                        var collection = this.model.get('modules');

                        this.collection = new $this.Model.Collection($this.getModuleAccess(collection));

                    }

                });

                View.ModuleCollectionView = Marionette.CollectionView.extend({

                    className : 'module-collection',

                    childView : View.ModuleView

                });

            }); /* code_ */

        });
            /* encapsulate */
    })();