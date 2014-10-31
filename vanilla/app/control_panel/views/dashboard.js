/**
 * Created by Migz on 8/26/14.
 */

    /**
     *  Branch Selection
     */

    define([
        vanilla.path.requireText + '/app/control_panel/templates/dashboard/layout.html',
        vanilla.path.requireText + '/app/control_panel/templates/dashboard/menu-item.html'
    ], function (
        dashboardLayoutTemplate,
        dashboardMenuItemTemplate
        ) {

        //
        return vanilla.app.module('Controller.Dashboard.View', function ( View, App, Backbone, Marionette, $, _ ) {

            //
            View.MenuItem = Marionette.ItemView.extend({
                template : _.template(dashboardMenuItemTemplate),
                tagName : 'li',
                onRender : function(itemView){


                    if (itemView.model.get('menu_name') == 'Dashboard') {
                        itemView.$el.addClass('active');
                    }
                },
                events : {
                    'click .dashboard-menu' : 'menuClick'
                },

                menuClick : function (itemView) {

                    var dashboardMenu = itemView.currentTarget.classList[0],
                        $this = this;

                    // if same page, exit
                    if ($this.el.classList.contains('active')) return false;

                    // remove active
                    $($this.el.parentElement).find('.active').removeClass('active');

                    // set active
                    // $($this.el).addClass('active');

                    // render
                    switch (dashboardMenu){
                        case 'dashboard':
                            vanilla.app.Controller.renderDashboard();
                            break;
                        case 'menu':
                            vanilla.app.MenuGroup.renderCollection();

                            break;
                        case 'inventory':
                            vanilla.app.Pin.renderPin();
                            break;
                        case 'reports':
                            vanilla.app.Shared.renderSelectApp();
                            break;
                        case 'settings':

                            vanilla.app.Controller.renderSetting();
                            break;
                        default:
                    }

                }
            });

            //
            View.CollectionView = Marionette.CollectionView.extend({
                childView : View.MenuItem,
                tagName : 'ul',
                className : 'controller-collection-list'
            });

            //
            View.Layout = Marionette.LayoutView.extend({
                template : _.template( dashboardLayoutTemplate ),

                regions : {
                    region_dashboard_menu : '#controller-dashboard-menu-container'
                }
            });

        });

    });