var TicTacToe = TicTacToe || {};

TicTacToe.Board = Backbone.View.extend({
    game: null,
    map: null,
    match: null,

	el: '.box',

    initialize: function(options) {
        this.game = options.game;

        this.configureMap();
    },

    configureMap: function() {
        this.map = [];
        this.match = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
            [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
        ];

        _.each(this.$('li'), function(element, index) {
            var position = {
                el: element,
                position: index,
                game: this.game,
                matching: this.matchingCombinations(index)
            };

            this.map.push(new TicTacToe.Position(position));
        }, this);
    },

    getPosition: function(index) {
        return this.map[index];
    },

    restart: function() {
        _.each(this.map, function(position) {
            position.clear();
        });
    },

    nextAvailablePosition: function() {
        return _.find(this.map, function(position) {
            return position.isAvailable();
        });
    },

    matchingCombinations: function(positionIndex) {
        return _.filter(this.match, function(combination) {
            return _.contains(combination, positionIndex);
        }, this);
    }
});
