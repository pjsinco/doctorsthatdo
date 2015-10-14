var Backbone = require('backbone');
var Physician = require('../models/physician.js');
var PageableCollection = require('backbone.paginator')

var Physicians = PageableCollection.extend({

    model: Physician,

    url: 'http://lookup.findyourdo.org/api/v1/physicians/search',

    initialize: function() {
        this.listenTo(this, 'all', function(evtName) { console.log(evtName); });
    },

    parseState: function(response, queryParams, state, options) {
        return {
            totalRecords: response.meta.pagination.total
        }
    },

    parseRecords: function(response) {
        return response.data;
    },

    state: {
        firstPage: 1,
        pageSize: 25,
        sortKey: 'distance',
    },

    queryParams: {
        sortKey: 'order_by',
        order: 'sort',
        totalPages: null,
        perPage: null,
    },

    /**
     * Retrive a Physician model from a collection. If the collection
     * doesn't exist, fetch the model from the server
     */
    getOrFetch: function(id) {
        var physician;

        var self = this;

        if (this.get(id)) {
            physician = this.get(id);
            this.trigger('grabbedPhysician', { model: physician });
            return physician;
        } else {
            physician = new Physician({ id: id });
            physician.fetch({
                success: function(model) {
                    self.trigger('grabbedPhysician', { model: model });
                }
            });
        }
    },

});

module.exports = Physicians;

