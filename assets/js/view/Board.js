var TicTacToe = TicTacToe || {};

TicTacToe.Board = Backbone.View.extend({
    players: [],
    currentPlayer: -1,
    map: null,
    match: null,
    
	el: '.box',
    
    initialize: function() {
        this.configureMap();
        this.nextPlayer();
        
    },
    
    configureListeners: function() {
        this.listenTo(this, 'move', this.nextPlayer);
    },
    
    configureMap: function() {
        this.map = [];
        this.match = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
            [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
        ];
        
        _.each(this.$el.find('li'), function(element, index) {
            var position = {el: element, position: index, board: this};
            
            this.map.push(new TicTacToe.Position(position));
        }, this);
    },
    
    getPosition: function(index) {
        return this.map[index];
    },
    
    setPlayers: function(playerOne, playerTwo) {
        this.players[0] = playerOne;
        this.players[1] = playerTwo;
        
        this.getCurrentPlayer().move(this);
    },
    
    restart: function() {
        _.each(this.map, function(position) {
            position.clear();
        });
        
        this.getCurrentPlayer().move(this);
    },
    
    getCurrentPlayer: function() {
        return this.players[this.currentPlayer];
    },
    
    nextPlayer: function(position) {
        this.currentPlayer = this.currentPlayer == 0 ? 1 : 0;
        
        if (this.weHaveAWinner(position) || this.isATie()) {
            return;
        }
        
        if (player = this.getCurrentPlayer()) {
            player.move(this);
        }
    },
    
    weHaveAWinner: function(position) {
        if (position && position.matchWin()) {
            this.trigger('winner', position.getPlayer());
            
            return true;
        }
        
        return false;
    },

    nextAvailablePosition: function() {
        return _.find(this.map, function(position) {
            return position.isAvailable();
        });
    },
    
    isATie: function() {
        if (this.nextAvailablePosition()) {
            return false;
        }
        
        this.trigger('tie');
        
        return true;
    },
    
    
    matchingCombinations: function(position) {
        return _.filter(this.match, function(combination) {
            return _.contains(combination, position.getPosition());
        }, this);
    }
});