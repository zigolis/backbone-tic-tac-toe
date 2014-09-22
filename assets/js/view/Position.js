var TicTacToe = TicTacToe || {};

TicTacToe.Position = Backbone.View.extend({
    board: null,
    position: null,
    player: null,
    matching: null,
    
    events: {
        'click': 'playerMove'
    },
    
    initialize: function(options) {
        this.board = options.board;
        this.position = options.position;
        this.el = options.el;
        this.matching = this.board.matchingCombinations(this);
        
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
        
        this.player = this.board.getCurrentPlayer();
        this.el.innerHTML = this.player.getLabel();
        
        this.board.trigger('move', this);
    },
    
    clear: function() {
        this.player = null;
        this.el.innerHTML = '';
    },
    
    isAvailable: function() {
        return this.player === null;
    },
    
    matchWin: function() {
        var win = _.find(this.matching, function(combination) {
            return this.board.getPosition(combination[0]).hasSamePlayer(this)
                   && this.board.getPosition(combination[1]).hasSamePlayer(this)
                   && this.board.getPosition(combination[2]).hasSamePlayer(this);
        }, this);
        
        return win !== undefined;   
    }
});