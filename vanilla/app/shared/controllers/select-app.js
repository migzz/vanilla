/**
 * Created by Migz on 8/26/14.
 */


    /**
     *  Controller Branch Selection
     */

    define(['select_app_view'], function (View, Model) {

        return vanilla.app.module('Shared', function ( Shared, App, Backbone, Marionette, $, _ ) {

            Shared.renderSelectApp = function ($container) {

                var selectAppView = new Shared.View.SelectApp();

                // Render to region
                $container = $container || 'main';

                //
                App.renderRegion( $container, selectAppView );

                // Descriptions
                var vController = [
                        'Manage your store.',
                        'Tweak your shop.',
                        'Customize your business.'
                    ],

                    vPos = [
                        'Open for business.',
                        "Let's get started.",
                        'Ready to serve.'
                    ],

                    vExtension = [
                        'Extend your potential.',
                        ' Utilities on the go.',
                        'Advantage at your disposal.'
                    ];


                var $selectApp = $('.app-list');
                //
                $selectApp.find('#controller .select-app-description').html(vController[vanilla.fn.random(0, 2)] );
                $selectApp.find('#pos .select-app-description').html(vPos[vanilla.fn.random(0, 2)] );
                $selectApp.find('#extensions .select-app-description').html(vExtension[vanilla.fn.random(0, 2)] );

                //
                Shared.selectAppCarousel = Hammr.carousel('.hammer', 'select_app', 'tap panleft panright panstart panmove panend pancancel swipeleft swiperight');

            };

        });

    });