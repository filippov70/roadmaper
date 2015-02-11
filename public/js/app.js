/* 
 * The MIT License
 *
 * Copyright 2014 filippov.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

function loadMap() {
    
    var view = new ol.View({
        center: ol.proj.transform([84.952, 56.464], 'EPSG:4326', 'EPSG:3857'),
        zoom: 17//17
    });
    
    var osm = new ol.layer.Tile({
        source: new ol.source.OSM()
    });
    var bing = new ol.layer.Tile({
        source: new ol.source.BingMaps({
            key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
            imagerySet: 'Aerial',
            visible: false
        })
    });
//    var expressKosmo = new ol.layer.Tile({
//        source: new ol.source.XYZ({
//            url: 'http://maps.kosmosnimki.ru/TileService.ashx?Request=gettile&LayerName=04C9E7CE82C34172910ACDBF8F1DF49A&apikey=XMC9Y9BDZH&crs=epsg:3857&z=${z}&x=${x}&y=${y}',
//            projection: 'EPSG:3857'
//        })
//    });
//    var tomskOrtho = ol.layer.Tile({
//        source:  new ol.source.GeocadTileSource({
//            url: "http://map.admin.tomsk.ru/tiles_ol/_ortofoto2014/",
//            extension: "png",
//            tileGrid: new ol.tilegrid.TileGrid({
//                origin: [9438000, 7629000],
//                resolutions: [19.1093, 9.55462, 4.77731, 4.77731/2,  1.194151111357258898,  0.597075568702008]
//            })
//        }),
//        name: 'tomsk',
//        title: "Ортофото Томск"//,base: false
//    });

    
//    var cadastreSrc = new ol.source.ImageWMS({
//        url: 'http://maps.rosreestr.ru/arcgis/services/Cadastre/CadastreWMS/MapServer/WmsServer',
//        //crossOrigin: 'anonymous',
//        attributions: [new ol.Attribution({
//            html: '&copy; ' +
//                '<a href="http://maps.rosreestr.ru/PortalOnline/' +
//                'en/home.html">' +
//                'ПКК Росреестр / maps.rosreestr.ru</a>'
//        })],
//        params: {
//            'LAYERS': '6,5,4,3,2,1', // 22,21,20,19,18,16,15,14,13,11,10,9,7,6,4,
//            'VERSION' : '1.3.0'
//        }//,
//        //serverType: 'mapserver'
//    });
    
    ////
      
    ////
//    var cadastreZUandBuilds = new ol.layer.Image({
//            source: cadastreSrc
//    });
    
    var tis = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            url: 'http://woodix.incom.tomsk.ru:8181/geoserver/wms',
            params: {
                'LAYERS': 'admin,agroWGS,all_roads', //cadastreZUandBuilds
                'transparent': 'true'
            }
        })
    });
    
    var buildSrc = new ol.source.ImageWMS({
        url: 'http://localhost:8080/geoserver/wms',
        params: {
            'LAYERS': 'tpu:builds',
            'transparent': 'true'
        }
    });
    
    var builds = new ol.layer.Image({
        source: buildSrc,
        opacity: 0.7
    });
    
    var map = new ol.Map({
        layers: [osm, builds],
        target: 'map',
        controls: ol.control.defaults().extend([
            new ol.control.ScaleLine({
                units: 'metric'
            })
        ]),
        view: view
      });
      
    map.on('singleclick', function (evt) {
        var viewResolution = /** @type {number} */ (view.getResolution());
        var url = buildSrc.getGetFeatureInfoUrl(
            evt.coordinate, viewResolution, 'EPSG:3857', {
                'INFO_FORMAT': 'application/json' //text/xml, application/geojson, text/html
        });
        if (url) {
            
            createInfoContetnt(url);
        }
    });
    
    function createInfoContetnt(url) {
        $.ajax({
            url: url
        }).done(function(data) {
            $('#infocontent').html('');
            if (data.features.length > 0) {
                $('#info').modal({
                        show: true,
                        remote: ''
                    });
                var additionalInfo = '';
//                if (data.features[0].properties.add_prop !== undefined) {
//
//                }
                $('#infocontent').html(
                        "<h2>" + data.features[0].properties.name + "</h2>" +
                        "</br><h3>" + data.features[0].properties.a_strt +
                        " " + data.features[0].properties.a_hsnmbr + "</h3>"
                        );
                }   
            }
        );
        
    }
}

