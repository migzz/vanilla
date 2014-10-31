
/* Area Controller
 */
(function () {
    /* local setting */

    // region for layout collection
    var layout_container = 'region_setting_collection',

    // this module name like vanilla.app.BranchVariable
        module_name      = 'Modifier',

    // rest name
        model_name       = 'modifier',

    // rest id
        model_key_id     = model_name + '_id',

    // rest display name
        model_key_name   = model_name + '_name';


    define([model_name + '_view', model_name + '_model'], function (View, Model) {

        //
        return vanilla.app.module(module_name, function ( Modifier, App, Backbone, Marionette, $, _ ) {

            /* vars */

            // private
            var $this = this;

            // public
            $this.collection = new Model.Collection();
            $this.$carousel  = 0;

            /* animate close view */
            $this.closeView = function (view) {

                // delay to show animation
                setTimeout(function () {
                    // remove
                    view.destroy();
                }, 100);
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
                    $this.carouselMove('p');

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
                    $this.carouselMove('p');

                    // close view
                 // $this.closeView(view);w);
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
                    $this.carouselMove('p');

                    // close view
              // $this.closeView(view);view);

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
                $this.carouselMove('n');
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
                $this.carouselMove('n');
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

        }); /* code_ */

    });

    /* encapsulate */
})();

