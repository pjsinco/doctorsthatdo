var Backbone = require('backbone');
var _ = require('underscore');
var LocalStorage = require('../vendor/backbone.localStorage.js');

var SearchLocation = Backbone.Model.extend({

    localStorage: new LocalStorage('search-location'),

    defaults: {
        city: undefined,
        state: undefined, 
        zip: undefined,
        lat: undefined,
        lon: undefined
    },

    initialize: function () {

    },

    clearLocation: function () {
        this.clear({ silent: true });
        this.set({ id: 1 });
        this.save({}, { validate: false });
    },

    /**
     * Yes, it's empty if it has an id only.
     *
     */
    isEmpty: function() {
        return !_.some(this.attributes, function(value, key) {
            return value !== undefined && key !== 'id';
        });
    },

//    validate: function(attrs, options) {
//        if (this.isEmpty()) {
//            return "Model is empty";
//        }
//    },
    

});

module.exports = SearchLocation;

