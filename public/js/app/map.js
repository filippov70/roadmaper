require([
	'jquery',
	'domReady',
	'ol',
	'mapConf',
	'helpers/Layout',
	'map/LayersTree',
	'map/OlLayerSwitcher',
	'map/OlGetFeatureInfo',
	'map/OlGetFeatureMapper',
	'map/OlPopup',
	'map/OlLegend',
	'bootstrap'
], function($, domReady, ol, mapConf, Layout, LayersTree, OlLayerSwitcher, OlGetFeatureInfo, OlGetFeatureMapper, OlPopup, OlLegend) {

	domReady(function() {

		$('#map-tabs a:first').tab('show');

		var layout = new Layout(),

			layersTree = new LayersTree($('#jstree_demo_div')),

			map = new ol.Map({
				layers: [new ol.layer.Tile({source: new ol.source.OSM()})],
				target: 'map',
				controls: ol.control.defaults().extend([
					new ol.control.ScaleLine({
						units: 'metric'
					})
				]),
				view: new ol.View({
					center: ol.proj.transform([mapConf.centerLon, mapConf.centerLat], mapConf.centerProj, mapConf.mapProj),
					zoom: mapConf.zoom
				})
			}),

			olLayerSwitcher = new OlLayerSwitcher({
				map: map
			}),

			olPopup = new OlPopup({
				map: map
			}),		

			olLegend = new OlLegend({
				map: map
			}),					

			olGetFeatureMapper = new OlGetFeatureMapper(),	

			olGetFeatureInfo = new OlGetFeatureInfo({
				map: map,
				onGetfeatureinfo: function (evt, coordinate) {	
					evt.features = evt.features || [];
					var info = olGetFeatureMapper.map(evt.features, evt.layerInfo.aliases)
					olPopup.show(coordinate, info);
				}
			});

		layersTree.onChange = function(e, data) {			
			olLayerSwitcher.switchLayer(data);
			if (olGetFeatureInfo.isActivate) {
				olGetFeatureInfo.deactivate();							
			} else {
				olGetFeatureInfo.activate();
			}
		};

		$('a[href="#legend"]').on('shown.bs.tab', function (e) {
			olLegend.create($('#legend'));
		});	
			
	})
});