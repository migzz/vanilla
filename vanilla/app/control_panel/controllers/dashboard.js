/**
 * Created by Migz on 8/26/14.
 */

    /**
     *  Controller Branch Selection
     */

    define(['control_panel_view', 'control_panel_model'], function (View, Model) {

        return vanilla.app.module('Controller', function ( Controller, App, Backbone, Marionette, $, _ ) {

            Controller.fetchControlPanel = function () {

                App.MenuGroup.fetchCollection();
                App.MenuCategory.fetchCollection();
                App.MenuItem.fetchCollection();

                App.Area.fetchCollection();
                App.Location.fetchCollection();
                App.Role.fetchCollection();
                App.RoleAccess.fetchCollection();
                App.Module.fetchCollection();
                App.Department.fetchCollection();
                App.Shift.fetchCollection();
                App.User.fetchCollection();
                App.UserCredential.fetchCollection();
                App.UserRole.fetchCollection();
                App.Printer.fetchCollection();

/*
                App.Area.fetchCollection();
                App.Associate.fetchCollection();
                App.AssociateContact.fetchCollection();
                App.BranchVariable.fetchCollection();
                App.Contact.fetchCollection();
                App.Customer.fetchCollection();
                App.CustomerVariable.fetchCollection();
                App.Department.fetchCollection();
                App.Discount.fetchCollection();
                App.GlobalSetting.fetchCollection();
                App.HappyHour.fetchCollection();
                App.HappyHourTiming.fetchCollection();
                App.InventoryGroup.fetchCollection();
                App.InventoryItem.fetchCollection();
                App.Item.fetchCollection();
                App.ItemHappyHour.fetchCollection();
                App.ItemModifier.fetchCollection();
                App.ItemTag.fetchCollection();
                App.ItemTimeSitting.fetchCollection();
                App.Location.fetchCollection();
                App.LocationVariable.fetchCollection();
                App.Modifier.fetchCollection();
                App.ModifierOption.fetchCollection();
                App.Module.fetchCollection();
                App.OperatingTime.fetchCollection();
                App.PaymentMode.fetchCollection();
                App.Printer.fetchCollection();
                App.Role.fetchCollection();
                App.RoleAccess.fetchCollection();
                App.Shift.fetchCollection();
                App.SpecialOperationDate.fetchCollection();
                App.SpecialTurnTime.fetchCollection();
                App.Tag.fetchCollection();
                App.Tax.fetchCollection();
                App.TaxProfile.fetchCollection();
                App.TimeSitting.fetchCollection();
                App.TransactionType.fetchCollection();
                App.User.fetchCollection();
                App.UserCredential.fetchCollection();
                App.UserRole.fetchCollection();
*/
            };

            Controller.renderDashboard = function ($container) {

                var dashboardLayout = new View.Layout();

                // Render to region
                $container = $container || 'main';

                //
                App.renderRegion( $container, dashboardLayout );

                // Render Menu
                Controller.renderMenu();

            };

            Controller.renderSetting = function ($container) {

                //
                App.Controller.Setting.renderLayout($container);

                //
                App.Controller.Setting.renderMenu();

            };


            Controller.renderMenuMenu = function ($container) {

                //
                App.Controller.Menu.renderLayout($container);

                //
                App.Controller.Menu.renderMenu();

            };

            Controller.renderMenu = function ($container) {

                //
                var CDM = Backbone.Collection.extend();

                //
                var dashboardMenu = new View.CollectionView({
                    collection: new CDM(Model.DashboardMenus)
                });

                // Render to region
                $container = $container || 'region_dashboard_menu';

                //
                App.renderRegion( $container, dashboardMenu );
            };

        });

    });