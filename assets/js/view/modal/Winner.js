var TicTacToe = TicTacToe || {};

TicTacToe.WinnerModal = TicTacToe.Modal.extend({
    template: _.template( $('#tmp-winner').html() ),

    el: '.winner',

    events: {
        'click .play': 'hide'
    },

    configureListeners: function(game) {
        this.listenTo(game, 'winner', this.show);
    },

    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html(this.template());
    },

    show: function(player) {
        this.$('b').text(player.getLabel());
        this.$el.removeClass('hide');
    }
});
