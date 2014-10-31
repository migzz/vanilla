
/* Menu Item Controller
 */
(function () {
    /* local setting */

    // region for layout collection
    var layout_container = 'region_menu_category_item',

        //
        region_modifier = 'region_menu_item_modifier',

    // this module name like vanilla.app.BranchVariable
        module_name      = 'MenuItem',

    // display name
        model_display_name = 'Menu Item',

    // rest name
        model_name       = 'item',

    // rest name
        menu_name       = 'i_' + model_name,

    // class name
        model_class       = 'item',

    // class name
        menu_class       = 'menu-' + model_class,

    // rest id
        model_key_id     = model_name + '_id',

    // rest id
        menu_key_id     = 'i_' + model_name + '_id',

    // rest display name
        model_key_name   = model_name + '_name',

    // rest display name
        menu_key_name   = 'i_' + model_name + '_name';


    define(['menu_' + model_name + '_view', 'menu_' + model_name + '_model'], function (View, Model) {

        //
        return vanilla.app.module(module_name, function ( MenuItem, App, Backbone, Marionette, $, _ ) {

            /* vars */

            // private
            var $this = this;

            // public
            $this.collection = new Model.Collection();
            $this.categoryItem = 0;
            $this.categoryItemCollection = {};
            $this.categoryItemSelected = {};
            $this.$carousel  = 0;

            /* animate close view */
            $this.closeView = function (view) {

                // delay to show animation
                setTimeout(function () {
                    // remove
                    view.destroy();
                }, 100);
            };

            $this.toggleSelect = function (itemView) {

                var modelId = itemView.model.get(model_key_id);

                //
                itemView.$el.toggleClass('selected-item');
                $this.categoryItemSelected[modelId] = !$this.categoryItemSelected[modelId];

            };

            //
            $this.resetSelected = function (collection) {
                collection.each(function (model) {
                    $this.categoryItemSelected[model.get(model_key_id)] = false;
                });
            };

            //
            $this.setSelected = function (itemView, category) {

                var categoryId  = category.get('menu_group_category_id'),
                    itemId      = itemView.model.get(model_key_id),
                    model       = $this.categoryItemCollection[categoryId].where({
                        i_item_id : itemId
                    });

                // set selected
                if (model.length == 1) {
                    $this.categoryItemSelected[itemId] = true;
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

                    // close view
                    // $this.closeView(view);

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
                    name      = prevModel[model_key_name];

                // set id of model that we want to update
                model.set({
                    id : model.get(model_key_id)
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
                    App.MenuGroup.carouselMove('p');

                    // close view
                    // $this.closeView(view);
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
                    // $this.closeView(view);

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
                    //collection.reset(data.models[0].get('data'));

                    // pass collection
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

                //
                App.MenuGroup.carouselMove('n');
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

                //
                App.MenuGroup.carouselMove('n');
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


            /* create new item, pass an object */
            $this.linkGroupCategory = function (view, categoryModel) {

                //
                var model = view.model,

                //
                    existed = $this.collection.where({
                        item_name : model.get(model_key_name)
                    }),

                //
                    linkModel = {
                        menu_category_id : categoryModel.get('mc_menu_category_id'),
                        item_id : model.get('id') || existed[0].get(model_key_id)
                    };

                // instantiate model
                linkModel = new Model.LinkItem(linkModel);

                // model created
                linkModel.on('sync', function (syncData) {

                    var modelName = model.get(model_key_name),
                        modelId = syncData.get('item_id'),
                        collectionId = syncData.get('menu_category_id'),
                        linkId       = syncData.get('id');

                        var newLink = new Model.LinkItem({
                            i_item_name : modelName,
                            i_item_id : modelId,
                            item_id : modelId,
                            mc_menu_category_id : collectionId,
                            menu_category_id : collectionId,
                            menu_category_item_id : linkId,
                            id : linkId
                        });

                    //
                    $this.categoryItemCollection[categoryModel.get('menu_group_category_id')].add(newLink);

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
            $this.unlinkGroupCategory = function (model, view, categoryModel) {

                var linkModel = new Model.LinkItem(model);

                // get name, for notification
                var name = model.get(menu_key_name);

                // set id of model that we want to destroy
                linkModel.set({
                    id : model.get('menu_category_item_id')
                });

                // destroy successfully
                linkModel.on('sync', function () {

                    $this.toggleSelect(view);

                    // remove from collection view
                    $this.categoryItemCollection[categoryModel.get('menu_group_category_id')].remove(model);

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

                var modelId = itemView.model.get('item_id'),
                    categoryId = $this.categoryItem.get('menu_group_category_id');

                var link = $this.categoryItemCollection[categoryId].filterLink(modelId);

                if (itemView.el.className.length > 0) {
                    $this.unlinkGroupCategory(link[0], itemView, $this.categoryItem);
                }

                else {
                    $this.linkGroupCategory(itemView, $this.categoryItem);
                }

            };

            /* fetch all item  from server */
            $this.fetchCategoryItemCollection = function (category, render, region) {

                //
                var categoryId = category.attributes.menu_group_category_id,
                    collection = new Model.CategoryItem(category.attributes);

                // fetch success
                collection.on('sync', function (data) {

                    // pass collection
                    $this.categoryItemCollection[categoryId] = new Model.Collection(data.get('data'));

                    // render layout with collection
                    if (render) {
                        $this.renderCategoryItemCollection(category, categoryId);
                    }

                });

                //
                if ($this.categoryItemCollection[categoryId] == null) {
                    // fetch all item from server
                    collection.fetch();
                }

                else {
                    // render layout with collection
                    $this.renderCategoryItemCollection(category, categoryId);
                }

            };

            //
            $this.renderCategoryItemCollection = function (category, categoryId, region) {

                $this.categoryItem = category;

                // render layout with collection
                $this.renderMenu(categoryId, region || layout_container, category);

            };

            /* create form */
            $this.renderCategoryItemCreate = function (model, region) {

                //
                $this.resetSelected($this.collection);

                // instantiate view
                var createItemView = new View.MenuItemCreateView({
                    collection : $this.collection,
                    model : model
                });

                // render to region
                App.renderRegion(region, createItemView);

            };

            /* render collection */
            $this.renderMenu = function (categoryId, region, category) {

                // instantiate view
                var menuView = new View.MenuView( {
                    collection : $this.categoryItemCollection[categoryId],
                    model : category

                });

                //
                setTimeout( function () {
                    // render to region
                    App.renderRegion( region, menuView );
                }, 0);
            };

        }); /* code_ */

    });

    /* encapsulate */
})();

