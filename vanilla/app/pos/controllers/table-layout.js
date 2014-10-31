/* Pin */

(function () {
    /* local setting */

    // region for layout collection
    var region_default = 'region_main',

    // this module name like vanilla.app.BranchVariable
        module_name      = 'TableLayout',

        model_name  = 'table_layout',

        class_name  = 'table-layout';

    define([model_name + '_view', 'area_model', 'location_model'], function (View, AreaModel, LocationModel) {

        //
        return vanilla.app.module(module_name, function ( TableLayout, App, Backbone, Marionette, $, _ ) {

            // private
            var $this = this;

            //
            $this.pinCode = '';

            $this.tables = 0;
            $this.locationCollection = 0;

            $this.areaCollection = 0;
            $this.areaCarousel = 0;

            $this.tableCarousel = 0;

            //
            $this.filterArea = function (areaName) {

                var original = new LocationModel.Collection($this.locationCollection.original);

                var filtered = original.filterArea(areaName);

                if ( filtered.length < 1) {
                    // return empty
                    $this.locationCollection.reset();

                    // todo show empty
                }

                else {

                    //
                    $this.locationCollection.reset(filtered);

                }

            };

            /* Location  */
            $this.fetchTable = function (region) {

                // instantiate
                var collection = new LocationModel.Collection();

                // fetch success
                collection.on('sync', function (data) {

                    // set collection data
                    //collection.reset(data.models[0].get('data'));

                    // pass collection
                    $this.locationCollection = collection;

                    $this.locationCollection['original'] = collection.models;

                    $this.renderTables($this.locationCollection, region);

                });

                // fetch all item from server
                collection.fetch();

            };

            /* render */
            $this.renderTables = function (collection, region) {

                // instantiate view
                $this.tables = new View.TableViews({
                    collection : collection
                });

                // render to region
                App.renderRegion(region, $this.tables);

                //
                $this.tableCarousel = Hammr.carousel('.pos .hammer');

            };


            /* Area  */
            $this.fetchArea = function (region) {

                // instantiate
                var collection = new AreaModel.Collection();

                // fetch success
                collection.on('sync', function (data) {

                    // set collection data
                    //collection.reset(data.models[0].get('data'));

                    // pass collection
                    $this.areaCollection = collection;

                    $this.renderArea($this.areaCollection, region);


                });

                // fetch all item from server
                collection.fetch();

            };

            /* render */
            $this.renderArea = function (collection, region) {

                // instantiate view
                var areaView = new View.AreaView( {
                    collection : collection
                });

                // render to region
                App.renderRegion( 'region_table_area', areaView );
            };

        }); /* code_ */

    });

    /* encapsulate */
})();