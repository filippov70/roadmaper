define([
	'jquery'
], function($) {

	'use strict';

	return function(options) {

		var _options = {};
		$.extend(_options, options || {});	

		return {
			map: function (featureInfo) {

				featureInfo = featureInfo || {};
				featureInfo.layerInfo = featureInfo.layerInfo || {};
				featureInfo.features = featureInfo.features || [];				

				var features = featureInfo.features[0] || {},
					aliases = featureInfo.layerInfo.aliases,
					title = featureInfo.layerInfo.displayName,
					info = [],
					property,
					properties = features.properties || {};

				if( aliases ) {

					$.each( aliases, function (i, item) {					
						var value = properties[item.field] || '';
						info.push({
							key: item.alias || '',
							value: value
						});
					});

//Пока нет картинок в слое
info.push({
	key: 'imageName',
	value: '/img/globe.png'
});					

				} else {

					for ( var key in properties ) {
						property = properties[key];
						if ( typeof property === 'string' || typeof property === 'number' || typeof property === 'boolean' ) {
							info.push({
								key: key,
								value: property
							});
						}
					}
//Пока нет картинок в слое					
info.push({
	key: 'imageName',
	value: '/img/globe.png'
});
				}
				return {
					title: title || '',
					info: info
				};
			}			
		};
	};
});