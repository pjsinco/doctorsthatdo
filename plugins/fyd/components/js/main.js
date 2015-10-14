var Backbone = require('backbone');
Backbone.$ = require('jquery');
var _ = require('underscore');
var AppRouter = require('./routers/router.js');
var Physicians = require('./collections/physicians-paginated.js');
var SearchLocation = require('./models/search-location.js');
var SearchFormView = require('./views/search-form.js');
var Search = require('./models/search.js');

jQuery(document).ready(function($) {

    var whereWeAre = window.location.pathname;
    console.log('whereWeAre: ' + whereWeAre);

    if (whereWeAre.indexOf('find-your-do') > 0) {

        // We're on the results page
        var searchFormView = new SearchFormView({ 
            model: new Search(),
            el: '#findYourDo'
        });

        var app = new AppRouter()

        Backbone.history.start({
            root: '/find-your-do',
        });

    } else {

        // We're on a nonresults page
        var searchFormView = new SearchFormView({ 
            model: new Search(),
            el: '#findYourDo'
        });

    }

});
