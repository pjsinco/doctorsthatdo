var Backbone = require('backbone');
var _ = require('underscore');
var Physician = require('../models/physician.js');
var Physicians = require('../collections/physicians-paginated.js');
var PhysicianListView = require('../views/physician-list.js');
var Results = require('../models/results.js');
var ResultsView = require('../views/results.js');
var ResultsMeta = require('../models/results-meta.js');
var ResultsMetaView = require('../views/results-meta.js');
Backbone.Layout = require('backbone.layoutmanager');
var PhysicianDetailView = require('../views/physician-detail.js');
var PaginationView = require('../views/pagination.js');
var Nanobar = require('nanobar');

var AppRouter = Backbone.Router.extend({

    routes: {
        'search?*queryString': 'searchResults',
        'physicians/:id': 'physicianDetail',
    },

    recordUrl: function() {
        this.lastVisited = Backbone.history.fragment;
    },

    initialize: function() {
        this.nanobar = new Nanobar({
            bg: '#01eaff',
            target: document.getElementById('fydNanobar'),
        });

        this.listenTo(this, 'route:searchResults', this.recordUrl);

        this.resultsLayout = new Backbone.Layout({
            template: '#fydResults',
            beforeRender: function() {
                // needed?
                window.scrollTo(0, 0);
            }
        });

        var self = this;

        this.physicians = new Physicians([], {
            queryParams: _.defaults(
                self._getQueryParameters(),
                Physicians.prototype.queryParams
            ),
        });

        //this.setUpCollectionListener();
this.listenTo(this.physicians, 'all', function(evtName) { console.log(evtName); });

        
    },

    addPageNumbersToUrl: function(pageNumber) {
        if (pageNumber) {
            var re = /&p=\d/;
            if (window.location.hash.match(re)) {
                var newHash = window.location.hash.replace(re, '&p=' + pageNumber);
                this.navigate(newHash);
            } else {
                this.navigate(
                    [ window.location.hash, '&p=', pageNumber ].join('')
                );
            }
        }
    },

    fetchNewCollection: function() {
        var self = this;
        this.physicians = new Physicians([], {
            queryParams: _.defaults(
                self._getQueryParameters(),
                Physicians.prototype.queryParams
            ),
        });

        this.setUpCollectionListener();

        this.physicians.getFirstPage({ 
            reset: true,
        });
    },

    setUpCollectionListener: function() {
        this.listenTo(this.physicians, 'request', function() { this.nanobar.go(30); });
        this.listenTo(this.physicians, 'reset', function() { this.nanobar.go(60); });
        this.listenTo(this.physicians, 'sync', function() { this.nanobar.go(100); });

        this.listenTo(this.physicians, 'reset', function(collection, options) {
            //self.addPageNumbersToUrl(collection.state.currentPage);

            
            var resultsMeta = new ResultsMeta( options.xhr.responseJSON.meta, { 
                selected: collection.state.sortKey,
                minDistance: _.min(collection.pluck('distance'), function(distance) {
                    return parseInt(distance);
                }),
            });

            this.resultsLayout.setView(
                '#resultsMeta', 
                new ResultsMetaView({ 
                    model: resultsMeta, 
                    collection: collection,
                    router: this,
                }),
                false
            );

            this.resultsLayout.setView(
                '#resultsBody',
                new PhysicianListView({ collection: collection, }),
                false
            );

            this.resultsLayout.setView(
                '#resultsBody',
                new PaginationView({ 
                    collection: collection ,
                    serialize: { 
                        hasPrevious: collection.hasPreviousPage(), 
                        hasNext: collection.hasNextPage(), 
                    },
                    layout: self.layout
                }),
                true
            );

            this.resultsLayout.$el.appendTo('.entry').hide().fadeIn(500);
            this.resultsLayout.render();
        });

    },

    searchResults: function(queryString, refreshSearch) {
    
        // lastVisited may be undefined if we're not coming to this page 
        // from another /find-your-do#search page.
        // There's probably a better solution than this check for undefined. 
        // Like, can we recordUrl() in initialize?
        if ( this.lastVisited === undefined || 
             (this.lastVisited && (Backbone.history.fragment != this.lastVisited))) {
            this.fetchNewCollection();
        } else {
            this.physicians.getPage(this.physicians.state.currentPage, { 
                reset: true,
            });
        }

    },

    physicianDetail: function(id) {
        this.resultsLayout.removeView('#resultsBody');

        var self = this;

        this.listenToOnce(this.physicians, 'grabbedPhysician', function(options) {
            var detail = new PhysicianDetailView({ model: options.model });
            self.resultsLayout.insertView('#resultsBody', detail);
            self.resultsLayout.$el.appendTo('.entry');
            self.resultsLayout.render();
        })

        var physician = this.physicians.getOrFetch(id);
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
module.exports = AppRouter;
