var Backbone = require('backbone');

Backbone.Layout = require('backbone.layoutmanager');

var PhysicianDetailView = Backbone.Layout.extend({

    initialize: function() {
    },

    template: '#fydDetail',

    beforeRender: function() {
        window.scrollTo(0, 0);
        this.$el.hide()
    },

    afterRender: function() {
        this.$el.fadeIn(500)
    },

    serialize: function() {
        return this.model.toJSON();
    },

});

module.exports = PhysicianDetailView;
