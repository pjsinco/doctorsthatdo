var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var typeahead = require('../../vendor/typeahead.0.10.5');

var SearchQInputView = Backbone.View.extend({

    el: '#specialty',

    events: {
        'typeahead:selected': 'handleSuggestion',
        'typeahead:autocompleted': 'handleSuggestion',
        'input': 'handleInputEvent',
    },

    initialize: function (options) {
        if (options.formId) {
            this.$form = $(options.formId);
        }

        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'all', function(evtName) { 
            console.log('q event: ' + evtName );
        });

        this.initAutocomplete();
    },

    render: function () {
        this.renderHidden();
    },

    renderHidden: function() {
        this.$form.find('#code').remove();
        if (!this.model.isEmpty()) {
            this.$form.prepend(this.hiddenTemplate(this.model.toJSON()));
        }
    },

    renderSpecialtyInput: function () {
        this.$el.typeahead('val', this.model.get('full'));
    },

    handleInputEvent: function(evt) {
        if (!this.model.isEmpty()) {
            this.model.clear();
        }
    },

    hiddenTemplate: _.template(
        '<input id="code" name="code" type="hidden" value="<%= code %>">'
    ),

    handleSuggestion: function (evt, suggestion) {
        if (suggestion.hasOwnProperty('code')) {
            // We're handling a specialty
            this.model.set({
                code: suggestion.code,
                full: suggestion.name
            });
        } else if (suggestion.hasOwnProperty('id')) {
            // We're handling a physician, so navigate to detail view;
            // ex.: /find-your-do#physicians/9666"
            window.location = [ 
                window.location.origin,
                '/find-your-do#physicians/',
                suggestion.id
            ].join('');
        }
    },

    initAutocomplete: function () {
        this._initSpecialtyBloodhound();
        this.specialtyEngine.initialize();

        this._initPhysicianBloodhound();
        this.physicianEngine.initialize();

        this._initTypeahead();
    },

    specialtyEngine: undefined,
    physicianEngine: undefined,

    _initSpecialtyBloodhound: function() {
        this.specialtyEngine = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.nonword('name'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            limit: 25,
            prefetch: {
                url: 'http://lookup.findyourdo.org/api/v1/specialties',
                filter: function(obj) {
                    //console.log(obj['data']);
                    return _.map(obj['data'], function(specialty) {
                        return specialty;
                    });
                }
            }
        });
    },

    _initPhysicianBloodhound: function() {
        this.physicianEngine = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('full_name'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            //limit: 7,
            remote: {
                url: 'http://lookup.findyourdo.org/api/v1/physicians/names/search',
                replace: function(url, uriEncodedQuery) {
                    // Grab the location from the hidden form fields
                    var loc = {
                        city: $('#city').val(),
                        state: $('#state').val(),
                        zip: $('#zip').val(),
                        lat: $('#lat').val(),
                        lon: $('#lon').val()
                    };
                    var params = $.param(loc);
                    return url + '?name=' + uriEncodedQuery + '&' + params;
                },
                filter: function(physicians) {
                    return $.map(physicians.data, function(d) {
                        return {
                            full_name: [
                                d.first_name,
                                d.middle_name,
                                d.last_name + ', ',
                                d.designation
                            ].join(' '),
                            designation: d.designation,
                            city: d.city,
                            state: d.state,
                            id: d.id
                        };
                    });
                }
            }
        });

    },

    physicianSuggestionTemplate: _.template(
        '<div>' +
            '<a id="physicianLink" href="find-your-do#physicians/' +
                '<%= id %>"><%= full_name %><br />' +
                '<span class="typeahead-location"><%= city %>, <%= state %><span>' +
            '</a>' +
        '</div>'
    ),

    _initTypeahead: function () {
        var self = this;
        this.$el.typeahead({
            hint: true,
            highlight: true,
            minLength: 2,
            limit: 7,
        }, {
            name: 'physicians',
            //limit: 7,
            display: 'value',
            source: self.physicianEngine.ttAdapter(),
            templates: {
                //header: '<h5 class="typeahead-subhead">Physicians near ' +
                    //self.searchLocation.get('city') + ', ' +
                    //self.searchLocation.get('state') + '</h5>',
                header: '<h5 class="typeahead-subhead">Nearby physicians</h5>',
                suggestion: self.physicianSuggestionTemplate,
                suggestion: self.physicianSuggestionTemplate,
                engine: _
            },
        }, {
            name: 'specialties',
            source: self.specialtyEngine.ttAdapter(),
            display: 'name',
            templates: {
                header: '<h5 class="typeahead-subhead">Specialties</h5>',
                suggestion: function(suggestion) {
                    return '<div>' + suggestion.name + "</div>";
                }
            }
        });
        
    },
});

module.exports = SearchQInputView;
