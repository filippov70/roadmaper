require([
    'jquery',
    'domReady',
    'ol',
    'mapConf',
    'helpers/layout',
    'map/LayersTree',
    'map/BaseLayersTree',
    'map/OlLayerSwitcher',
    'map/OlGetFeatureInfo',
    'map/OlGetFeatureInfoCadastre',
    'map/OlGetFeatureMapper',
    'map/OlPopup',
    'map/OlLegend',
    'map/OlToolbar',
    'map/OlFeatureHighlight',
    'bootstrap'
], function ($, domReady, ol, mapConf, Layout, LayersTree, BaseLayersTree, OlLayerSwitcher, OlGetFeatureInfo, OlGetFeatureInfoCadastre, OlGetFeatureMapper, OlPopup, OlLegend, OlToolbar, OlFeatureHighlight) {

    domReady(function () {

        $('#map-tabs a:first').tab('show');

        var layersTree = new LayersTree($('#layers_tree')),
                baselayersTree = new BaseLayersTree($('#baselayers_tree')),
                featureImageModalDom = $('#feature_image_modal'),
                featureImageModalBodyDom = featureImageModalDom.find('.modal-body'),
                map = new ol.Map({
                    layers: [],
                    target: 'map',
                    controls: [
                        new ol.control.ScaleLine({
                            units: 'metric'
                        })
                    ],
                    view: new ol.View({
                        center: ol.proj.transform([mapConf.centerLon, mapConf.centerLat], mapConf.centerProj, mapConf.mapProj),
                        zoom: mapConf.zoom
                    })
                }),
                layout = new Layout(map),
                olLayerSwitcher = new OlLayerSwitcher({
                    map: map
                }),
                olPopup = new OlPopup({
                    map: map
                }),
                olLegend = new OlLegend({
                    map: map
                }),
                olFeatureHighlight = new OlFeatureHighlight({
                    map: map
                }),
                olGetFeatureMapper = new OlGetFeatureMapper(),
                olGetFeatureInfo = new OlGetFeatureInfo({
                    map: map,
                    onGetfeatureinfo: function (features, coordinate) {
                        var infos = [];
                        $.each(features, function (i, featureInfo) {
                            var info = olGetFeatureMapper.map(featureInfo);
                            infos.push(info);
                        });
                        olPopup.show(coordinate, {infos: infos});
                        olFeatureHighlight.highlight(features);

                        //Модальное окно с картинкой из popup
                        $('.feature_image').click(function (e) {
                            var img = document.createElement("img");
                            featureImageModalDom.modal();
                            img.src = $(e.target).attr('data-whatever');
                            featureImageModalBodyDom.html(img);
                        });
                    }
                }),
                olGetFeatureInfoCadastre = new OlGetFeatureInfoCadastre({
                    map: map,
                    onGetfeatureinfo: function (features, coordinate) {
                        var infos = [];
                        $.each(features, function (i, featureInfo) {
                            var info = olGetFeatureMapper.map(featureInfo);
                            infos.push(info);
                        });
                        olPopup.show(coordinate, {infos: infos});
                    }
                }),
                olToolbar = new OlToolbar($('#map-toolbar'), {
                    map: map,
                    info: function () {
                        if (olGetFeatureInfo.isActivate) {
                            olGetFeatureInfo.deactivate();
                            olGetFeatureInfoCadastre.activate();
                            olFeatureHighlight.clear();
                            olPopup.clear();
                        } else {
                            olGetFeatureInfo.activate();
                            olGetFeatureInfoCadastre.deactivate();
                        }
                    },
                    infocad: function () {
                        if (olGetFeatureInfoCadastre.isActivate) {
                            olGetFeatureInfoCadastre.deactivate();
                            olGetFeatureInfo.activate();
                            olFeatureHighlight.clear();
                            olPopup.clear();
                        } else {
                            olGetFeatureInfoCadastre.activate();
                            olGetFeatureInfo.deactivate();
                        }
                    }
//                    ,
//                    area: addInteraction()
                });

        layersTree.onLoadNode = function (e, data) {

            data = data || {};
            data.node = data.node || {};
            data.node.children_d = data.node.children_d || [];

            $.each(data.node.children_d, function (i, nodeId) {
                var node = data.instance.get_node(nodeId),
                        layerInfo;
                if (node) {
                    node.original = node.original || {};
                    layerInfo = node.original.layerInfo;
                    if (layerInfo) {
                        olLayerSwitcher.initLayer(layerInfo);
                    }
                }
            });
        };

        layersTree.onChange = function (e, data) {
            olLayerSwitcher.switchLayer(data);
            olFeatureHighlight.clear();
            olPopup.clear();
        };

        baselayersTree.onChange = function (e, data) {
            olLayerSwitcher.switchBaseLayer(data);
        };

        $('a[href="#legend"]').on('shown.bs.tab', function (e) {
            olLegend.create($('#legend'));
        });

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

        //map.on('pointermove', pointerMoveHandler);

        $(map.getViewport()).on('mouseout', function () {
            $(helpTooltipElement).addClass('hidden');
        });

        var typeSelect;

        $('.map_tools_group .lin').click(function (e) {
            var btn = $(e.target).closest('.lin');
            if (btn.hasClass('active')) {
                typeSelect='length';
                map.removeInteraction(draw);
                addInteraction();
                map.on('pointermove', pointerMoveHandler);
                console.log('length click');
            }
        });
        
        $('.map_tools_group .area').click(function (e) {
            var btn = $(e.target).closest('.area');
            if (btn.hasClass('active')) {
                typeSelect='area';
                map.removeInteraction(draw);
                addInteraction();
                map.on('pointermove', pointerMoveHandler);
                console.log('area click');
            }
        });

        var draw; // global so we can remove it later
        
        function addInteraction() {
            var type;
            if (type === undefined){
                console.log('type is undefined');
                return;        
            }
            else {
                type = (typeSelect === 'area' ? 'Polygon' : 'LineString');
            }
            console.log('addInteraction');
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
            map.addInteraction(draw);

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
            map.addOverlay(helpTooltip);
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
            map.addOverlay(measureTooltip);
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

    });
});