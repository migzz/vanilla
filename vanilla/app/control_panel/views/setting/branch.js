
/** Branch View
     *  Created by Migeru on 9/28/14.
     */

    define([
        vanilla.path.requireText + '/app/control_panel/templates/setting/setting-list.html',
        vanilla.path.requireText + '/app/control_panel/templates/setting/branch/item.html',
        vanilla.path.requireText + '/app/control_panel/templates/setting/branch/details.html',
        vanilla.path.requireText + '/app/control_panel/templates/setting/branch/create.html',
        vanilla.path.requireText + '/app/control_panel/templates/setting/branch/edit.html'
    ], function (
        listTemplate,
        itemTemplate,
        itemDetailsTemplate,
        itemCreateTemplate,
        itemEditTemplate
        ) {

        /* local setting */

            // region for layout collection
        var layoutContainer     = 'region_setting_collection',
            createItemContainer = 'region_setting_item_details',

        // model key id
            modelIdName     = 'branch_id',

        // model key name
            modelName       = 'branch_name';


        /* replace */
        listTemplate = listTemplate
            .replace(/{model-class}/, 'branch')
            .replace(/{display-title}/, 'Branches')
            .replace(/{model}/, 'Branch');

        //
        return vanilla.app.module('Branch.View', function ( View, App, Backbone, Marionette, $, _ ) {

            var $this = vanilla.app.Branch;

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
                            "branch-name" : {
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
                        model.set({
                            branch_name : form.find('#branch-name').val().trim(),
                            printer_id : form.find('#printer-id').val()
                        });

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
                            "branch_name" : {
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
                    //$this.renderEditItem(this.model, createItemContainer);

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
                            "branch_name" : {
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
                    //$this.renderDetailItem(this.model, createItemContainer);

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
                    $this.renderCreateItem(createItemContainer);
                }


            });

        }); /* code_ */
    });