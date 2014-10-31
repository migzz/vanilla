/**
 * Created by Migz on 8/26/14.
 */

    /**
     *  Controller Branch Selection
     */

    define([], function () {

        return vanilla.app.module('UI', function ( UI, App, Backbone, Marionette, $, _ ) {

            /* fetch all item  from server */
            UI.renderSelect = function (Module, region) {

                if (Module.collection == 0) {
                    // instantiate
                    var collection = new Module.Model.Collection();

                    // fetch success
                    collection.on('sync', function (data) {

                        // set collection data
                        //collection.reset(data.models[0].get('data'));

                        // pass collection
                        Module.collection = collection;

                        // instantiate view
                        var view = new Module.View.SelectView( {
                            collection : Module.collection
                        });

                        // render to region
                        App.renderRegion( region, view );

                        $(view.$el).dropdown();
                    });

                    // fetch all item from server
                    collection.fetch();
                }

                else {

                    // instantiate view
                    var view = new Module.View.SelectView( {
                        collection : Module.collection
                    });

                    // render to region
                    App.renderRegion( region, view );

                    $(view.$el).dropdown();
                }

            };

        });

    });