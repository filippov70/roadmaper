define([], function() {

	return {
		data: [{
			text: 'Базовые слои',
			type: 'baselayer',
			state: {
				opened: true
			},
			children: [{
				text: 'OSM',
				type: 'layer',
				layerInfo: {
					isBaseLayer: true,
					serviceFormat: 'osm'
				}
			}, {
				text: 'Bing',
				type: 'layer',
				layerInfo: {
					key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
					isBaseLayer: true,
					imagerySet: 'Aerial',
					serviceFormat: 'bing'
				}
			}]
		}],
		types: {
			layer: {
				icon: 'glyphicon glyphicon-tasks color-blue'
			},
			baselayer: {
				icon: 'glyphicon glyphicon-globe color-hard-blue'
			}
		}
	};
});