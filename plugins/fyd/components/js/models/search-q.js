var Backbone = require('backbone');
var _ = require('underscore');
var IsEmptyMixin = require('../util/mixin-is-empty.js');

var SearchQ = Backbone.Model.extend({

    initialize: function () {

    }

});

_.extend(SearchQ.prototype, IsEmptyMixin);
module.exports = SearchQ;

