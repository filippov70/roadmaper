define([
	'jquery',
	'ol'
], function($, ol) {

	var LEGEND = $('<div id="ol_legend"></div>');

	return function(options) {

		var _options = {
				map : null
			};

		$.extend(_options, options || {});

		if(!_options.map || !_options.map instanceof ol.Map) {
			return;
		}	

		return {

			map: _options.map,

			create: function(element) {

				var that 		= this,
					hasLegend 	= false,
					layers 		= that.map.getLayers().getArray();

				LEGEND.html('');
				$(element).html(LEGEND);

				$.each(layers, function(i, layer) {

					var url,
						visible		= layer.getVisible(),
						isWms 		= layer.getSource() instanceof ol.source.TileWMS,
						layerInfo 	= layer.getProperties().layerInfo || {},
						legend 		= layerInfo.legend;

					if (visible && isWms && legend) {
						url = that.generateWmsUrlWithParam(layer);
						that.addImg(url, LEGEND);
						hasLegend = true;
					}

				});

				if (!hasLegend) {
					LEGEND.append('Легенда отсутствует');
				}

			},

			generateWmsUrlWithParam: function(layer) {
				var layerInfo 	= layer.getProperties().layerInfo || {},
					source 		= layer.getSource(),
					url 		= source.getUrls()[0],
					layerName 	= source.getParams().LAYERS;

				url += (url.indexOf('?') === -1) ? '?' : '';
				url += 'SERVICE=WMS';
				url += '&VERSION=' + layerInfo.version;
				url += '&REQUEST=GetLegendGraphic';
				url += '&FORMAT=image/png';
				url += '&LAYER=' + layerName;

				return url;
			},

			addImg: function(url, parent) {
				if (url) {
					var img = document.createElement("img"),
						br = document.createElement('br');
					img.src = url;
					parent.append(img);
					parent.append(br);
				}
				return;
			}
		};
	};
});