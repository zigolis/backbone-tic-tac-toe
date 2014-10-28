var TicTacToe = TicTacToe || {};

TicTacToe.WinnerModal = TicTacToe.Modal.extend({
    template: _.template( $('#tmp-winner').html() ),

    el: '.ct',

    events: {
        'click .play': 'hide'
    },

    configureListeners: function(game) {
        this.listenTo(game, 'winner', this.show);
    },

    render: function(game) {
        this.$('.winner').html(this.template());
    },

    show: function(player) {
        this.render();
        this.$('b').text(player.getLabel());
        this.$('.overlay, .winner').removeClass('hide');
    },

    hide: function() {
        this.$('.overlay, .winner').addClass('hide');
    }
});
