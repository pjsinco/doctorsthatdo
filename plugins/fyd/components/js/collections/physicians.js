var Backbone = require('backbone');
var Physician = require('../models/physician.js');

var PhysicianList = Backbone.Collection.extend({

    model: Physician,

    url: 'http://lookup.findyourdo.org/api/v1/physicians/search',

    parse: function(response) {
        return response.data;
    },

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

module.exports = PhysicianList;

