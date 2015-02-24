define([
	'jquery',
	'proj4',
	'ol',
	'mapConf'
], function($, proj4, ol, mapConf) {

	return function(options) {

		var _options = {
			map: null
		};

		$.extend(_options, options || {});

		if (_options.map && _options.map instanceof ol.Map) {
			_options.mapProjection = _options.map.getView().getProjection().getCode();
		} else {
			return;
		}

		//Чтобы OL3 видел defs proj4
		/*window.proj4 = proj4;
		proj4.defs([
			['EPSG:28414', '+proj=tmerc +lat_0=0 +lon_0=81 +k=1 +x_0=14500000 +y_0=0 +ellps=krass +towgs84=23.92,-141.27,-80.9,-0,0.35,0.82,-0.12 +units=m +no_defs'],
			['EPSG:32644', '+proj=utm +zone=44 +datum=WGS84 +units=m +no_defs']
		]);	*/

		return {

			map: _options.map,
			vectorLayer: _options.vectorLayer,
			mapProjection: _options.mapProjection,

			highlight: function(features) {

				features = features || [];
				var that = this;

				that.createLayer();

				$.each(features, function(i, featureInfo){					
					var feature = featureInfo.features[0] || {},
						properties = feature.properties || {},
						geometry = feature.geometry || {},
						projection = properties.projection || '',
						coordinates = geometry.coordinates || [];						

					if (coordinates.length) {								
						that.byGeom(coordinates, geometry.type, projection);
					}					
				});
			},

			byGeom: function(geom, type, projection) {

				var that = this,
					geometry = null,
					feature,
					olSource;

				olSource = that.vectorLayer.getSource();

				switch (type) {
					case 'MultiPolygon':
						geometry = new ol.geom.MultiPolygon(geom);
						break;
					case 'Point':
						geometry = new ol.geom.Point(geom);
						break;
					case 'MultiLineString':
						geometry = new ol.geom.MultiLineString(geom);
						break;
					case 'MultiPoint':
						geometry = new ol.geom.MultiPoint(geom);
						break;
					case 'LineString':
						geometry = new ol.geom.LineString(geom);
						break;
					case 'Polygon':
						geometry = new ol.geom.Polygon(geom);
						break;
					case 'Circle':
						geometry = new ol.geom.Circle(geom);
						break;
					case 'LinearRing':
						geometry = new ol.geom.LinearRing(geom);
						break;
				}

				if (geometry) {

					feature = new ol.Feature({
						geometry: geometry
					});

					projection = projection || 'EPSG:4326';
					feature.getGeometry().transform(projection, that.mapProjection);
					olSource.addFeatures([feature]);

				} else {
					throw new Error('Undefined type of geometry');
				}

			},

			createLayer: function() {

				var that = this,
					stroke = new ol.style.Stroke({
						color: mapConf.theme.strokeColor,
						width: 3
					}),
					fill = new ol.style.Fill({
						color: mapConf.theme.fillColor
					});

				if (that.vectorLayer) {
					that.map.removeLayer(that.vectorLayer);
				}

				that.vectorLayer = new ol.layer.Vector({
					source: new ol.source.Vector(),
					style: new ol.style.Style({
						image: new ol.style.Circle({
							fill: fill,
							stroke: stroke,
							radius: 5
						}),
						stroke: stroke,
						fill: fill
					})
				});

				that.map.addLayer(that.vectorLayer);
			},

			clear: function() {
				if(this.vectorLayer){
					this.vectorLayer.getSource().clear();
				}				
			}
		};
	};
});