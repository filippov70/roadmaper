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

			checkedBaseLayer: null,

			toggleLayer:function(data){
				var that = this;					

				if(that.isActive(data)){
					that.showLayer(data.node);
				}else{
					that.hideLayer(data.node);
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
			showLayer:function(node){
				var that = this,
					layerInfo = node.original.layerInfo;
				if(!layerInfo){
					return;
				}
				if(layerInfo.layer){
					layerInfo.layer.setVisible(true);
				}else{
					layerInfo.layer = _olLayerFactory.createLayer(layerInfo);
					layerInfo.layer.setVisible(true);
				}
				that.checkedItems.push(node);
			},	
			hideLayer:function(node){
				var that = this,
					layerInfo = node.original.layerInfo;
				if(!layerInfo){
					return;
				}
				if(layerInfo.layer){
					layerInfo.layer.setVisible(false);
				}else{
					layerInfo.layer = _olLayerFactory.createLayer(layerInfo);
					layerInfo.layer.setVisible(false);
				}
				that.deleteFromCheckedItems(node);
			},	
			showLayers:function(data){
				var that = this,
					checkedItems = data.instance.get_checked([true]),
					parentId = data.node.id;			
				$.each(checkedItems, function(i, item){
					if($.inArray(parentId, item.parents) !== -1){
						that.showLayer(item);
					}					
				});					
			},
			hideLayers:function(data){
				var that = this,
					unCheckedItems = that.checkedItems,
					parentId = data.node.id;																
				$.each(unCheckedItems, function(i, item){								
					if($.inArray(parentId, item.parents) !== -1){
						that.hideLayer(item);
					}					
				});	
			},	
			deleteFromCheckedItems:function(node){
				node = node || {};
				var that = this,
					res = $.grep(that.checkedItems, function(item){
						return item.id !== node.id;
					});
				that.checkedItems = res;
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
			switchBaseLayer: function(data) {
				var that = this,
					node = data.node,
					layerInfo = node.original.layerInfo;									
				if(!layerInfo){
					return;
				}
				if(that.checkedBaseLayer && that.checkedBaseLayer.id !== node.id){
					that.checkedBaseLayer.original.layerInfo.layer.setVisible(false);
				}
				if(layerInfo.layer){
					layerInfo.layer.setVisible(true);
					that.checkedBaseLayer = node;
				}else{
					layerInfo.layer = _olLayerFactory.createLayer(layerInfo);
					layerInfo.layer.setVisible(true);
					that.checkedBaseLayer = node;
				}				
			},			
			isActive:function(data){
				if(data.action === "select_node"){
					return true;
				}
				return false;
			},
			initLayer:function(layerInfo){
				layerInfo.layer = _olLayerFactory.createLayer(layerInfo);
				layerInfo.layer.setVisible(false);
			}			
		};
	};
});