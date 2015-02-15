require([
	'jquery',
	'domReady',
	'ol',
	'helpers/Layout',
	'map/LayersTree',
	'map/OlLayerFactory'
], function($, domReady, ol, Layout, LayersTree, OlLayerFactory) {

	domReady(function() {

		var layout = new Layout(),

			layersTree = new LayersTree($('#jstree_demo_div')),

			view = new ol.View({
				center: ol.proj.transform([84.952, 56.464], 'EPSG:4326', 'EPSG:3857'),
				zoom: 12
			}),

			osm = new ol.layer.Tile({
				source: new ol.source.OSM()
			}),

			map = new ol.Map({
				layers: [osm],
				target: 'map',
				controls: ol.control.defaults().extend([
					new ol.control.ScaleLine({
						units: 'metric'
					})
				]),
				view: view
			}),

			olLayerFactory = new OlLayerFactory({
				map: map
			});

		layersTree.onChange = function(e, data) {

			var layerInfo = data.node.original.layerInfo;

			if(!layerInfo){
				console.log(data)
				return;
			}

			if(layerInfo.layer){

				if(data.action === "select_node"){
					layerInfo.layer.setVisible(true);
				}else{
					layerInfo.layer.setVisible(false);
				}
				
				console.log('visible')
			}else{
				console.log('create')
				layerInfo.layer = olLayerFactory.createLayer(data.node.original.layerInfo);
			}

		};	

	})
});