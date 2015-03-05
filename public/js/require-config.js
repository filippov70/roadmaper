requirejs.config({

	baseUrl: '/js/',

	paths: {

		domReady: 'libs/domReady-2.0.1',
		jquery: 'libs/jquery/jquery-1.11.1.min',	
		jstree: 'libs/jstree.min',
		jsrender: 'libs/jsrender.min',
		bootstrap: 'libs/bootstrap.min',
		proj4: 'libs/proj4',
		autocomplete: 'libs/jquery.devbridge-autocomplete/jquery.devbridge-autocomplete.min',
		ol: 'libs/ol3/ol-debug',
		bootstrap: 'libs/twitter-bootstrap/js/bootstrap',

		appConf: 'confs/app',
		baseLayersTreeConf: 'confs/layersTree/baseLayersTree',
		mapConf: 'confs/map',
		helpers: 'app/helpers/',
		map: 'app/map/'

	},

	shim: {

		ol: {
			exports: 'ol'
		},	

		bootstrap: {
			deps:['jquery']
		},
		
		jsrender: {
			deps:['jquery']
		},	

		autocomplete: {
			deps:['jquery']
		},	

		jstree: {
			deps:['jquery']
		},	
		
		bootstrap: {
			deps:['jquery']
		}
		
	},	

	waitSeconds: 200
});