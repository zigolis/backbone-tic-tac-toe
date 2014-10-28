var TicTacToe = TicTacToe || {};

TicTacToe.AudioPlayer = Backbone.View.extend({
    el: 'audio',

    configureListeners: function(game) {
        this.listenTo(game, 'move', this.move);
        this.listenTo(game, 'winner', this.winner);
        this.listenTo(game, 'tie', this.tie);
    },

    playAudio: function(audio) {
        this.el.src = 'assets/audio/' + audio;
        this.el.play();
    },

    move: function() {
        console.log('move', arguments);
        this.playAudio('button.mp3');
    },

    winner: function() {
        console.log('win', arguments);
        this.playAudio('winner.mp3');
    },

    tie: function() {
        this.playAudio('tie.mp3');
    }
});
