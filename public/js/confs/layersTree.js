define([], function() {

	return {
		data: [{
			text: 'Дорога1',
			id: 'road1',
			type: 'road',
			state: {
				opened: true
			},
			children: [{
				text: 'Пусковые комплексы1',
				id: 'complex1',
				type: 'complex',
				state: {
					opened: true
				},
				children: [{
					text: 'Слой1',
					layerInfo: ['1', '2'],
					id: 'layer1',
					type: 'file'
				}, {
					text: 'Слой1',
					id: 'layer2',
					type: 'file'
				}, {
					text: 'Слой1',
					id: 'layer3',
					type: 'file'
				}]
			}, {
				text: 'Пусковые комплексы2',
				id: 'complex2',
				type: 'complex',
				state: {
					opened: true
				},
				children: [{
					text: 'Слой1',
					id: 'layer4',
					type: 'file'
				}, {
					text: 'Слой1',
					id: 'layer5',
					type: 'file'
				}, {
					text: 'Слой1',
					id: 'layer6',
					type: 'file'
				}]
			}]
		}, {

			text: 'Дорога2',
			id: 'road2',
			type: 'road',
			state: {
				opened: true
			},
			children: [{
				text: 'Пусковые комплексы1',
				id: 'complex3',
				type: 'complex',
				state: {
					opened: true
				},
				children: [{
					text: 'Слой1',
					id: 'layer7',
					type: 'file'
				}, {
					text: 'Слой1',
					id: 'layer8',
					type: 'file'
				}, {
					text: 'Слой1',
					id: 'layer9',
					type: 'file'
				}]
			}, {
				text: 'Пусковые комплексы2',
				id: 'complex4',
				type: 'complex',
				state: {
					opened: true
				},
				children: [{
					text: 'Слой1',
					id: 'layer10',
					type: 'file'
				}, {
					text: 'Слой1',
					id: 'layer11',
					type: 'file'
				}, {
					text: 'Слой1',
					id: 'layer12',
					type: 'file'
				}]
			}]
		}],
		types: {
			file: {
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