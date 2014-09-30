var TicTacToe = TicTacToe || {};

TicTacToe.TieModal = TicTacToe.Modal.extend({
    el: '.overlay, .tie',

    events: {
        'click .play': 'hide'
    },

    configureListeners: function(game) {
        this.listenTo(game, 'tie', this.show);
    }
});
