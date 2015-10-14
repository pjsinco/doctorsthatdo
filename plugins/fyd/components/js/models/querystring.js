var Backbone = require('backbone');

var QueryString = Backbone.Model.extend({

    defaults: {
        'order_by': 'distance',
        'sort': 'asc',
    },


    initialize: function (options) {
        // These should not appear in the query string
        this.blacklisted = ['perPage', 'sortKey', 'totalPages', 'totalRecords'];
        this.listenTo(this, 'all', function(eventName) { console.log('Query String: ' + eventName); });
    },

    _toString: function() {

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

module.exports = QueryString;

