/**
 * Created by Migz on 8/26/14.
 */

    /**
     *  Branch Selection
     */

    define([
        vanilla.path.requireText + '/app/shared/templates/branch/branch-selection-item.html'
    ], function (
        branchSelectionItemTemplate
        ) {

        //
        return vanilla.app.module('Branch.View', function ( View, App, Backbone, Marionette, $, _ ) {

            // Item View
            View.BranchSelectionItem = Marionette.ItemView.extend({

                tagName   : 'li',
                template  : _.template( branchSelectionItemTemplate ),

                events : {
                    'click'    : 'selectBranch'
                },

                selectBranch : function () {

                    // TODO save selected branch

                    // render app selection
                    vanilla.app.Shared.renderSelectApp();
                }

            });

            // Collection View
            View.BranchSelectionCollection = Marionette.CollectionView.extend({

                childView  : View.BranchSelectionItem,
                tagName   : 'ul',
                className : 'branch-select-collection'
            });

        });

    });