var Backbone = require('backbone');
var $ = require('jquery');
var typeahead = require('../../vendor/typeahead.0.10.5');
var tooltip = require('../../util/mixin-tooltip.js');
var Handlebars = require('handlebars');
var path = require('path');
var fs = require('fs');
var hiddensTemplate = fs.readFileSync(
    path.join(__dirname,  '..', 'templates', 'location-hiddens.handlebars'), 
    'utf8'
);
var inputDisplayTemplate = fs.readFileSync(
    path.join(__dirname,  '..', 'templates', 'location-input-display.handlebars'), 
    'utf8'
);

var SearchLocationInputView = Backbone.View.extend({

    el: '#location',
    engine: {},
    //resolved: false,


    events: {
        'typeahead:selected': 'setLocation',
        'typeahead:autocompleted': 'setLocation',
        'change': 'inputChanged',
        'typeahead:closed': 'closed'
        
    },

    initialize: function (options) {
        // Gets set to true during the resolving process
        this.resolving = false;

        if (options.formId) {
            this.$form = $(options.formId);
        }

        this.initAutocomplete();

        this.listenTo(this.model, 'change', this.render);

        this.model.fetch();

    },

    render: function () {
        if (!this.model.isEmpty()) {
            this.renderHiddens();
            this.renderTypeaheadInput();
        } else {
            this.clearHiddens();
        }
        return this;
    },

    clearHiddens: function() {
        this.$form.find('.hidden-location').remove();
    },

    hiddensTemplate: Handlebars.compile(hiddensTemplate),

    renderHiddens: function() {
        this.clearHiddens();
        var rendered = this.hiddensTemplate(this.model.toJSON());
        this.$form.prepend(rendered);
    },

    renderTypeaheadInput: function() {
        this.$el.typeahead('val', this.inputDisplayTemplate(this.model.toJSON()));
    },

    inputChanged: function(evt) {

        if (!this.model.isEmpty()) {
            this.clearLocation();
        }

        if (evt.target.value != '') {
            this.resolve(evt.target.value);
        }
    },

    /**
     * Determine if the "city, state zip(optional)" in the location input 
     * is the same as what's in our model.
     *
     */
    typeaheadValueMatchesModel: function() {
        var typeaheadParts = this.$el.typeahead('val').split(',');
        if (typeaheadParts.length > 1) {
            var city = typeaheadParts[0];
            var state = typeaheadParts[1];
        }
        // see if we have a zip code
        if (typeaheadParts.length == 3) {
            var typeaheadPartsEndChunk = typeaheadParts[-1].split(' ');
            if (this.isZipCode(typeaheadPartsEndChunk[-1])) {
                var zip = typeaheadPartsEndChunk[-1];
            }
        }
    },

    closed: function(evt) {

        // Make sure we're not already resolving
        if (this.resolving || !this.model.isEmpty()) {
            return
        } else if (this.model.isEmpty() && !_.isEmpty(this.$el.typeahead('val'))) {
            this.resolve(evt.target.value);
        }

        return;
    },

    resolve: function(valueToTry) {

        this.resolving = true;

        var self = this;

        this.engine.get(valueToTry, function(suggestions) {

            var uniqueLocations = _.uniq(suggestions, false, function(item) {
                return [item.city, item.state].join();
            });

            var citiesInUniqueLocations = _.uniq(
                _.map(uniqueLocations, function(location) {
                    return location.city
                })
            );
            if (uniqueLocations.length === citiesInUniqueLocations.length ) {
                self.setLocation(null, uniqueLocations[0]);
                self.model.trigger('resolved');
            } else {
                self.model.trigger('unresolved');
            }
            self.resolving = false;

        });

    },

    inputDisplayTemplate: Handlebars.compile(inputDisplayTemplate),

    hiddensTemplate: Handlebars.compile(hiddensTemplate),

    setLocation: function(evt, suggestion) {

        // User didn't include the zip, so we're tossing out
        // that level of precision
        if (!suggestion.hasOwnProperty('zip')) {
            _.defaults(suggestion, { zip: undefined })
        }
        this.model.save(_.omit(suggestion, 'value'), { validate: false });
    },
    
    clearLocation: function() {
        this.model.clearLocation();
    },

    initAutocomplete: function() {
        this._initBloodhound();
        this.engine.initialize();
        this._initTypeahead();
    },

    _initBloodhound: function() {
        var locationInput = this.$el;
    
        this.engine = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            limit: 15,
            remote: {
                url: 'http://lookup.findyourdo.org/api/v1/locations/search',
                replace: function(url, urlEncodedQuery) {
                    return url + '?q=' + urlEncodedQuery;
                },
                filter: function(locations) {
                    var userTyped = locationInput.typeahead('val');

                    if (locations.error) {
                        return;
                    }

                    return $.map(locations, function(location) {
                        // user typed a city
                        //console.log('isNAN: ' + isNaN());
                        if (typeof userTyped !== "number" && isNaN(userTyped)) {
                            console.log('city!');
                            
                            // Keep the city, state list unique
                            var uniqueLocations = _.uniq(location, false, function(item) {
                                return [item.city, item.state].join();
                            });
    
                            //console.log('unqloc undefined: ' + (uniqueLocations == undefined));
                            //console.log(uniqueLocations);
                            //console.log(uniqueLocations.length);
                            console.log(location.http_code);
                            return $.map(uniqueLocations, function(e) {
                                return {
                                    city: e.city,
                                    state: e.state,
                                    lat: e.lat,
                                    lon: e.lon,
                                    value: e.city + ', ' + e.state
                                };
                            });
                        } else {
                            console.log('zip!');
                            // user typed a zip, so let's include zips
                            return $.map(location, function(e) {
                                return {
                                    city: e.city,
                                    state: e.state,
                                    zip: e.zip,
                                    lat: e.lat,
                                    lon: e.lon,
                                    value: e.city + ', ' + e.state + ' ' + e.zip
                                };
                            });
                        }
                    });
                }
            }
        }); 
    },
    
    _initTypeahead: function() {
        var locationInput = this.$el;

        this.$el.typeahead({
            hint: true,
            highlight: true,
            minLength: 3,
        }, {
            name: 'engine',
            display: 'value',
            source: this.engine.ttAdapter(),
            templates: {
                suggestion: function(data) {
                    var userTyped = locationInput.typeahead('val');
                    if (isNaN(userTyped)) {
                        return '<div>' + data.city + ', ' + data.state + '</div>';
                    } else {
                        return '<div>' + data.city + ', ' + data.state + ' ' +
                    data.zip + '</div>';
                    }
                },
            }
        });
    }

});

module.exports = SearchLocationInputView;
_.extend(SearchLocationInputView.prototype, tooltip);

