require([
	'jquery',
	'domReady',
	'ol',
	'layersTreeConf',
	'helpers/layout',
	'jstree'
], function($, domReady, ol, layersTreeConf, layout, jstree) {

	domReady(function() {

		layout.init();

		$('#jstree_demo_div').jstree({
			core: {
				animation: 0,
				check_callback: true,
				themes: {
	                name: 'proton',
	                responsive: true,
	                stripes: true
				},
				data: layersTreeConf.data
			},
			types: layersTreeConf.types,
			plugins: [
				'types', 'checkbox'
			]
		}).on('changed.jstree', function(e, data) {
			console.log(arguments);

		});

		var view = new ol.View({
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
			});

	})
});