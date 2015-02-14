requirejs.config({

	baseUrl: '/js/',

	paths: {

		domReady: 'libs/domReady-2.0.1',

		jquery: 'libs/jquery/jquery-1.11.1.min',	

		autocomplete: 'libs/jquery.devbridge-autocomplete/jquery.devbridge-autocomplete.min',

		ol: 'libs/ol3/ol',

		bootstrap: 'libs/twitter-bootstrap/js/bootstrap',

		conf: 'configuration'

	},

	shim: {

		ol: {
			exports: 'ol'
		},		

		autocomplete: {
			deps:['jquery']
		},	

		bootstrap: {
			deps:['jquery']
		}
		
	},	

	waitSeconds: 200
});