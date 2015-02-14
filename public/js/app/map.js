require([
	'jquery',
	'domReady',
	'ol',
	'helpers/layout'
], function($, domReady, ol, layout) {

	domReady(function() {

		layout.init();

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

