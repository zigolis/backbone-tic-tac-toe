var TicTacToe = TicTacToe || {};

TicTacToe.Modal = Backbone.View.extend({
    configureListeners: function(game) {
    },

    hide: function() {
        this.$el.addClass('hide');
    },

    show: function() {
        this.$el.removeClass('hide');
    }
}, {
    all: function () {
        return {
            setup: new TicTacToe.SetupModal(),
            winner: new TicTacToe.WinnerModal(),
            tie: new TicTacToe.TieModal()
        };
    }
});
