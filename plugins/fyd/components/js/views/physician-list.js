var Backbone = require('backbone');
Backbone.Layout = require('backbone.layoutmanager');
var PhysicianListItemView = require('./physician-list-item');

var PhysicianListView = Backbone.Layout.extend({

    tagName: 'ul',
    className: 'fyd-results__list',

    beforeRender: function() {
        this.collection.each(function(model) {
            this.insertView(new PhysicianListItemView({
                model: model,
            }));
        }, this);
    },

});

module.exports = PhysicianListView;

