var TicTacToe = TicTacToe || {};

TicTacToe.SetupModal = TicTacToe.Modal.extend({
    template: _.template( $('#tmp-setup').html() ),

    el: '.ct',

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
        this.$('.setup').html(this.template());
    },

    show: function() {
        this.$('.overlay, .setup').removeClass('hide');
    },

    cpu: function() {
        this.trigger('playerConfiguration', true);
        this.$('.overlay, .setup').addClass('hide');
    },

    human: function() {
        this.trigger('playerConfiguration', false);
        this.$('.overlay, .setup').addClass('hide');
    }
});
