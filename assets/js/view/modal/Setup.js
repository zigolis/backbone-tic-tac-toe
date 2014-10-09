var TicTacToe = TicTacToe || {};

TicTacToe.SetupModal = TicTacToe.Modal.extend({
    template: _.template( $('#tmp-setup').html() ),

    el: '.setup',

    events: {
        'click .cpu'   : 'cpu',
        'click .multi' : 'human'
    },

    configureListeners: function(game) {
        this.listenTo(game.players, 'selectPlayer', this.show);
    },

    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html(this.template());
    },

    cpu: function() {
        this.trigger('playerConfiguration', true);
        this.hide();
    },

    human: function() {
        this.trigger('playerConfiguration', false);
        this.hide();
    }
});
