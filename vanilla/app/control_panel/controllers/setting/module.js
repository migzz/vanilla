
/* Module Controller
 */
(function () {
    /* local setting */

    // region for layout collection
    var layout_container = 'region_setting_collection',

    // this module name like vanilla.app.BranchVariable
        module_name      = 'Module',

    // rest name
        model_name       = 'module',

    // rest id
        model_key_id     = model_name + '_id',

    // rest display name
        model_key_name   = model_name + '_name';


    define([model_name + '_view', model_name + '_model', 'role_access_model'], function (View, Model, RoleAccessModel) {

        //
        return vanilla.app.module(module_name, function ( Module, App, Backbone, Marionette, $, _ ) {


            //
            App.regionManager.addRegions({
                //region_role_access_details : '.role-access-container #setting-item-details-container',
                //region_select_role : '.select-role-container'
                region_role_access : '.role-access-container'
            });

            /* vars */

            // private
            var $this = this;

            // public
            $this.modules = new Model.Collection();
            $this.send = [];

            $this.moduleAccessCreate = function (role) {

                var collection = new RoleAccessModel.Collection($this.getModuleAccess($this.send)),
                    syncCount = 0,
                    collectionLength = collection.length;

                collection.each(function (model) {

                    var roleId = role.get('id'),
                        roleAccess = App.RoleAccess.collection.filterAccess(roleId, model.get('module_id'));

                    if (roleAccess.length > 0) {
                        model.set({
                            id : roleAccess[0].get('role_access_id')
                        });
                    }

                    model.set({
                        role_id : roleId
                    });

                    if ( model.get('access_code') <= 0) {
                        //model.destroy();
                        var destroy = new RoleAccessModel.Item({
                            id : model.get('id'),
                            role_access_id : model.get('id')
                        });

                        destroy.on( 'sync', function (model) {
                            //syncCount++;
                            collection.trigger('sync');

                            /* remove from role access collection */
                            var remove = App.RoleAccess.collection.where({
                                role_access_id : model.get('role_access_id')
                            });

                            App.RoleAccess.collection.remove(remove);

                        } );

                        destroy.destroy();
                    }

                    else {

                        model.on('sync', function (syncModel) {

                            var roleAccessId = syncModel.get('id'),
                                roleId = syncModel.get('role_id'),
                                accessCode = syncModel.get('access_code'),
                                sync = App.RoleAccess.collection.where({
                                    role_access_id : roleAccessId
                                })[0] || syncModel;

                            /* */
                            sync.set({
                                id : roleAccessId,
                                role_access_id : roleAccessId,
                                r_role_id : roleId,
                                access_code : accessCode
                            });

                            App.RoleAccess.collection.add(sync);
                        });

                        model.save();
                    }

                });

                //
                collection.on('sync', function (model) {

                    syncCount++;

                    /* add or update from role access collection */

                    /* check if role exist */

                    /* */
                    if( syncCount >= collectionLength ) {

                        App.Role.carouselMove('p');

                    }


                });

                /* */
                if( collection.length <= 0 ) {
                    App.Role.carouselMove('p');
                }

                /* clear */
                $this.send = [];

            };

            $this.moduleTick = function (event, model) {

                var $target = $(event.target),
                    module = $target.data('module'),
                    access = $target.data('access'),
                    ticked = $target.data('ticked', $target.prop('checked')),
                    $moduleOptions = $('.module-access[data-module="' + module +'"]'),
                    $el = $('.module-access[data-module="' + module +'"][data-access="' + access +'"]'),
                    elRead = $($moduleOptions[0]),
                    elWrite = $($moduleOptions[1]),
                    elDelete = $($moduleOptions[2]);

                // clear
                $moduleOptions.each( function () {
                    var $this = $(this);
                    if ($this.data().access != access) {
                        $this.prop('checked', false);
                        $this.data('ticked', false);
                    }
                });

                // set
                switch (access) {
                    case 'read':
                        access = 'READ';
                        break;
                    case 'write':
                        elRead.prop('checked', true);
                        elRead.data('ticked', true);
                        access = 'READ+WRITE';
                        break;
                    case 'delete':
                        elRead.prop('checked', true);
                        elWrite.prop('checked', true);

                        elRead.data('ticked', true);
                        elWrite.data('ticked', true);

                        access = 'READ+WRITE+DELETE';
                        break;
                    default:
                }

                $target.data('ticked', $target.prop('checked'));

                ticked = $target.prop('checked');

                /* remove if no checkbox is ticked */
                if (ticked == false) {

                    /* get lower access */
                    switch (access) {
                        case 'READ':
                            access = 0;
                            break;
                        case 'READ+WRITE':

                            access = 'READ';
                            break;
                        case 'READ+WRITE+DELETE':

                            access = 'READ+WRITE';
                            break;
                        default:
                    }
                }

                /* */
                $this.send[module] = {
                    module_id : module,
                    access_code : access,
                    target_branch_id: '',
                    role_id : 0
                };

                // l($this.send);
                // l(model);

                /*
                 l('individual');
                 l(elRead.data());
                 l(elWrite.data());
                 l(elDelete.data());
                 */

            };

            $this.renderModules = function (region) {

                var module = $this.modules;

                var view = new View.ModuleCollectionView({
                    collection : module
                });

                App.renderRegion(region || 'region_role_access', view, true);

            };

            $this.getModuleAccess = function (module) {

                var access = [];
                for (var name in module) {
                    if (module.hasOwnProperty(name)) {
                        access.push(module[name]);
                    }
                }

                return access;
            };

            $this.getModules = function (module) {

                for (var name in module) {
                    if (module.hasOwnProperty(name)) {
                        $this.modules.add(module[name]);
                    }
                }

                return $this.modules;
            };

            /* fetch all item  from server */
            $this.fetchCollection = function (render, region) {

                // instantiate
                var collection = new Model.Collection();

                // fetch success
                collection.on('sync', function (data) {

                    var modules = data.models[0].get('data');

                    $this.modules.reset();

                    $this.getModules(modules);

                });

                // fetch all item from server
                collection.fetch();

            };

        }); /* code_ */

    });

    /* encapsulate */
})();

