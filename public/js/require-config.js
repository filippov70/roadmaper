requirejs.config({

	baseUrl: '/js/',

	paths: {

		domReady: 'libs/domReady-2.0.1',
		jquery: 'libs/jquery/jquery-1.11.1.min',	
		jstree: 'libs/jstree.min',
		jsrender: 'libs/jsrender.min',
		autocomplete: 'libs/jquery.devbridge-autocomplete/jquery.devbridge-autocomplete.min',
		ol: 'libs/ol3/ol-debug',
		bootstrap: 'libs/twitter-bootstrap/js/bootstrap',

		appConf: 'confs/app',
		layersTreeConf: 'confs/layersTree',
		mapConf: 'confs/map',
		helpers: 'app/helpers/',
		map: 'app/map/'

	},

	shim: {

		ol: {
			exports: 'ol'
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