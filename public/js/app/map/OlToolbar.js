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
    var _map;        
    // Measuring
    var source = new ol.source.Vector();

    var vector = new ol.layer.Vector({
        source: source,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#ffcc33',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ffcc33'
                })
            })
        })
    });
    
    
    /**
     * Currently drawn feature.
     * @type {ol.Feature}
     */
    var sketch;

    /**
     * The help tooltip element.
     * @type {Element}
     */
    var helpTooltipElement;


    /**
     * Overlay to show the help messages.
     * @type {ol.Overlay}
     */
    var helpTooltip;


    /**
     * The measure tooltip element.
     * @type {Element}
     */
    var measureTooltipElement;


    /**
     * Overlay to show the measurement.
     * @type {ol.Overlay}
     */
    var measureTooltip;


    /**
     * Message to show when the user is drawing a polygon.
     * @type {string}
     */
    var continuePolygonMsg = 'Нажмите для продолжения создания площади';


    /**
     * Message to show when the user is drawing a line.
     * @type {string}
     */
    var continueLineMsg = 'Нажмите для продолжения создания линии';


    /**
     * Handle pointer move.
     * @param {ol.MapBrowserEvent} evt
     */
    var pointerMoveHandler = function (evt) {
        if (evt.dragging) {
            return;
        }
        /** @type {string} */
        var helpMsg = 'Нажмите для начала рисования';

        if (sketch) {
            var geom = (sketch.getGeometry());
            if (geom instanceof ol.geom.Polygon) {
                helpMsg = continuePolygonMsg;
            } else if (geom instanceof ol.geom.LineString) {
                helpMsg = continueLineMsg;
            }
        }

        helpTooltipElement.innerHTML = helpMsg;
        helpTooltip.setPosition(evt.coordinate);

        $(helpTooltipElement).removeClass('hidden');
    };

    var draw; // global so we can remove it later
    
    var typeSelect;

    function addInteraction() {
        var type;
        if (typeSelect === undefined) {
            console.log('type is undefined');
            return;
        } else {
            type = (typeSelect === 'area' ? 'Polygon' : 'LineString');
        }
        //console.log('addInteraction');
        draw = new ol.interaction.Draw({
            source: source,
            type: /** @type {ol.geom.GeometryType} */ (type),
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 0, 0.5)',
                    lineDash: [10, 10],
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 5,
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0, 0, 0, 0.7)'
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    })
                })
            })
        });
        
        // ОЧистка
        _map.getLayers().forEach(function(el, idx, arr){
           if(el.getSource().addFeatures) {
               el.getSource().clear();
               _map.removeOverlay(measureTooltip);
               _map.removeOverlay(helpTooltip);
               _map.removeInteraction(draw);
           }
        });
        
        _map.addInteraction(draw);

        createMeasureTooltip();
        createHelpTooltip();

        var listener;
        draw.on('drawstart',
                function (evt) {
                    // set sketch
                    sketch = evt.feature;

                    /** @type {ol.Coordinate|undefined} */
                    var tooltipCoord = evt.coordinate;

                    listener = sketch.getGeometry().on('change', function (evt) {
                        var geom = evt.target;
                        var output;
                        if (geom instanceof ol.geom.Polygon) {
                            output = formatArea(/** @type {ol.geom.Polygon} */ (geom));
                            tooltipCoord = geom.getInteriorPoint().getCoordinates();
                        } else if (geom instanceof ol.geom.LineString) {
                            output = formatLength(/** @type {ol.geom.LineString} */ (geom));
                            tooltipCoord = geom.getLastCoordinate();
                        }
                        measureTooltipElement.innerHTML = output;
                        measureTooltip.setPosition(tooltipCoord);
                    });
                }, this);

        draw.on('drawend',
                function (evt) {
                    measureTooltipElement.className = 'tooltip tooltip-static';
                    measureTooltip.setOffset([0, -7]);
                    // unset sketch
                    sketch = null;
                    // unset tooltip so that a new one can be created
                    measureTooltipElement = null;
                    createMeasureTooltip();
                    ol.Observable.unByKey(listener);
                }, this);
    }


    /**
     * Creates a new help tooltip
     */
    function createHelpTooltip() {
        if (helpTooltipElement) {
            helpTooltipElement.parentNode.removeChild(helpTooltipElement);
        }
        helpTooltipElement = document.createElement('div');
        helpTooltipElement.className = 'tooltip hidden';
        helpTooltip = new ol.Overlay({
            element: helpTooltipElement,
            offset: [15, 0],
            positioning: 'center-left'
        });
        _map.addOverlay(helpTooltip);
    }


    /**
     * Creates a new measure tooltip
     */
    function createMeasureTooltip() {
        if (measureTooltipElement) {
            measureTooltipElement.parentNode.removeChild(measureTooltipElement);
        }
        measureTooltipElement = document.createElement('div');
        measureTooltipElement.className = 'tooltip tooltip-measure';
        measureTooltip = new ol.Overlay({
            element: measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center'
        });
        _map.addOverlay(measureTooltip);
    }


    /**
     * Let user change the geometry type.
     * @param {Event} e Change event.
     */


    /**
     * format length output
     * @param {ol.geom.LineString} line
     * @return {string}
     */
    var formatLength = function (line) {
        var length;
        length = Math.round(line.getLength() * 100) / 100;
        var output;
        if (length > 100) {
            output = (Math.round(length / 1000 * 100) / 100) +
                    ' ' + 'км';
        } else {
            output = (Math.round(length * 100) / 100) +
                    ' ' + 'м';
        }
        return output;
    };


    /**
     * format length output
     * @param {ol.geom.Polygon} polygon
     * @return {string}
     */
    var formatArea = function (polygon) {
        var area;
        area = polygon.getArea();

        var output;
        if (area > 10000) {
            output = (Math.round(area / 1000000 * 100) / 100) +
                    ' ' + 'км<sup>2</sup>';
        } else {
            output = (Math.round(area * 100) / 100) +
                    ' ' + 'м<sup>2</sup>';
        }
        return output;
    };

    //addInteraction();

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
            line: function () {},
            area: function () {}
        };
        _map = options.map;
        _map.addLayer(vector);
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
                _map.removeOverlay(measureTooltip);
                _map.removeOverlay(helpTooltip);
                _map.removeInteraction(draw);
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
                _map.removeOverlay(measureTooltip);
                _map.removeOverlay(helpTooltip);
                _map.removeInteraction(draw);
            }
            if (typeof _options.infocad === 'function') {
                _options.infocad();
            }
        });

        

        $(options.map.getViewport()).on('mouseout', function () {
            $(helpTooltipElement).addClass('hidden');
        });

        $('.map_tools_group .lin').click(function (e) {
            var btn = $(e.target).closest('.lin');
            if (btn.hasClass('active')) {
                btn.removeClass('active');
                _map.removeOverlay(measureTooltip);
                _map.removeOverlay(helpTooltip);
                _map.removeInteraction(draw);
                _map.un('pointermove', pointerMoveHandler);
                $('.tooltip-static').remove();
            }
            else {
                btn.addClass('active').siblings().removeClass('active');
                typeSelect='length';
                _map.removeOverlay(measureTooltip);
                _map.removeOverlay(helpTooltip);
                _map.removeInteraction(draw);
                $('.tooltip-static').remove();
                addInteraction();
                _map.on('pointermove', pointerMoveHandler);
                
            }
            if (typeof _options.line === 'function') {
                _options.line();
            }
        });
        
        $('.map_tools_group .area').click(function (e) {
            var btn = $(e.target).closest('.area');
            if (btn.hasClass('active')) {
                btn.removeClass('active');
                _map.removeOverlay(measureTooltip);
                _map.removeOverlay(helpTooltip);
                _map.removeInteraction(draw);
                _map.un('pointermove', pointerMoveHandler);
                $('.tooltip-static').remove();
            }
            else {
                btn.addClass('active').siblings().removeClass('active');
                typeSelect='area';
                _map.removeOverlay(measureTooltip);
                _map.removeOverlay(helpTooltip);
                _map.removeInteraction(draw);
                $('.tooltip-static').remove();
                addInteraction();
                _map.on('pointermove', pointerMoveHandler);
                
            }
            if (typeof _options.area === 'function') {
                _options.area();
            }
        });
    };

});