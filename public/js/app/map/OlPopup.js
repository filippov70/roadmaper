define([
	'jquery',
	'ol'
], function($, ol) {

	'use strict';

	return function(options) {

		var _options = {
				map : null,

				container : document.getElementById('popup'),

				content : document.getElementById('popup-content'),

				closer : document.getElementById('popup-closer'),

				overlay : null,

				mapProjection: 'EPSG:3857',

				onGetfeatureinfo: null
			};

		$.extend(_options, options || {});

		if(_options.map) {
			_options.mapProjection = _options.map.getView().getProjection().getCode();
		} else {
			return;
		}	

		_options.overlay = new ol.Overlay({
			element: _options.container
		});		

		_options.closer.onclick = function() {
			_options.overlay.setPosition(undefined);
			_options.closer.blur();
			return false;
		};

		_options.map.addOverlay(_options.overlay);

		_options.content.innerHTML = '<div class="row">'+
		                        '<div class="col-lg-6 col-md-6"></div>'+
		                        '<div class="col-lg-6 col-md-6"></div>'+
		                    '</div>'+
		                    '<div class="row">'+
		                        '<div class="col-lg-6 col-md-6"></div>'+
		                        '<div class="col-lg-6 col-md-6"></div>'+
		                    '</div>';		

		return {

			overlay: _options.overlay,

			show: function (coordinate) {
				var that = this;
				that.overlay.setPosition(coordinate);				
			}				
		}
	};
});