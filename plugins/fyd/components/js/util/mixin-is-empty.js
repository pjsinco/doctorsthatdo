var _ = require('underscore');

var IsEmptyMixin = {

    isEmpty: function() {
        return !_.some(this.attributes, function(value, key) {
            return value !== undefined;
        });
    }
    
};

module.exports = IsEmptyMixin;
