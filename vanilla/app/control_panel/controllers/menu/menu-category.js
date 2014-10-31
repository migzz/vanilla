
/* Menu Category Controller
 */
(function () {
    /* local setting */

    // region for layout collection
    var layout_container = 'region_menu_group_category',

    // this module name like vanilla.app.BranchVariable
        module_name      = 'MenuCategory',

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


    define([model_name + '_view', model_name + '_model'], function (View, Model) {

        //
        return vanilla.app.module(module_name, function ( MenuCategory, App, Backbone, Marionette, $, _ ) {

            /* vars */

            // private
            var $this = this;

            // public
            $this.collection = new Model.Collection();
            $this.groupCategory = 0;
            $this.groupCategoryCollection = {};
            $this.groupCategorySelected = {};
            $this.$carousel  = 0;

            /* animate close view */
            $this.closeView = function (view) {

                // delay to show animation
                setTimeout(function () {
                    // remove
                    view.destroy();
                }, 100);
            };

            /* move item */
            $this.moveItem = function (model, direction) {

                var priority = model.get('priority_level'),
                    collection = model.collection,
                    lastItem = 0;

                //
                lastItem = collection.at(collection.length-1);

                //
                if (direction == 'up') {
                    priority++;
                }

                //
                else {
                    priority--;
                }

                // priority less 0
                if (priority < 0) return false;

                // priority more than collection
                if ( priority > lastItem.get('priority_level')) return false;

                //
                model.set({
                    priority_level : priority
                });

                // instantiate model
                var moveModel = new Model.MoveItem(model.attributes);

                // model created
                moveModel.on('sync', function () {

                    // render layout with collection
                    // $this.fetchCollection();

                    //
                    //$this.syncNewModel(model, view);

                })

                    // server error, model creation failed
                    .on('error', function (data, response) {
                        var error = response.responseJSON.errorDetails[0];
                        console.warn(error);
                        vanilla.ui.notification.render(error.errorMessage + ' creation failed.');
                    });

                /* save to server */
                moveModel.save();
            };

            $this.toggleSelect = function (itemView) {

                var modelId = itemView.model.get('menu_category_id');

                //
                itemView.$el.toggleClass('selected-item');
                $this.groupCategorySelected[modelId] = !$this.groupCategorySelected[modelId];

            };

            //
            $this.resetSelected = function (collection) {
                collection.each(function (model) {
                    $this.groupCategorySelected[model.get('menu_category_id')] = false;
                });
            };

            //
            $this.setSelected = function (itemView, group) {

                var groupId     = group.get('menu_group_id'),
                    categoryId  = itemView.model.get('menu_category_id'),
                    model       = $this.groupCategoryCollection[groupId].where({
                                    mc_menu_category_id : categoryId
                                });

                // set selected
                if (model.length == 1) {
                    $this.groupCategorySelected[categoryId] = true;
                    itemView.$el.addClass('selected-item');
                }

            };

            /* server */

            /* create new item, pass an object */
            $this.createItem = function (model, view) {

                // instantiate model
                model = new Model.Item(model);

                // model created
                model.on('sync', function () {

                    //
                    $this.syncNewModel(model, view);
                })

                    // server error, model creation failed
                    .on('error', function (data, response) {
                        var error = response.responseJSON.errorDetails[0];
                        console.warn(error);
                        vanilla.ui.notification.render(error.errorMessage + ' creation failed.');
                    });

                /* save to server */
                model.save();
            };

            /* sync model so no missing data to display when we view its details right after we add it */
            $this.syncNewModel = function (model, view) {

                // instantiate new model, pass data as object not model
                var newModel = new Model.Item(model.attributes);

                // model successfully fetched its data
                newModel.on('sync', function () {

                    // Update collection list
                    $this.collection.add(newModel.get('data')[0]);

                    //
                    App.MenuGroup.carouselMove('p');

                })

                    // server error
                    .on('error', function (data, response) {
                        console.warn(module_name + ' syncNewModel');
                        console.info(response);
                    });

                //
                newModel.fetch();
            };

            /* update item, pass an object with 'model_id' */
            $this.updateItem = function (model, view) {

                // cache temp model so when the update fails, we revert the model values
                var prevModel = model.previousAttributes(),
                    name      = prevModel[menu_key_name];

                // set id of model that we want to update
                model.set({
                    id : model.get(menu_key_id),
                    menu_category_name : model.get(menu_key_name)
                });

                // pass it to new model, because it trows error if you use the original model when save (patch)
                var updateModel = new Model.Item(model);

                // patch to server
                updateModel.save(model, {
                    'patch' : true
                });

                // update success
                updateModel.on('sync', function () {

                    vanilla.ui.notification.render('<span class="emphasize"> ' + name + '</span> updated.');

                    //
                    var uModel = $this.collection.where({
                        menu_category_id : prevModel.mc_menu_category_id
                    })[0];

                    //
                    uModel.set({
                        menu_category_name: model.get(menu_key_name)
                    });

                    //
                    App.MenuGroup.carouselMove('p');
                })

                    // update failed
                    .on('error', function () {

                        model.set(prevModel);

                        // console.log(prevModel);
                        vanilla.ui.notification.render('<span class="emphasize"> ' + name + '</span> update failed.');

                    });

            };

            /* destroy / delete / remove item from server */
            $this.destroyItem = function (model, view) {

                // get name, for notification
                var name = model.get(model_key_name);

                // set id of model that we want to destroy
                model.set({
                    id : model.get(model_key_id)
                });

                // destroy successfully
                model.on('sync', function () {

                    // remove from collection view
                    $this.collection.remove(model);

                    //
                    App.MenuGroup.carouselMove('p');

                    // close view
                    if(view != null) $this.closeView(view);

                    //
                    vanilla.ui.notification.render('<span class="emphasize"> ' + name + '</span> deleted.');

                })

                    // destroy failed
                    .on('error', function () {
                        // console.log(prevModel);
                        vanilla.ui.notification.render('<span class="emphasize"> ' + name + '</span> failed to delete.');
                    });

                // destroy
                model.destroy();

            };

            /* fetch all item  from server */
            $this.fetchCollection = function (render, region) {

                // instantiate
                var collection = new Model.Collection();

                collection.lite();

                // fetch success
                collection.on('sync', function (data) {

                    // set collection data
                    // //collection.reset(data.models[0].get('data'));

                    // pass collection
                    //collection.reset(data.models[0].get('data'));
                    $this.collection.reset(data.models[0].get('data'));

                    // render layout with collection
                    if (render) {
                        $this.renderCollection();
                    }
                });

                // fetch all item from server
                collection.fetch();

            };

            //
            $this.renderCollection = function (region) {
                $this.renderSetting($this.collection, region || layout_container);
            };


            /* client */

            /* */
            $this.carouselMove = function (direction) {
                if ($this.$carousel == 0) return false;

                if (direction == 'n') {
                    //
                    $this.$carousel.next();
                }

                else {
                    //
                    $this.$carousel.prev();
                }

            };

            /* create form */
            $this.renderCreateItem = function (region) {

                // instantiate view
                var createItemView = new View.CreateItemView();

                // render to region
                App.renderRegion(region, createItemView);

            };

            /* edit form */
            $this.renderEditItem = function (model, region) {

                // instantiate view
                var updateItemView = new View.UpdateItemView({
                    model : model
                });

                // render to region
                App.renderRegion(region, updateItemView);

            };

            /* create form */
            $this.renderDetailItem = function (model, region) {

                // instantiate view
                var detailItemView = new View.ItemDetailView({
                    model : model
                });

                // render to region
                App.renderRegion(region, detailItemView);

            };

            /* update form */
            $this.renderUpdateItem = function (region) {

                // instantiate view
                var updateItemView = new View.UpdateItemView();

                // render to region
                App.renderRegion(region, updateItemView);

            };

            /* render collection */
            $this.renderSetting = function (collection, region) {

                // instantiate view
                var settingView = new View.SettingView( {
                    collection : collection
                });

                // render to region
                App.renderRegion( region, settingView );

                //
                $this.$carousel = Hammr.carousel('.hammer');

            };


            /* */

            /* render collection */
            $this.renderMenu = function (groupId, region, group) {

                // instantiate view
                var menuView = new View.GroupCategoryView( {
                    collection : $this.groupCategoryCollection[groupId],
                    model : group

                });

                //
                setTimeout( function () {
                    // render to region
                    App.renderRegion( region, menuView );
                }, 0);
            };

            /* create new item, pass an object */
            $this.linkGroupCategory = function (view, groupModel) {

                //
                var model = view.model,

                //
                    existed = $this.collection.where({
                        menu_category_name : model.get(model_key_name)
                    }),

                //
                    linkModel = {
                        menu_group_id : groupModel.get('menu_group_id'),
                        menu_category_id : model.get('id') || existed[0].get(model_key_id)
                    };

                // instantiate model
                linkModel = new Model.LinkItem(linkModel);

                // model created
                linkModel.on('sync', function (syncData) {

                    var modelName = model.get(model_key_name),
                        modelId = syncData.get('menu_category_id'),
                        collectionId = syncData.get('menu_group_id'),
                        linkId       = syncData.get('id'),

                        newLink = new Model.LinkItem({
                            mc_menu_category_name : modelName,
                            mc_menu_category_id : modelId,
                            menu_category_id : modelId,
                            mg_menu_group_id : collectionId,
                            menu_group_id : collectionId,
                            menu_group_category_id : linkId,
                            id : linkId
                        });

                    //
                    $this.groupCategoryCollection[collectionId].add(newLink);

                    //
                    $this.toggleSelect(view);

                })

                    // server error, model creation failed
                    .on('error', function (data, response) {
                        var error = response.responseJSON.errorDetails[0];
                        //console.warn(error);
                        //vanilla.ui.notification.render(error.errorMessage + ' link failed.');

                        if ( error.errorMessage == 'Menu category must be unique inside a menu group.') {
                            //
                            vanilla.ui.notification.render('Category ' + modelName + ' already exist.');
                        }

                        else {

                            console.warn(error);
                            vanilla.ui.notification.render(error.errorMessage + ' ' + modelName + ' syncNewLinkModel failed.');
                        }


                    });

                /* save to server */
                linkModel.save();
            };

            /* destroy / delete / remove item from server */
            $this.unlinkGroupCategory = function (model, view) {

                var linkModel = new Model.LinkItem(model);

                // get name, for notification
                var name = model.get(menu_key_name);

                // set id of model that we want to destroy
                linkModel.set({
                    id : model.get('menu_group_category_id')
                });

                // destroy successfully
                linkModel.on('sync', function () {

                    $this.toggleSelect(view);

                    // remove from collection view
                    $this.groupCategoryCollection[model.get('mg_menu_group_id')].remove(model);

                    App.MenuGroup.carouselMove('p');

                })

                    // destroy failed
                    .on('error', function () {
                        // console.log(prevModel);
                        vanilla.ui.notification.render('<span class="emphasize"> ' + name + '</span> failed to delete.');
                    });

                // destroy
                linkModel.destroy();

            };

            //
            $this.toggleLink = function (itemView) {

                var modelId = itemView.model.get(model_key_id),
                    groupId = $this.groupCategory.get('menu_group_id'),
                    link = $this.groupCategoryCollection[groupId].filterLink(modelId);

                /*link = $this.groupCategoryCollection[groupId].where({
                 mc_menu_category_id: modelId
                 });*/

                // menu_group_category_id

                if (itemView.el.className.length > 0) {
                    $this.unlinkGroupCategory(link[0], itemView);
                }

                else {
                    //console.log(itemView.model.get('menu_category_id'));
                    //console.log($this.groupCategory.get('menu_group_id'));
                    $this.linkGroupCategory(itemView, $this.groupCategory);
                }

            };

            /* fetch all item  from server */
            $this.fetchGroupCategories = function (group, render, region) {

                var groupId = group.attributes.menu_group_id,
                    collection = new Model.GroupCategories(group.attributes);

                // fetch success
                collection.on('sync', function (data) {

                    // pass collection
                    $this.groupCategoryCollection[groupId] = new Model.Collection(data.get('data'));

                    // render layout with collection
                    if (render) {
                        $this.renderGroupCategoriesCollection(group, groupId);
                    }

                });

                //
                if ($this.groupCategoryCollection[groupId] == null) {
                    // fetch all item from server
                    collection.fetch();
                }

                else {
                    // render layout with collection
                    $this.renderGroupCategoriesCollection(group, groupId);
                }

            };

            //
            $this.renderGroupCategoriesCollection = function (group, groupId, region) {

                $this.groupCategory = group;

                // render layout with collection
                $this.renderMenu(groupId, region || layout_container, group);

            };

            /* create form */
            $this.renderGroupCategoryCreate = function (model, region) {

                //
                $this.resetSelected($this.collection);

                // instantiate view
                var createItemView = new View.GroupCategoryCreate({
                    collection : $this.collection,
                    model : model
                });

                // render to region
                App.renderRegion(region, createItemView);

            };

            /* create form */
            $this.renderGroupCategoryDetailItem = function (model, region) {

                // instantiate view
                var detailItemView = new View.GroupCategoryItemDetailView({
                    model : model
                });

                // render to region
                App.renderRegion(region, detailItemView);

            };

        }); /* code_ */

    });

    /* encapsulate */
})();

