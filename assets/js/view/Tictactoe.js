var TicTacToe = TicTacToe || {};

TicTacToe.Game = Backbone.View.extend({
    board: null,
    audioPlayer: null,
    players: null,
    modals: null,

    el: '.stage',

    events: {
        'click .play'    : 'play',
        'click .restart' : 'restartGame'
    },

    initialize: function() {
        this.players = new TicTacToe.Players();
        this.board = new TicTacToe.Board({game: this});
        this.audioPlayer = new TicTacToe.AudioPlayer();
        this.modals = TicTacToe.Modal.all();

        this.configureListeners();
        this.players.selectOpponent();
    },

    configureListeners: function() {
        this.players.configureListeners(this);
        this.audioPlayer.configureListeners(this);
        this.modals.setup.configureListeners(this);
        this.modals.winner.configureListeners(this);
        this.modals.tie.configureListeners(this);

        this.listenTo(this, 'move', this.nextPlayer);
    },

    play: function() {
        this.board.restart();
        this.currentPlayer().move(this.board);
    },

    restartGame: function() {
        this.board.restart();
        this.players.reset();
    },

    currentPlayer: function() {
        return this.players.getCurrent();
    },

    nextPlayer: function(playedPosition) {
        var player = this.players.next();

        if (this.weHaveAWinner(playedPosition) || this.isATie()) {
            return;
        }

        player.move(this.board);
    },

    weHaveAWinner: function(playedPosition) {
        if (playedPosition && playedPosition.matchWin()) {
            this.trigger('winner', playedPosition.getPlayer());

            return true;
        }

        return false;
    },

    isATie: function() {
        if (!this.board.nextAvailablePosition()) {
            this.trigger('tie');
            return true;
        }

        return false;
    }
});
