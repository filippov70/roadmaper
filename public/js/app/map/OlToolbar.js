define([
    'jquery',
    'jsrender',
    'ol'
], function ($, jsrender, ol) {

    'use strict';

    var ZOOM_IN = 'zoom_in',
            ZOOM_OUT = 'zoom_out',
            INFO = 'info',
            INFOCAD = 'infocad',
            LIN = 'lin',
            AREA = 'area',
            //CADFIND = 'cadfind',
            TOOLBAR = '<div class="btn-group map_tools_group" role="group">' +
            '<button class="btn btn-default ' + ZOOM_IN + '" type="button">' +
            '<span class="glyphicon glyphicon-zoom-in color-hard-blue" aria-hidden="true"></span>' +
            '</button>' +
            '<button class="btn btn-default ' + ZOOM_OUT + '" type="button">' +
            '<span class="glyphicon glyphicon-zoom-out color-hard-blue" aria-hidden="true"></span>' +
            '</button>' +
            '<button class="btn btn-default ' + INFO + '" type="button">' +
            '<span class="glyphicon glyphicon-info-sign color-hard-blue" aria-hidden="true"></span>' +
            '</button>' +
            '<button class="btn btn-default ' + INFOCAD + '" type="button">' +
            '<span class="glyphicon glyphicon-flash color-hard-blue" aria-hidden="true"></span>' +
            '</button>' +
            '<button class="btn btn-default ' + LIN + '" type="button">' +
            '<span class="glyphicon glyphicon-minus color-hard-blue" aria-hidden="true"></span>' +
            '</button>' +
            '<button class="btn btn-default ' + AREA + '" type="button">' +
            '<span class="glyphicon glyphicon-cloud color-hard-blue" aria-hidden="true"></span>' +
            '</button>' +
//                        '<div class="row">' +
//                            '<div class="col-lg-6">'+
//                                '<div class="input-group">' +
//                                    '<input type="text" class="form-control" placeholder="Поиск по кадастру. Напишите кадастровый номер">'+
//                                    '<span class="input-group-btn">'+
//                                        '<button class="btn btn-default" type="button">Искать!</button>'+
//                                    '</span>'+
//                                '</div>' +
//                            '</div>'+
//                        '</div>' +
            '</div>';

    return function (element, options) {

        if (!options.map || !options.map instanceof ol.Map) {
            return;
        }

        var _options = {
            map: null,
            zoomin: function () {
                options.map.getView().setZoom(options.map.getView().getZoom() + 1);
            },
            zoomout: function () {
                options.map.getView().setZoom(options.map.getView().getZoom() - 1);
            },
            info: function () {},
            infocad: function () {},
            lin: function () {},
            area: function () {}
        };

        $.extend(_options, options || {});

        if (element) {
            element.html(TOOLBAR);
        } else {
            return;
        }

        $('.map_tools_group .' + ZOOM_IN).click(function () {
            if (typeof _options.zoomin === 'function') {
                _options.zoomin();
            }
        });

        $('.map_tools_group .' + ZOOM_OUT).click(function () {
            if (typeof _options.zoomout === 'function') {
                _options.zoomout();
            }
        });

        $('.map_tools_group .' + INFO).click(function (e) {
            var btnInfo = $(e.target).closest('.' + INFO);
            if (btnInfo.hasClass('active')) {
                btnInfo.removeClass('active');
            } else {
                btnInfo.addClass('active').siblings().removeClass('active');
                // http://stackoverflow.com/questions/20870671/bootstrap-3-btn-group-lose-active-class-when-click-any-where-on-the-page
            }
            if (typeof _options.info === 'function') {
                _options.info();
            }
        });

        $('.map_tools_group .' + INFOCAD).click(function (e) {
            var btnCinfo = $(e.target).closest('.' + INFOCAD);
            if (btnCinfo.hasClass('active')) {
                btnCinfo.removeClass('active');
            } else {
                btnCinfo.addClass('active').siblings().removeClass('active');
            }
            if (typeof _options.infocad === 'function') {
                _options.infocad();
            }
        });

        $('.map_tools_group .' + LIN).click(function (e) {
            var btn = $(e.target).closest('.' + LIN);
            if (btn.hasClass('active')) {
                btn.removeClass('active');
            } else {
                btn.addClass('active').siblings().removeClass('active');
            }
            if (typeof _options.infocad === 'function') {
                _options.lin();
            }
        });

        $('.map_tools_group .' + AREA).click(function (e) {
            var btn = $(e.target).closest('.' + AREA);
            if (btn.hasClass('active')) {
                btn.removeClass('active');
            } else {
                btn.addClass('active').siblings().removeClass('active');
            }
            if (typeof _options.infocad === 'function') {
                _options.area();
            }
        });
    };

});