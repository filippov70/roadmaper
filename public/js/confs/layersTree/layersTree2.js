var _layersTreeConfiguration = {
	data: [{
		text: 'ТИС',
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
					displayName: 'Общераспространённые полезные ископаемые',
					url: 'http://91.210.186.81:8181/geoserver/tis/wms?',
					layers: 'tis:publicminerals',
					version: '1.3.0',
					srs: 'EPSG:3857',
					visible: true,
					opacity: 100,
					legend: true,
					serviceFormat: 'wms',
					isBaseLayer: false
				},
				type: 'layer'
			}, {
				text: 'Сельскохозяйственные угодия ТО',
				layerInfo: {
					displayName: 'Сельскохозяйственные угодия ТО',
					url: 'http://91.210.186.81:8181/geoserver/tis/wms?',
					layers: 'tis:agroWGS',
					version: '1.1.0',
					srs: 'EPSG:3857',
					visible: true,
					opacity: 100,
					legend: true,
					serviceFormat: 'wms',
					isBaseLayer: false
				},
				type: 'layer'
			}]
		}]
	}, {
		text: 'ИндорСофт',
		type: 'road',
		state: {
			opened: true
		},
		children: [{
			text: 'Недвижимость',
			type: 'complex',
			state: {
				opened: true
			},
			children: [{
				text: 'Гостиницы',
				layerInfo: {
					displayName: 'Гостиницы',
					url: 'http://data1.geo.indorsoft.ru/geoserver/geoportal/wms?',
					layers: 'geoportal:RoadHotel_pt',
					version: '1.3.0',
					srs: 'EPSG:3857',
					visible: true,
					opacity: 100,
					legend: true,
					serviceFormat: 'wms',
					isBaseLayer: false
				},
				type: 'layer'
			}, {
				text: 'АЗС',
				layerInfo: {
					displayName: 'АЗС',
					url: 'http://data1.geo.indorsoft.ru/geoserver/geoportal/wms?',
					layers: 'geoportal:RoadGasStation_ar',
					version: '1.3.0',
					srs: 'EPSG:3857',
					visible: true,
					opacity: 100,
					legend: true,
					serviceFormat: 'wms',
					isBaseLayer: false
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
};