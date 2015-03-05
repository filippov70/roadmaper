var _layersTreeConfiguration = {
	data: [{
		/*ТИС*/
		text: 'ТИС',
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
				text: 'Административно-территориальное деление',
				layerInfo: {
					displayName: 'Административно-территориальное деление',
					url: 'http://91.210.186.81:8181/geoserver/tis/wms?',
					layers: 'tis:admin_class',
					version: '1.1.1',
					srs: 'EPSG:3857',
					visible: true,
					opacity: 100,
					legend: true,
					serviceFormat: 'wms',
					isBaseLayer: false,
					aliases: [{
						field: 'calc_area',
						alias: 'Площадь'
					}, {
						field: 'adm_name',
						alias: 'Наименование'
					}, {
						field: 'cad_num',
						alias: 'Кадастровый номер'
					}]
				},
				type: 'layer'
			}, {
				text: 'Дорожно-транспортная сеть',
				layerInfo: {
					displayName: 'Дорожно-транспортная сеть',
					url: 'http://91.210.186.81:8181/geoserver/tis/wms?',
					layers: 'tis:all_roads',
					version: '1.3.0',
					srs: 'EPSG:3857',
					visible: true,
					opacity: 100,
					legend: true,
					serviceFormat: 'wms',
					isBaseLayer: false,
					imgField: 'id'
				},
				type: 'layer'
			}, {
				text: 'Границы населенных пунктов',
				layerInfo: {
					displayName: 'Границы населенных пунктов',
					url: 'http://91.210.186.81:8181/geoserver/tis/wms?',
					layers: 'tis:settlements',
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
		}, {
			text: 'Росреестр1',
			type: 'complex',
			state: {
				opened: true
			},
			children: [{
				text: 'Кадастр недвижимости ТО',
				layerInfo: {
					displayName: 'Кадастр недвижимости ТО',
					url: 'http://91.210.186.81:8181/geoserver/tis/wms?',
					layers: 'tis:cadastreparcel',
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