var Backbone = require('backbone');
Backbone.Layout = require('backbone.layoutmanager');


var PhysicianListItemView = Backbone.Layout.extend({

    template: '#fydPhysicianListItem',
    tagName: 'li',
    className: 'fyd-results__list-item',
    serialize: function() {
        return this.model.toJSON();
    },

    events: {
        
    },

    initialize: function () {
        
    },

});

module.exports = PhysicianListItemView;

