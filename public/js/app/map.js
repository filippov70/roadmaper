require([
	'jquery',
	'domReady',
	'ol',
	'helpers/layout',
	'jstree'
], function($, domReady, ol, layout, jstree) {

	domReady(function() {

		layout.init();

		$('#jstree_demo_div').jstree({
			"core": {
				"animation": 0,
				"check_callback": true,
				"themes": {
					"stripes": true
				},
				'data': [
					'Simple root node', {
						'text': 'Root node 2',
						'state': {
							'opened': true,
							'selected': true
						},
						'children': [{
								'text': 'Child 1'
							},
							'Child 2'
						]
					}, {
						"id": "demo_root_1",
						"text": "Root 1",
						"children": true,
						"type": "root",
						'children': ["Child 1", {
							"id": "demo_child_1",
							"text": "Child 2",
							"children": [{
								"id": "demo_child_2",
								"text": "One more",
								"type": "file"
							}]
						}]
					}, {
						"id": "demo_root_2",
						"text": "Root 2",
						"type": "root"
					}
				]
			},
			"types": {
				"#": {
					"max_children": 1,
					"max_depth": 4,
					"valid_children": ["root"]
				},
				"root": {
					"icon": "/static/3.0.9/assets/images/tree_icon.png",
					"valid_children": ["default"]
				},
				"default": {
					"valid_children": ["default", "file"]
				},
				"file": {
					"icon": "glyphicon glyphicon-file",
					"valid_children": []
				}
			},
			"plugins": [
				"contextmenu", "dnd", "search",
				"state", "types", "wholerow"
			]
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