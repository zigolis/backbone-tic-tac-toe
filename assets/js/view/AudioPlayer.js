var TicTacToe = TicTacToe || {};

TicTacToe.AudioPlayer = Backbone.View.extend({
    el: 'audio',
    
    configureListeners: function(board) {
        this.listenTo(board, 'move', this.move);
        this.listenTo(board, 'winner', this.winner);
        this.listenTo(board, 'tie', this.tie);
    },

    playAudio: function(audio) {
        this.el.src = 'assets/audio/' + audio;
        this.el.play();
    },

    move: function() {
        this.playAudio('button.mp3');
    },
    
    winner: function() {
        this.playAudio('winner.mp3');
    },
    
    tie: function() {
        this.playAudio('tie.mp3');
    }
});
