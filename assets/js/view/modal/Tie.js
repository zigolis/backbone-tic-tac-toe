var TicTacToe = TicTacToe || {};

TicTacToe.TieModal = TicTacToe.Modal.extend({
    template: _.template( $('#tmp-tie').html() ),

    el: '.tie',

    events: {
        'click .play': 'hide'
    },

    configureListeners: function(game) {
        this.listenTo(game, 'tie', this.show);
    },

    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html(this.template());
    }
});
