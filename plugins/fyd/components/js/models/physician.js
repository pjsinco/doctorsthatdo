var Backbone = require('backbone');

var Physician = Backbone.Model.extend({

    // when we fetch outside a collection
    urlRoot: 'http://lookup.findyourdo.org/api/v1/physicians',

    initialize: function () {

    },

    parse: function (response, options) {
        // if collection is newing up models and calling this method,
        // don't parse
        if (options.collection) {
            return response;
        }
        return response.data;
    },

});

module.exports = Physician;

