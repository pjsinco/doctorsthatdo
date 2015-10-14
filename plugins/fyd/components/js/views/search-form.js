var Backbone = require('backbone');
var $ = require('jquery');
var SearchLocation = require('../models/search-location.js');
var SearchLocationInputView = require('./form-inputs/search-location-input.js');
var SearchQ = require('../models/search-q.js');
var SearchQInputView = require('./form-inputs/search-q-input.js');

var SearchFormView = Backbone.View.extend({

    events: {
        submit: 'formSubmit' ,
    },

    initialize: function (options) {
        if (options.el) {
            this.el = options.el;
        }
        
        //this.router = options.router || undefined;
    
        // The location input model
        this.searchLocation = new SearchLocation({ id: 1 });

        // The specialty/physician input model
        this.searchQ = new SearchQ();

        //this.listenTo(this.searchLocation, 'all', function(evtName) { console.log(evtName) ;});

        this.searchLocationInputView = new SearchLocationInputView({
            model: this.searchLocation,
            formId: this.el
        });

        this.searchQInputView = new SearchQInputView({
            model: this.searchQ,
            formId: this.el
        });
    },

    render: function () {

    },

    isValid: function () {
        return !this.searchLocation.isEmpty();        
    },

    indicateValid: function () {
        $('.location').addClass('fyd-tooltip')
            .attr('data-tooltip', 'Valid');
        setTimeout(function() {
            $('.location').removeClass('fyd-tooltip')
                .removeAttr('data-tooltip');
        }, 2000);
    },

    indicateInvalid: function () {
        //$('#location').val(''); // TODO good idea to clear?
        $('.location')
            .addClass('fyd-tooltip')
            .attr('data-tooltip', 'Please enter a 5-digit zip');
        setTimeout(function() {
            $('.location').removeClass('fyd-tooltip')
                .removeAttr('data-tooltip');
        }, 2000);
    },

    formSubmit: function (evt) {
        evt.preventDefault();    
        var self = this;

        if (this.isValid()) {
            var queryString = this.$el.find(':not(#location)').serialize()
            var href = window.location.origin;

            window.location = [
                href,
                '/find-your-do#search?',
                queryString
            ].join('')

        } else {
            this.indicateInvalid(); 
            //var valToTry = $('#findYourDo').find('input[name=location]').val()
            //this.searchLocationInputView.resolve(valToTry);
            //this.listenTo(this.searchLocation, 'resolved', this.indicateValid()); 
        }
    },
});

module.exports = SearchFormView;
