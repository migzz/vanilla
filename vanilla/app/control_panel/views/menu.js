/**
 * Created by Migz on 8/26/14.
 */

    /**
     *  View
     */

    define([
        vanilla.path.requireText + '/app/control_panel/templates/menu/layout.html',
        vanilla.path.requireText + '/app/control_panel/templates/menu/menu-item.html'
    ], function (
        menuLayoutTemplate,
        menuMenuItemTemplate
        ) {

        //
        return vanilla.app.module('Controller.Menu.View', function ( View, App, Backbone, Marionette, $, _ ) {

            //
            View.MenuItem = Marionette.ItemView.extend({
                template : _.template(menuMenuItemTemplate),
                tagName : 'li',
                initialize : function (){

                },
                events : {
                    'click .dashboard-menu-menu' : 'menuClick'
                },

                menuClick : function (e) {

                    var menuMenu = e.currentTarget.classList[0];
                    switch (menuMenu){
                        case 'menu-groups':
                            vanilla.app.MenuGroup.fetchList();
                            break;
                        case 'menu-categories':
                            break;
                        case 'menu-items':
                            break;
                        case 'transaction-type':
                            break;
                        case 'item-modifiers':
                            break;
                        case 'item-modifier-groups':
                            break;
                        case 'item-super-groups':
                            break;
                        case 'item-promo':
                            break;
                        default:
                    }
                }
            });

            //
            View.MenuCollection = Marionette.CollectionView.extend({
                childView : View.MenuItem,
                tagName : 'ul',
                className : 'controller-collection-list'
            });

            //
            View.Layout = Marionette.LayoutView.extend({
                template : _.template( menuLayoutTemplate ),

                //
                initialize  : function () {


                }
            });

        });

    });