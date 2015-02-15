define([], function() {

	var serviceFormat = {
			wms : 1
		};

	return {
		data: [{
			text: 'Дорога1',
			type: 'road',
			state: {
				opened: true
			},
			children: [{
				text: 'Административное деление',
				type: 'complex',
				state: {
					opened: true
				},
				children: [{
					text: 'Дорожно-транспортная сеть',
					layerInfo: {
						url: 'http://www.incom.tomsk.ru:18080/geoserver/tis/wms?',
						layers: 'tis:all_roads',
						version: '1.3.0',
						srs: 'EPSG:3857',
						visible: true,
						opacity: 100,
						serviceFormat: serviceFormat.wms,
						isBaseLayer:false					
					},
					type: 'layer'
				}, {
					text: 'Границы населенных пунктов',
					layerInfo: {
						url: 'http://www.incom.tomsk.ru:18080/geoserver/tis/wms?',
						layers: 'tis:settlements',
						version: '1.3.0',
						srs: 'EPSG:3857',
						visible: true,
						opacity: 100,
						serviceFormat: serviceFormat.wms,
						isBaseLayer:false					
					},
					type: 'layer'
				}]
			}, {
				text: 'Росреестр',
				type: 'complex',
				state: {
					opened: true
				},
				children: [{
					text: 'Кадастр недвижимости ТО',
					layerInfo: {
						url: 'http://www.incom.tomsk.ru:18080/geoserver/tis/wms?',
						layers: 'tis:cadastreparcel',
						version: '1.1.0',
						srs: 'EPSG:3857',
						visible: true,
						opacity: 100,
						serviceFormat: serviceFormat.wms,
						isBaseLayer:false					
					},
					type: 'layer'
				}]
			}]
		}, {

			text: 'Дорога2',
			type: 'road',
			state: {
				opened: true
			},
			children: [{
				text: 'Полезные ископаемые',
				type: 'complex',
				state: {
					opened: true
				},
				children: [{
					text: 'Общераспространённые полезные ископаемые',
					layerInfo: {
						url: 'http://www.incom.tomsk.ru:18080/geoserver/tis/wms?',
						layers: 'tis:publicminerals',
						version: '1.3.0',
						srs: 'EPSG:3857',
						visible: true,
						opacity: 100,
						serviceFormat: serviceFormat.wms,
						isBaseLayer:false					
					},
					type: 'layer'
				}, {
					text: 'Сельскохозяйственные угодия ТО',
					layerInfo: {
						url: 'http://www.incom.tomsk.ru:18080/geoserver/tis/wms?',
						layers: 'tis:agroWGS',
						version: '1.1.0',
						srs: 'EPSG:3857',
						visible: true,
						opacity: 100,
						serviceFormat: serviceFormat.wms,
						isBaseLayer:false					
					},
					type: 'layer'
				}]
			}]
		}],
		types: {
			layer: {
				icon: 'glyphicon glyphicon-tasks color-blue'
			},
			road: {
				icon: 'glyphicon glyphicon-road color-hard-blue'
			},
			complex: {
				icon: 'glyphicon glyphicon-folder-close color-middle-blue'
			}
		}
	}
});