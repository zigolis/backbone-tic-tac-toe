var TicTacToe = TicTacToe || {};

TicTacToe.Modal = Backbone.View.extend({
    hide: function() {
        this.$el.addClass('hide');
    },

    show: function() {
        this.$el.removeClass('hide');
    }
},

{
    all: function () {
        return {
            setup: new TicTacToe.SetupModal(),
            winner: new TicTacToe.WinnerModal(),
            tie: new TicTacToe.TieModal()
        }
    }
});
