var Backbone = require('backbone');
var _ = require('underscore');

var ResultsMeta = Backbone.Model.extend({

    initialize: function(attributes, options) {

        this.setWho(attributes.pagination.total);

        if (options.selected) {
            this.set('selected', options.selected);
        }

        if (options.minDistance) {
            this.set('minDistance', options.minDistance);
        }


    },


    /**
     * Determines whether "DO[s]" should be plural or singular.
     *
     */
    setWho: function(count) {
        var who = 'DO';
        if (count === 0 || count > 1) {
            who += 's';
        } 
        this.set('who', who);
    },

    getNextRadius: function(radius) {
        var radii = [25, 50, 100, 250];

        return _.find(radii, function(value) {
            return value > radius
        }) || radii[0];
        
    },


});

module.exports = ResultsMeta;

