var TicTacToe = TicTacToe || {};

TicTacToe.Player = Backbone.Model.extend({
    move: function(board) {
    },

    setLabel: function(label) {
        this.set('label', label);
    },

    getLabel: function() {
        return this.get('label');
    }
});
