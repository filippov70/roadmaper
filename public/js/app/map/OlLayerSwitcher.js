define([
	'jquery',
	'ol',
	'map/OlLayerFactory'
], function($, ol, OlLayerFactory) {

	'use strict';

	return function(options) {

		var _options = {
				map: null
			},
			_olLayerFactory;

		$.extend(_options, options || {});

		if(_options.map) {

			_olLayerFactory = new OlLayerFactory({
				map: _options.map
			});

		} else {
			return {};
		}

		return {

			checkedItems: [],

			toggleLayer:function(data){
				var that = this,
					layerInfo = data.node.original.layerInfo;
				if(that.isActive(data)){
					that.showLayer(layerInfo);
				}else{
					that.hideLayer(layerInfo);
				}
			},
			toggleLayers:function(data){
				var that = this;
				if(that.isActive(data)){
					that.showLayers(data);
				}else{
					that.hideLayers(data);
				}
			},	
			showLayer:function(layerInfo){
				var that = this;
				if(!layerInfo){
					return;
				}
				if(layerInfo.layer){
					layerInfo.layer.setVisible(true);
				}else{
					layerInfo.layer = _olLayerFactory.createLayer(layerInfo);
				}
			},	
			hideLayer:function(layerInfo){
				var that = this;
				if(!layerInfo){
					return;
				}
				if(layerInfo.layer){
					layerInfo.layer.setVisible(false);
				}else{
					layerInfo.layer = _olLayerFactory.createLayer(layerInfo);
					layerInfo.layer.setVisible(false);
				}
			},	
			showLayers:function(data){
				var that = this,
					checkedItems = data.instance.get_checked([true]);			
				$.each(checkedItems, function(i, item){
					that.showLayer(item.original.layerInfo);
				});	
				that.checkedItems = checkedItems;
			},
			hideLayers:function(data){
				var that = this,
					unCheckedItems = that.checkedItems;			
				$.each(unCheckedItems, function(i, item){
					that.hideLayer(item.original.layerInfo);
				});	
				that.checkedItems = unCheckedItems;
			},			
			switchLayer: function(data) {
				var that = this,
					children = data.node.children;
				if(children.length){
					that.toggleLayers(data);
				}else{
					that.toggleLayer(data);
				}
			},
			isActive:function(data){
				if(data.action === "select_node"){
					return true;
				}
				return false;
			}			
		}
	};
});