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
					type,
					properties = features.properties || {};

				if( aliases ) {

					$.each( aliases, function (i, item) {					
						var value = properties[item.field] || '',
							type = '';

						//Если в конфиге сказано, что данное поле картинка, то присваем соответствующий тип
						if(featureInfo.layerInfo.imgField === item.field){
							type = 'img';
						}	

						info.push({
							key: item.alias || '',
							value: value,
							type: type
						});
					});			

				} else {

					for ( var key in properties ) {
						type = '';

						//Если в конфиге сказано, что данное поле картинка, то присваем соответствующий тип
						if(featureInfo.layerInfo.imgField === key){
							type = 'img';
						}	

						property = properties[key];
						if ( typeof property === 'string' || typeof property === 'number' || typeof property === 'boolean' ) {
							info.push({
								key: key,
								value: property,
								type: type
							});
						}
					}
				}
				return {
					title: title || '',
					info: info
				};
			}			
		};
	};
});