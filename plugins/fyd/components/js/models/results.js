var Backbone = require('backbone');
var ResultsMeta = require('./results-meta.js');
var ResultsView = require('../views/results.js');

var Results = Backbone.Model.extend({

    initialize: function (options) {
        this.physicianList = options.physicianList;

        this.resultsMeta = new ResultsMeta({ el: '#resultsMeta' });

        this.resultsView = new ResultsView({
            collection: this.physicianList,
            resultsMeta: this.resultsMeta,
        });

        this.listenTo(this.physicianList, 'reset', this.refresh);
    },

    refresh: function(collection, response) {
        this.resultsMeta.set(_.omit(response.xhr.responseJSON.meta, 'location'));
    },

    

});

module.exports = Results;
