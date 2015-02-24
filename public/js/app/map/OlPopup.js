define([
	'jquery',
	'jsrender',
	'ol'
], function($, jsrender, ol) {

	'use strict';

	var POPUP = '<div id="popup" class="ol-popup" >'+
                    '<a href="#" id="popup-closer" class="ol-popup-closer"></a>'+
                    '<div id="popup-content" class="popup-content">'+                      
                    '</div>'+
                '</div>',
        POPUP_WRAPPER = '#popup',
        POPUP_CONTENT = '#popup-content',
        POPUP_CLOSER = '#popup-closer';  

	return function(options) {

		var _options = {
				map : null,

				tpl: $( "#movieTemplate" ),

				overlay : null,

				mapProjection: 'EPSG:3857',

				onGetfeatureinfo: null
			};

		$.extend(_options, options || {});

		if(_options.map && _options.map instanceof ol.Map) {
			$(_options.map.getViewport()).parent().prepend(POPUP);
			_options.mapProjection = _options.map.getView().getProjection().getCode();
		} else {
			return;
		}	

		_options.overlay = new ol.Overlay({
			element: $(POPUP_WRAPPER)
		});		

		_options.map.addOverlay(_options.overlay);

		$(POPUP_CLOSER).click(function() {
			_options.overlay.setPosition(undefined);
			return false;
		});		

		return {

			overlay: _options.overlay,

			show: function (coordinate, infos) {
				infos = infos || [];
				var that = this;
				that._renderContent(infos);
				that.overlay.setPosition(coordinate);
			},

			_renderContent:function(info){
				info = info || [];
				$(POPUP_CONTENT).html(
				    _options.tpl.render( info )
				);				
			},

			clear: function(){
				if(this.overlay){
					this.overlay.setPosition(undefined);
				}				
			}				
		};
	};
});