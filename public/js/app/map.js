require([
	'jquery',
	'domReady',
	'ol',
	'mapConf',
	'helpers/Layout',
	'map/LayersTree',
	'map/BaseLayersTree',
	'map/OlLayerSwitcher',
	'map/OlGetFeatureInfo',
	'map/OlGetFeatureMapper',
	'map/OlPopup',
	'map/OlLegend',
	'map/OlToolbar',
	'map/OlFeatureHighlight',
	'bootstrap'
], function($, domReady, ol, mapConf, Layout, LayersTree, BaseLayersTree, OlLayerSwitcher, OlGetFeatureInfo, OlGetFeatureMapper, OlPopup, OlLegend, OlToolbar, OlFeatureHighlight) {

	domReady(function() {

		$('#map-tabs a:first').tab('show');

		var layersTree = new LayersTree($('#layers_tree')),	

			baselayersTree = new BaseLayersTree($('#baselayers_tree')),		

			featureImageModalDom = $('#feature_image_modal'),

			featureImageModalBodyDom = featureImageModalDom.find('.modal-body'),

			map = new ol.Map({
				layers: [],
				target: 'map',
				controls: [
					new ol.control.ScaleLine({
						units: 'metric'
					})
				],
				view: new ol.View({
					center: ol.proj.transform([mapConf.centerLon, mapConf.centerLat], mapConf.centerProj, mapConf.mapProj),
					zoom: mapConf.zoom
				})
			}),

			layout = new Layout(map),

			olLayerSwitcher = new OlLayerSwitcher({
				map: map
			}),

			olPopup = new OlPopup({
				map: map
			}),		

			olLegend = new OlLegend({
				map: map
			}),		

			olFeatureHighlight = new OlFeatureHighlight({
				map: map
			}),										

			olGetFeatureMapper = new OlGetFeatureMapper(),	

			olGetFeatureInfo = new OlGetFeatureInfo({
				map: map,
				onGetfeatureinfo: function (features, coordinate) {	
					var infos = [];
					$.each(features, function(i, featureInfo){
						var info = olGetFeatureMapper.map(featureInfo);
						infos.push(info);					
					});
					olPopup.show(coordinate, {infos:infos});
					olFeatureHighlight.highlight(features);

					//Модальное окно с картинкой из popup
					$('.feature_image').click(function(e){
						var img = document.createElement("img");
						featureImageModalDom.modal();
						img.src = $(e.target).attr('data-whatever');
						featureImageModalBodyDom.html(img);	
					});
				}
			}),

			olToolbar = new OlToolbar($('#map-toolbar'), {
				map: map,
				info:function(){
					if (olGetFeatureInfo.isActivate) {
						olGetFeatureInfo.deactivate();
						olFeatureHighlight.clear();
						olPopup.clear();
					} else {
						olGetFeatureInfo.activate();
					}					
				}
			});

		layersTree.onLoadNode = function(e, data) {

			data = data || {};				
			data.node = data.node || {};
			data.node.children_d = data.node.children_d || [];

			$.each(data.node.children_d,function(i, nodeId){
				var node = data.instance.get_node(nodeId),
					layerInfo;
				if( node ){
					node.original = node.original || {};
					layerInfo = node.original.layerInfo;
					if(layerInfo){
						olLayerSwitcher.initLayer(layerInfo);
					}					
				}				
			});
		};					

		layersTree.onChange = function(e, data) {			
			olLayerSwitcher.switchLayer(data);
			olFeatureHighlight.clear();
			olPopup.clear();
		};

		baselayersTree.onChange = function(e, data) {	
			olLayerSwitcher.switchBaseLayer(data);
		};

		$('a[href="#legend"]').on('shown.bs.tab', function (e) {
			olLegend.create($('#legend'));
		});				
	})
});