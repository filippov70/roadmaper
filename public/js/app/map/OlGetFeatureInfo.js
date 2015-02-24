define([
	'jquery',
	'ol'
], function($, ol) {

	'use strict';

	return function(options) {

		var _options = {
				map : null,

				listener : null,

				featureCount : 1,

				infoFormat : 'application/json',

				isActivate : false,

				mapProjection: 'EPSG:3857',

				onGetfeatureinfo: null
			};

		$.extend(_options, options || {});

		if(_options.map) {
			_options.mapProjection = _options.map.getView().getProjection().getCode();
		} else {
			return;
		}	

		return {

			featureCount: _options.featureCount,

			infoFormat: _options.infoFormat,

			onGetfeatureinfo: _options.onGetfeatureinfo,

			map: _options.map,

			isActivate: _options.isActivate,

			getFeatures: function (layersInfo, coordinate) {
				layersInfo = layersInfo || [];
				var that = this,
					commonRes = [],
					promises = $.map(layersInfo, function (layerInfo) {
						return $.ajax('/gf/' + layerInfo.getFUrl).then(function (res) {		
							res = res || {};
							res.features = res.features || [];
							if(res.features.length){
								res.layerInfo = layerInfo;
								commonRes.push(res);	
							}															
						});
					});
				$.when.apply(this, promises)
					.then(function () {
						if (typeof that.onGetfeatureinfo === 'function') {
							that.onGetfeatureinfo(commonRes, coordinate);
						}
					});
			},			

			getUrls: function (coordinate) {
				var that			= this,
					view			= that.map.getView(),
					viewResolution	= view.getResolution(),
					projection		= view.getProjection().getCode(),				
					layers			= that.map.getLayers().getArray(),
					layersInfo		= [];

				$.each(layers, function (i, layer) {
					var properties	= layer.getProperties(),
						source		= layer.getSource(),
						visible		= layer.getVisible(),
						layerInfo   = properties.layerInfo || {},
						isWms		= source instanceof ol.source.TileWMS,
						url;
						
					if (visible && isWms) {
						url = source.getGetFeatureInfoUrl(coordinate, viewResolution, projection, {
							'INFO_FORMAT': that.infoFormat,
							'feature_count': that.featureCount
						}) || '';
						layerInfo.getFUrl = url; 
						layersInfo.push(layerInfo);
					}
				});
				return layersInfo;
			},			

			activate: function () {
				var that = this;
				_options.listener = that.map.on('singleclick', function (evt) {				
					that.getFeatures(that.getUrls(evt.coordinate), evt.coordinate);
				});
				that.isActivate = true;
			},

			deactivate: function () {
				var that = this;
				that.map.unByKey(_options.listener);
				that.isActivate = false;
			}		
		};
	};
});