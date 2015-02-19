define([
	'jquery',
	'ol'
], function($, ol) {

	'use strict';

	return function(options) {

		this.map = null;
		options = options || {};
		$.extend(this, options);

		return {

			createLayer: function(layerInfo) {

				var layer = null;

				if (!layerInfo) {
					return;
				}

				switch (layerInfo.serviceFormat) {
					case 1:
						layer = this._wms(layerInfo);
						layer.setProperties({
							layerInfo: layerInfo
						});
						break;
				}

				return layer;
			},

			_wms: function(layerInfo) {

				layerInfo.Opacity = layerInfo.Opacity || 100;

				var layer = new ol.layer.Tile({
					opacity: layerInfo.opacity / 100,
					title: layerInfo.displayName || '',
					visible: layerInfo.visible || '',
					source: new ol.source.TileWMS({
						url: layerInfo.url,
						params: {
							LAYERS: layerInfo.layers,
							VERSION: layerInfo.version,
							SRS: layerInfo.projection
						}
					})
				});

				if (layerInfo.isBaseLayer) {
					this.map.getLayers().insertAt(0, layer);
				} else {
					this.map.addLayer(layer);
				}

				return layer;

			}.bind(this)
		}
	};
});