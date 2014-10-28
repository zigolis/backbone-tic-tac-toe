var TicTacToe = TicTacToe || {};

TicTacToe.TieModal = TicTacToe.Modal.extend({
    template: _.template( $('#tmp-tie').html() ),

    el: '.ct',

    events: {
        'click .play': 'hide'
    },

    configureListeners: function(game) {
        this.listenTo(game, 'tie', this.show);
    },

    render: function() {
        this.$('.tie').html(this.template());
    },

    show: function() {
        this.render();
        this.$('.overlay, .tie').removeClass('hide');
    },

    hide: function() {
        this.$('.overlay, .tie').addClass('hide');
    }
});
