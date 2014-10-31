
    /**
     *
     */

    define([
        vanilla.path.requireText + '/app/control_panel/templates/setting/layout.html',
        vanilla.path.requireText + '/app/control_panel/templates/setting/menu-item.html'
    ], function (
        settingLayoutTemplate,
        settingMenuItemTemplate
        ) {

        //
        return vanilla.app.module('Controller.Setting.View', function ( View, App, Backbone, Marionette, $, _ ) {

            //
            View.MenuItem = Marionette.ItemView.extend({
                template : _.template(settingMenuItemTemplate),
                tagName : 'li',
                initialize : function (){

                },

                events : {
                    'click .dashboard-setting-menu' : 'menuClick'
                },

                menuClick : function (e) {

                    var settingMenu = e.currentTarget.classList[0];

                    switch (settingMenu){
                        case 'general':
                            break;
                        case 'branch':
                            vanilla.app.Branch.renderBranchSelection();
                            break;
                        case 'pos':
                            vanilla.app.POS.renderCollection();
                            break;
                        case 'department':
                            vanilla.app.Department.renderCollection();
                            break;
                        case 'shift':
                            vanilla.app.Shift.renderCollection();
                            break;
                        case 'area-location':
                            vanilla.app.Area.renderCollection();
                            break;
                        case 'reservations':
                            vanilla.app.Reservation.renderCollection();
                            break;
                        case 'terminal':
                            vanilla.app.Terminal.renderCollection();
                            break;
                        case 'users':
                            vanilla.app.User.renderCollection();
                            break;
                        case 'roles-permission':
                            vanilla.app.Role.renderCollection();
                            break;
                        case 'printer':
                            vanilla.app.Printer.renderCollection();
                            break;
                        case 'promotions':
                            break;
                        case 'receipt-template':
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
                template : _.template( settingLayoutTemplate ),

                //
                initialize  : function () {


                }
            });

        });

    });