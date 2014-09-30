var TicTacToe = TicTacToe || {};

TicTacToe.WinnerModal = TicTacToe.Modal.extend({
    el: '.overlay, .success',

    events: {
        'click .play': 'hide'
    },

    configureListeners: function(game) {
        this.listenTo(game, 'winner', this.show);
    },

    show: function(player) {
        this.$('b').text(player.getLabel());
        this.$el.removeClass('hide');
    }
});