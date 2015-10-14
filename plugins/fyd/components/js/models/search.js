var Backbone = require('backbone');

var Search = Backbone.Model.extend({

    defaults: {
        orderBy: 'full_name',
        sort: 'asc',
    },

    initialize: function (options) {

    }

});

module.exports = Search;
    
