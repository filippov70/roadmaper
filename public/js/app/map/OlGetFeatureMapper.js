define([
	'jquery'
], function($) {

	'use strict';

	return function(options) {

		var _options = {};
		$.extend(_options, options || {});	

		return {
			map: function (features, aliases) {

				features = features || [];
				features = features[0] || {};

				var info = [],
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
				}
				return info;
			}			
		};
	};
});