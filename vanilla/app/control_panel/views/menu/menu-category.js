
    /* Menu Category View
     */

    (function () {

        // region for layout collection
        var layout_container = 'region_menu_group_category',
        
            //
            create_item_container = 'region_menu_item',

        // this module name like vanilla.app.BranchVariable
            module_name      = 'MenuCategory',

        // display name
            model_display_name = 'Menu Category',

        // rest name
            model_name       = 'menu_category',

        // rest name
            menu_name       = 'mc_' + model_name,

        // class name
            model_class       = 'menu-category',

        // class name
            menu_class       = 'mc-' + model_class,

        // rest id
            model_key_id     = model_name + '_id',

        // rest id
            menu_key_id     = 'mc_' + model_key_id,

        // rest display name
            model_key_name   = model_name + '_name',

        // rest display name
            menu_key_name   = 'mc_' + model_key_name;

            //
            template_path    = vanilla.path.requireText + '/app/control_panel/templates/menu/';

        
            /* encapsulate */
        define([
            template_path + 'menu-list.html',
            template_path + model_class + '/item.html',
            template_path + model_class + '/details.html',
            template_path + model_class + '/create.html',
            template_path + model_class + '/edit.html',

            template_path + model_class + '/group-category-list.html',
            template_path + model_class + '/group-category-item.html',
            template_path + model_class + '/group-category-create.html',
            template_path + model_class + '/group-category-detail.html'

        ], function (
            listTemplate,
            itemTemplate,
            itemDetailsTemplate,
            itemCreateTemplate,
            itemEditTemplate,

            groupCategoryTemplate,
            groupCategoryItemTemplate,
            groupCategoryCreateTemplate,
            groupCategoryItemDetailsTemplate
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
                        vanilla.app.MenuGroup.carouselMove('p');

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

                    },

                    initialize : function () {
                        vanilla.app.MenuGroup.carouselMove('n');
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

                        var itemView = this;

                        // toggle link
                        $this.toggleLink(itemView);
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

                /* single item view */
                View.GroupCategoryItemView = Marionette.ItemView.extend({

                    // template
                    template : _.template( groupCategoryItemTemplate ),

                    // element tag
                    tagName : 'li',

                    // events
                    events : {
                        'click a' : 'showItem',
                        'click .move-up': 'moveUp',
                        'click .move-down': 'moveDown'
                    },

                    //
                    moveDown : function () {

                        $this.moveItem(this.model, 'down');

                        return false;
                    },

                    //
                    moveUp : function () {

                        $this.moveItem(this.model, 'up');

                        return false;
                    },

                    // show item details
                    showItem : function (e) {

                        //
                        $this.renderGroupCategoryDetailItem(this.model, create_item_container);

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

                /* item details */
                View.GroupCategoryItemDetailView = Marionette.ItemView.extend({

                    // template
                    template : _.template( groupCategoryItemDetailsTemplate),

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
                        vanilla.app.MenuGroup.carouselMove('p');

                        return false;
                    },

                    // delete item
                    deleteItem : function (e) {

                        var item = this;

                        //
                        $this.unlinkGroupCategory(item.model, item);

                        console.log('unlink not delete');
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
                    initialize : function () {

                        var model = this.model;

                        //
                        vanilla.app.MenuItem.fetchCategoryItemCollection(model, true);

                        //
                        vanilla.app.MenuGroup.carouselMove('n');
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

                /* item create view*/
                View.GroupCategoryCreate = Marionette.CompositeView.extend({

                    template : _.template( groupCategoryCreateTemplate ),

                    childView : View.ItemView,

                    childViewContainer: '.menu-category-select-collection',

                    // append collection to view
                    attachHtml: function(collectionView, childView, index){
                        if (collectionView.isBuffering) {
                            // buffering happens on reset events and initial renders
                            // in order to reduce the number of inserts into the
                            // document, which are expensive.
                            collectionView.elBuffer.appendChild(childView.el);
                        }
                        else {
                            // If we've already rendered the main collection, just
                            // append the new children directly into the element.
                            collectionView.$el.find('ul.menu-category-select-collection').append(childView.el);

                        }
                        // collectionView.$('#menu-group-categories > ul').append(childView.el);
                        // console.log(collectionView);
                        // console.log(childView.el);


                        // set selected, category collection of group
                        $this.setSelected(childView, this.model);
                        //childView.$el.addClass('selected-test')
                    },


                    //
                    events : {
                        'click .button-ok' : 'addItem',
                        'click .button-new' : 'newItem',
                        'click .button-cancel' : 'cancelCreate'
                    },

                    //
                    newItem : function () {

                        $this.renderCreateItem('region_menu_item_details');

                        return false;
                    },


                    //
                    cancelCreate : function () {

                        //
                        vanilla.app.MenuGroup.carouselMove('p');

                        return false;
                    },

                    //
                    addItem : function (e) {

                        // get id then save

                        return false;
                    },

                    initialize : function () {
                        //
                        vanilla.app.MenuGroup.carouselMove('n');

                    }
                });

                /* layout collection for setting like for branch, department, etc */
                View.GroupCategoryView = Marionette.CompositeView.extend({

                    template : _.template( groupCategoryTemplate ),

                    childView : View.GroupCategoryItemView,

                    childViewContainer: '.menu-group-category-collection',

                    // append collection to view
                    attachHtml: function(collectionView, childView, index){
                        if (collectionView.isBuffering) {
                            // buffering happens on reset events and initial renders
                            // in order to reduce the number of inserts into the
                            // document, which are expensive.
                            collectionView.elBuffer.appendChild(childView.el);
                        }
                        else {
                            // If we've already rendered the main collection, just
                            // append the new children directly into the element.
                            collectionView.$el.find('ul.menu-group-category-collection').append(childView.el);

                        }
                        // collectionView.$('#menu-group-categories > ul').append(childView.el);
                        // console.log(collectionView);
                        // console.log(childView.el);
                    },

                    // view events
                    events : {
                        'click .menu-group-category-add-item-button' : 'createItem'
                    },

                    //
                    createItem : function () {
                        // render add item
                        $this.renderGroupCategoryCreate(this.model, create_item_container);
                    }

                });

            }); /* code_ */

        });
    })();