var Backbone = require('backbone');
var $ = require('jquery');
Backbone.Layout = require('backbone.layoutmanager');
var Physicians = require('../collections/physicians-paginated.js');

var ResultsMetaView = Backbone.Layout.extend({

    className: 'fyd-results__report',

    initialize: function(options) {
        if (options.collection) {
            this.collection = options.collection;
        }
    
        if (options.router) {
            this.router = options.router;
        }
    },

    template: '#fydResultsMeta',

    events: {
        'change select': 'sort',
        'click .radius-button': 'radiusButton',
        //'click #specialtyTag', 'clickSpecialty',
    },

    radiusButton: function(evt) {
        var params = this._getQueryParameters();
        var radiusClicked = evt.target.dataset.radius;

        // Generate fragment for radius tag URL
        // 1. _.omit: Delete distance parameter
        // 2. _.extend: Add it back in with new value
        var queryStringRadius = 
            $.param(
                _.extend(_.omit(params, 'distance'), { distance: radiusClicked })
            );
        this.router.navigate('search?' + queryStringRadius, { trigger: true });
    },


    sort: function(evt) {
        this.model.set('selected', evt.target.value);
        this.collection.setSorting(this.model.get('selected'));
            
        this.collection.getFirstPage({ 
            reset: true,
        });
    },

    clickSpecialty: function(evt) {
        //this.router.navigate
    },

    beforeRender: function() {
        var params = this._getQueryParameters();

        // Generate fragment for specialty tag URL
        var queryStringSpecialty = $.param(_.omit(params, ['q', 'code']));
        this.model.set(
            'specialty_url',
            window.location.origin + window.location.pathname + 
                '#search?' + queryStringSpecialty
        );

    },

    setModel: function(model) {
        this.model = model;
    },

    serialize: function () {
        return this.model.toJSON();
    },

    /**
     * https://css-tricks.com/snippets/jquery/get-query-params-object/
     * 
     */
    _getQueryParameters: function() {
        var paramString = '?' + window.location.href.split('?')[1];

        return (paramString)
            .replace(/(^\?)/,'')
            .split("&")
            .map(function(n) {
                return n = n.split("="),this[n[0]] = decodeURIComponent(n[1]), this
            }
            .bind({}))[0];
    }
});

module.exports = ResultsMetaView;

