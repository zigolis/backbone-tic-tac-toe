var TicTacToe = TicTacToe || {};

TicTacToe.Position = Backbone.View.extend({
    game: null,
    position: null,
    player: null,
    matching: null,

    events: {
        'click': 'playerMove'
    },

    initialize: function(options) {
        this.el = options.el;
        this.game = options.game;
        this.position = options.position;
        this.matching = options.matching;

        this.clear();
    },

    getPosition: function() {
        return this.position;
    },

    getPlayer: function() {
        return this.player;
    },

    hasSamePlayer: function(other) {
        return other.getPlayer() === this.getPlayer();
    },

    playerMove: function() {
        if (!this.isAvailable()) {
            return;
        }

        this.player = this.game.currentPlayer();
        this.el.innerHTML = this.player.getLabel();

        this.game.trigger('move', this);
    },

    clear: function() {
        this.player = null;
        this.el.innerHTML = '';
    },

    isAvailable: function() {
        return this.player === null;
    },

    matchWin: function() {
        var board = this.game.board;

        var win = _.find(this.matching, function(combination) {
            return board.getPosition(combination[0]).hasSamePlayer(this)
                   && board.getPosition(combination[1]).hasSamePlayer(this)
                   && board.getPosition(combination[2]).hasSamePlayer(this);
        }, this);

        return win !== undefined;
    }
});