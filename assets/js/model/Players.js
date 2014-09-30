var TicTacToe = TicTacToe || {};

TicTacToe.Players = Backbone.Model.extend({
    labels: ['X', '0'],
    players: [],
    current: 0,

    initialize: function() {
        this.players[0] = new TicTacToe.Player({label: this.labels[0]});
    },

    configureListeners: function(game) {
        this.listenTo(game.modals.setup, 'playerConfiguration', this.applyConfiguration);
    },

    selectOpponent: function() {
        if (!this.isAlreadyConfigured()) {
            return this.trigger('selectPlayer');
        }

        this.setOpponent(this.createOpponent(this.isAgainstCpu()));
    },

    createOpponent: function(againstCpu) {
        var options = {label: this.labels[1]};

        return againstCpu ? new TicTacToe.Cpu(options) : new TicTacToe.Player(options);
    },

    setOpponent: function(player) {
        this.players[1] = player;
    },

    isAlreadyConfigured: function() {
        return sessionStorage.getItem('cpu') != undefined;
    },

    isAgainstCpu: function() {
        return sessionStorage.getItem('cpu') === 'true';
    },

    applyConfiguration: function(againstCpu) {
        sessionStorage.setItem('cpu', againstCpu);
        this.setOpponent(this.createOpponent(againstCpu));
    },

    reset: function() {
        sessionStorage.removeItem('cpu');

        this.current = 0;
        this.selectOpponent();
    },

    next: function() {
        this.current = this.current == 0 ? 1 : 0;

        return this.getCurrent();
    },

    getCurrent: function() {
        return this.players[this.current];
    }
});
