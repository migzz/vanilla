
    /* Inventory Group View
     */

    (function () {

        // region for layout collection
        var layout_container = 'region_setting_collection',
        
            //
            create_item_container = 'region_setting_item_details',

        // this module name like vanilla.app.BranchVariable
            module_name      = 'InventoryGroup',

        // display name
            model_display_name = 'Inventory Group',

        // rest name
            model_name       = 'inventory_group',

        // class name
            model_class       = 'inventory-group',

        // rest id
            model_key_id     = model_name + '_id',

        // rest display name
            model_key_name   = model_name + '_name',

            //
            template_path    = vanilla.path.requireText + '/app/control_panel/templates/setting/';

        
        define([
            template_path + 'setting-list.html',
            template_path + model_class + '/item.html',
            template_path + model_class + '/details.html',
            template_path + model_class + '/create.html',
            template_path + model_class + '/edit.html'

        ], function (
            listTemplate,
            itemTemplate,
            itemDetailsTemplate,
            itemCreateTemplate,
            itemEditTemplate
            ) {

            /* replace */
            listTemplate = listTemplate
                .replace(/{model-class}/, model_class)
                .replace(/{display-title}/, model_display_name)
                .replace(/{model}/, model_display_name);

            //
            return vanilla.app.module(module_name + '.View', function ( View, App, Backbone, Marionette, $, _ ) {

                var $this = vanilla.app[module_name];

                /* item create view*/
                View.CreateItemView = Marionette.ItemView.extend({

                    template : _.template( itemCreateTemplate ),

                    //
                    events : {
                        'click .button-save' : 'addItem',
                        'click .button-cancel' : 'cancelCreate'
                    },

                    //
                    cancelCreate : function () {

                        //
                        $this.carouselMove('p');

                        // close view
                        // $this.closeView(view);

                        return false;
                    },

                    //
                    addItem : function (e) {

                        var form = $(this.el).find('form');

                        // form id valid
                        if ( form.valid() ) {

                            /* create object model */
                            var model = form.serializeFormJSON();

                            // save
                            $this.createItem(model, this);
                        }

                        return false;
                    },

                    // add validation to form
                    onDomRefresh: function(){
                        var form = $(this.el).find('form');

                        form.validate({
                            errorElement: "div",
                            onsubmit: false,
                            rules: {
                                "area_name" : {
                                    required : true
                                }
                            }

                        });

                    }

                });

                /* update item view */
                View.UpdateItemView = Marionette.ItemView.extend({

                    // template
                    template : _.template( itemEditTemplate ),

                    // event
                    events : {
                        'click .button-save'   : 'updateItem',
                        'click .button-cancel' : 'cancelUpdate'
                    },

                    //
                    cancelUpdate : function (){

                        //
                        $this.carouselMove('p');

                        // close view
                        // $this.closeView(view);

                        return false;
                    },

                    // update item
                    updateItem : function (e) {

                        var form  = $(this.el).find('form'),
                            model = this.model;

                        // form id valid
                        if ( form.valid() ) {

                            /* create object model */
                            model.set();

                            // save
                            $this.updateItem(model, this);
                        }

                        return false;
                    },

                    // add validation to form
                    onDomRefresh: function(){
                        var form = $(this.el).find('form');

                        form.validate({
                            errorElement: "div",
                            onsubmit: false,
                            rules: {
                                "area_name" : {
                                    required : true
                                }
                            }

                        });

                    }

                });

                /* item details */
                View.ItemDetailView = Marionette.ItemView.extend({

                    // template
                    template : _.template( itemDetailsTemplate ),

                    // button event
                    events : {
                        'click .item-action .button-delete' : 'deleteItem',
                        'click .item-action .button-edit' : 'editItem',
                        'click form .button-cancel' : 'cancelUpdate',
                        'click form .button-save' : 'updateItem'
                    },

                    /* event functions */

                    // render edit
                    editItem : function (e) {

                        //
                        //$this.renderEditItem(this.model, create_item_container);

                    },

                    // delete item
                    cancelUpdate : function (e) {

                        //
                        $this.carouselMove('p');

                        // close view
                        // $this.closeView(view);

                        return false;
                    },

                    // delete item
                    deleteItem : function (e) {

                        //
                        $this.destroyItem(this.model, this);
                    },

                    // update item
                    updateItem : function (e) {

                        var form  = $(this.el).find('form'),
                            model = this.model;

                        // form id valid
                        if ( form.valid() ) {

                            /* create object model */
                            model.set(form.serializeFormJSON());

                            // save
                            $this.updateItem(model, this);
                        }

                        return false;
                    },

                    // add validation to form
                    onDomRefresh: function(){
                        var form = $(this.el).find('form');

                        form.validate({
                            errorElement: "div",
                            onsubmit: false,
                            rules: {
                                "area_name" : {
                                    required : true
                                }
                            }

                        });

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

                /* single item view */
                View.ItemView = Marionette.ItemView.extend({

                    // template
                    template : _.template( itemTemplate ),

                    // element tag
                    tagName : 'li',

                    // events
                    events : {
                        'click' : 'showItem'
                    },

                    // show item details
                    showItem : function (e) {

                        //
                        $this.renderDetailItem(this.model, create_item_container);

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

                /* layout collection for setting like for branch, department, etc */
                View.SettingView = Marionette.CompositeView.extend({

                    template : _.template( listTemplate ),
                    childView : View.ItemView,

                    // append collection to view
                    attachHtml: function(collectionView, itemView){
                        collectionView.$('.item-list > ul').append(itemView.el);
                    },

                    // view events
                    events : {
                        'click .setting-add-item-button' : 'createItem'
                    },

                    //
                    createItem : function () {
                        // render add item
                        $this.renderCreateItem(create_item_container);
                    }


                });

            }); /* code_ */

        });
            /* encapsulate */
    })();