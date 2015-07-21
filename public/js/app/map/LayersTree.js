define([
	'jquery',
	'jstree'
], function($, jstree) {

	//Набор слоев для дерева, определяется глобально в /js/confs/layersTree.js
	var layersTreeConf = _layersTreeConfiguration;

	return function(element, options) {

		options = options || {};

		this.onChange = null;
		this.onLoadNode = null;

		options = options || {};
		$.extend(this, options);

		var that = this;

		that.tree = element.jstree({
			core: {
				animation: 0,
				check_callback: true,
				themes: {
	                name: 'proton',
	                responsive: true
	                //stripes: true
				},
				data: layersTreeConf.data
			},
			types: layersTreeConf.types,
			plugins: [
				'types', 'checkbox'
			]
		}).on('changed.jstree', function(e, data) {

			if(typeof that.onChange === 'function'){
				that.onChange(e, data);
			}
		}).on('load_node.jstree', function(e, data) {
			if(typeof that.onLoadNode === 'function'){
				that.onLoadNode(e, data);
			}			
		});
	};
});