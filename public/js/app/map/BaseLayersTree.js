define([
	'jquery',
	'jstree',
	'baseLayersTreeConf'
], function($, jstree, baseLayersTreeConf) {
	
	var layersTreeConf = baseLayersTreeConf;

	return function(element, options) {

		options = options || {};

		this.onChange = null,

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
				'types'
			]
		}).on('changed.jstree', function(e, data) {

			if(typeof that.onChange === 'function'){
				that.onChange(e, data);
			}
		});
	};
});