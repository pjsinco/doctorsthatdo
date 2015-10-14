var Backbone = require('backbone');
Backbone.Layout = require('backbone.layoutmanager');
var Physicians = require('../collections/physicians-paginated.js');
var ResultsMeta = require('../models/results-meta.js');
var PhysicianListView = require('../views/physician-list.js');


var PaginationView = Backbone.Layout.extend({

    tagName: 'nav',

    template: '#fydPagination',

    events: {
        'click #next': 'nextPage',
        'click #previous': 'previousPage',
    },

    previousPage: function (evt) {
        evt.preventDefault();

        this.collection.getPreviousPage({ 
            reset: true,
        });
    },

    nextPage: function (evt) {
        evt.preventDefault();

        this.collection.getNextPage({ 
            reset: true,
        });
    },

    serialize: function() {
    },

});

module.exports = PaginationView;
