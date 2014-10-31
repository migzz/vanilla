    /*
     * Regions
     */

    define (['marionette'], function (Marionette) {

        // simple animation
        Marionette.Region.prototype.attachHtml = function(view){
            this.$el.hide();
            //this.$el.html(view.el);
            this.$el.empty().append(view.el);
            this.$el.fadeIn();
        };

/*
        MyApp.mainRegion.on("before:show", function(view){
            // manipulate the `view` or do something extra
            // with the region via `this`
        });
*/
        //
        vanilla.app.regionManager = new Marionette.RegionManager();

        //
        vanilla.app.regionManager.addRegions({

            // Root container
            body : 'body',

            vanilla : '#vanilla',

            // Main content for our app
            main : 'main',

            region_dialog : '.dialog-content',

            /* POS */

            region_table_layout : '.pos-tables',
            region_table_area   : '.pos-tables .area-carousel',

            // Menus
            region_dashboard_menu    : '#controller-dashboard-menu-container',

            // Sub Menus
            region_setting_menu       : '#controller-setting-menu-container',
            region_menu_menu          : '#controller-menu-menu-container',

            /* Menu */
            region_menu : '#controller-dashboard-content',

            //region_menu_group
            region_menu_group         : '#menu-group-collection',

            //region_menu_category
            region_menu_category         : '#menu-group-detail',
            region_menu_group_category   : '#menu-group-categories',

            //region_menu_item
            region_menu_category_item : '#menu-category-items',
            region_menu_item          : '#menu-item-collection',
            region_menu_item_details  : '#menu-item-detail',
            region_menu_item_modifier  : '#menu-item-modifier',

            /* Setting */
            region_setting_collection : '#controller-setting-content',
            region_user_credential_id : '#user-credential-id-container',
            region_role_id : '#role-id-container',

            region_area_location : '.area-location-container',
            region_role_accesses : '.role-access-container',

            // Role
            region_setting_item_details : '#setting-item-details-container',

            /* Controller */
            region_menuGroupDetails    : '#menu-group-details-content',
            region_menuGroupCollection : '#menu-group-collection-container',

            region_menuCategoryDetails         : '#menu-category-details-content',
            region_menuGroupCategoryCollection : '#menu-group-category-content',

            region_controller : '#controller-dashboard-content'


        });

        var regionShow = function ($container, view) {
            // If container empty, render to main as default
            $container = $container || 'main';

            // Get our region
            var region = vanilla.app.regionManager.get($container);

            //console.log('region: ' + $container);

            var regionExist = $(region.el).length;

            //
            if ( regionExist == 1) {

                // Show
                region.reset().show( view, {
                    //forceShow: true
                });

            }

            //
            else {

                console.warn('Region "' + $container + '" not found.');

                region = vanilla.app.regionManager.get('main');

                // Show
                region.reset().show( view, {
                    //forceShow: true
                });

                //region.empty();

                return false;
            }
        };

        // Render to region
        vanilla.app.renderRegion = function ($container, view, delay) {

            if (delay) {
                setTimeout(function(){
                    regionShow($container, view)
                },0);
            }

            else {
                regionShow($container, view)
            }

        };

    });


// get($container)
// $container = $container || 'roleAccessSetting';
// vanilla.app.Regions.get($container).show(new View.Layout());

// animation custom
/*
 FadeInRegion = Backbone.Marionette.Region.extend({
 attachHtml: function(view){
 this.$el.hide();
 this.$el.html(view.el);
 this.$el.fadeIn();
 }

 });
 */
/* MyApp.addRegions({
 myRegion: FadeInRegion.extend({el: "#some-element"}),
 anotherRegion: FadeInRegion.extend({el: "#another-element"})
 });*/
