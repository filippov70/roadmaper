define([], function() {

	var serviceFormat = {
		wms: 1
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
					text: 'Административно-территориальное деление',
					layerInfo: {
						url: 'http://91.210.186.81:8181/geoserver/tis/wms?',
						layers: 'tis:admin_class',
						version: '1.1.1',
						srs: 'EPSG:3857',
						visible: true,
						opacity: 100,
						serviceFormat: serviceFormat.wms,
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
						url: 'http://91.210.186.81:8181/geoserver/tis/wms?',
						layers: 'tis:all_roads',
						version: '1.3.0',
						srs: 'EPSG:3857',
						visible: true,
						opacity: 100,
						serviceFormat: serviceFormat.wms,
						isBaseLayer: false
					},
					type: 'layer'
				}, {
					text: 'Границы населенных пунктов',
					layerInfo: {
						url: 'http://91.210.186.81:8181/geoserver/tis/wms?',
						layers: 'tis:settlements',
						version: '1.3.0',
						srs: 'EPSG:3857',
						visible: true,
						opacity: 100,
						serviceFormat: serviceFormat.wms,
						isBaseLayer: false
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
						url: 'http://91.210.186.81:8181/geoserver/tis/wms?',
						layers: 'tis:cadastreparcel',
						version: '1.1.0',
						srs: 'EPSG:3857',
						visible: true,
						opacity: 100,
						serviceFormat: serviceFormat.wms,
						isBaseLayer: false
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
						url: 'http://91.210.186.81:8181/geoserver/tis/wms?',
						layers: 'tis:publicminerals',
						version: '1.3.0',
						srs: 'EPSG:3857',
						visible: true,
						opacity: 100,
						serviceFormat: serviceFormat.wms,
						isBaseLayer: false
					},
					type: 'layer'
				}, {
					text: 'Сельскохозяйственные угодия ТО',
					layerInfo: {
						url: 'http://91.210.186.81:8181/geoserver/tis/wms?',
						layers: 'tis:agroWGS',
						version: '1.1.0',
						srs: 'EPSG:3857',
						visible: true,
						opacity: 100,
						serviceFormat: serviceFormat.wms,
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
						url: 'http://data1.geo.indorsoft.ru/geoserver/geoportal/wms?',
						layers: 'geoportal:RoadHotel_pt',
						version: '1.3.0',
						srs: 'EPSG:3857',
						visible: true,
						opacity: 100,
						serviceFormat: serviceFormat.wms,
						isBaseLayer: false
					},
					type: 'layer'
				}, {
					text: 'АЗС',
					layerInfo: {
						url: 'http://data1.geo.indorsoft.ru/geoserver/geoportal/wms?',
						layers: 'geoportal:RoadGasStation_ar',
						version: '1.3.0',
						srs: 'EPSG:3857',
						visible: true,
						opacity: 100,
						serviceFormat: serviceFormat.wms,
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
	}
});