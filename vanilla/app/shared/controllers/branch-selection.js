/**
 * Created by Migz on 8/26/14.
 */


    /**
     *  Controller Branch Selection
     */

    define(['branch_selection_view', 'shared_branch_model'], function (View, Model) {

        return vanilla.app.module('Branch', function ( Branch, App, Backbone, Marionette, $, _ ) {

            Branch.renderBranchSelection = function ($container) {

                // create model instance
                var branchSelection = new Model.BranchSelection();

                // get branch list
                branchSelection.fetch();

                // on server response
                branchSelection.on('sync', function (data) {

                    // TODO save to localstorage data.get('data')


                    // Collection model
                    var branchSelectionCollection = new Model.Collection(data.get('data'));

                    // create collection view and set our collection
                    var branchSelectionView = new View.BranchSelectionCollection({
                        collection : branchSelectionCollection
                    });

                    // Render to region
                    $container = $container || 'main';

                    //
                    App.renderRegion( $container, branchSelectionView );

                    // rendering 2 ways, and iba pa yung sa marionette region

                    // [1] render element directly via jquery
                    // $(container).html(branchSelectionView.render().el);

                    /* [2] one region per view, cant append

                     vanilla.app.addRegions({
                     variableName : '#element'
                     });

                     vanilla.app.getRegion('variableName').show(branchSelectionView);

                     */
                })

                // on server Error
                .on('error', function(){
                    console.warn('Fetching branch list error..');
                });
            };

        });

    });