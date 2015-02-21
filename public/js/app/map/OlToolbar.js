define([
	'jquery',
	'jsrender',
	'ol'
], function($, jsrender, ol) {

	'use strict';

	var ZOOM_IN = 'zoom_in',
        ZOOM_OUT = 'zoom_out',
        INFO = 'info',
		TOOLBAR = 	'<div class="btn-group map_tools_group" role="group">'+
	                    '<button class="btn btn-default ' + ZOOM_IN + '" type="button">'+
	                        '<span class="glyphicon glyphicon-zoom-in color-hard-blue" aria-hidden="true"></span>'+
	                    '</button>'+
	                    '<button class="btn btn-default ' + ZOOM_OUT + '" type="button">'+
	                        '<span class="glyphicon glyphicon-zoom-out color-hard-blue" aria-hidden="true"></span>'+
	                    '</button>'+
	                    '<button class="btn btn-default ' + INFO + '" type="button">'+
	                        '<span class="glyphicon glyphicon-info-sign color-hard-blue" aria-hidden="true"></span>'+
	                    '</button>'+
                	'</div>'; 

	return function(element, options) {

		if(!options.map || !options.map instanceof ol.Map) {
			return;
		}			

		var _options = {
				map : null,

				zoomin: function(){ options.map.getView().setZoom(options.map.getView().getZoom() + 1); },

				zoomout: function(){ options.map.getView().setZoom(options.map.getView().getZoom() - 1); },

				info: function(){}
			};

		$.extend(_options, options || {});

		if( element ) {
			element.html(TOOLBAR);
		} else {
			return;
		}		

		$('.map_tools_group .' + ZOOM_IN).click(function(){
			if(typeof _options.zoomin === 'function'){
				_options.zoomin();
			}			
		});	

		$('.map_tools_group .' + ZOOM_OUT).click(function(){
			if(typeof _options.zoomout === 'function'){
				_options.zoomout();
			}
		});	

		$('.map_tools_group .' + INFO).click(function(e){
			var btn = $(e.target).closest('.' + INFO);
			if(btn.hasClass('active')){
				btn.removeClass('active');
			}else{
				btn.addClass('active');
			}			
			if(typeof _options.info === 'function'){
				_options.info();
			}
		});							
	};
});