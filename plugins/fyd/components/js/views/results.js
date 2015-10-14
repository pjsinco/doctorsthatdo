var Backbone = require('backbone');

var SearchResultsView = Backbone.View.extend({

    events: {

    },

    initialize: function (options) {

        this.collection = options.collection;
        this.resultsMeta = options.resultsMeta;

        this.listenTo(this.collection, 'reset', this.render);
    },

    render: function () {

    }

});

module.exports = SearchResultsView;

