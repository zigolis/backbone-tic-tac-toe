var TicTacToe = TicTacToe || {};

TicTacToe.Game = Backbone.View.extend({
    counter: 1,
    playerX: 'X',
    playerO: '0',
    bestMove: 0,
    map: [],
    match: [],

    el: '.stage',

    events: {
        'click li'       : 'isEmpty',
        'click .play'    : 'playAgain',
        'click .restart' : 'restartGame',
        'click .cpu'     : 'playAgainstCpu',
        'click .multi'   : 'playMultiPlayer'
    },

    initialize: function() {
        this.setup();
    },

    setup: function () {
        if (!this.hasCpuConfig()) {
            this.showModalSetup();
        }
    },

    hasCpuConfig: function() {
        return sessionStorage.getItem('cpu') != undefined;
    },

    setCpuConfig: function(cpuConfig) {
        this.cpuConfig = parseInt(cpuConfig);
        sessionStorage.setItem('cpu', cpuConfig);
    },

    clearCpuConfig: function() {
        sessionStorage.removeItem('cpu');
    },

    showModalSetup: function() {
        this.$('.overlay, .setup').removeClass('hide');
    },

    hideModalSetup: function() {
        this.$('.overlay, .setup').addClass('hide');
    },

    playAgainstCpu: function() {
        this.setCpuConfig(1);
        this.hideModalSetup();
    },

    playMultiPlayer: function() {
        this.setCpuConfig(0);
        this.hideModalSetup();
    },

    isEmpty: function(e) {
        if (e.currentTarget.innerHTML) {
            return;
        }

        if (this.isCpuMode() == false) {
            this.setMultiPlayer(e);
            return;
        }

        this.setAgainstCpuPlayer(e);
    },

    isCpuMode: function() {
        return sessionStorage.getItem('cpu');
    },

    setMultiPlayer: function(e) {
        this.playAudio();

        if (this.counter === 1) {
            this.counter --;
            this.setPlayerX(e);
            this.checkWinner(this.playerX);

            return;
        }

        this.counter ++;
        this.setPlayerO(e);
        this.checkWinner(this.playerO);
    },

    setAgainstCpuPlayer: function(e) {
        if (this.counter === 1) {
            this.counter ++;
            this.setPlayerX(e);
            this.playAudio();
            this.checkWinner(this.playerX);
        }

        this.setCpuPlayer();
    },

    setPlayerX: function(e) {
        e.currentTarget.innerHTML = this.playerX;
    },

    setPlayerO: function(e) {
        e.currentTarget.innerHTML = this.playerO;
    },

    setCpuPlayer: function() {
        this.counter --;
        this.cpuMove();
        bestMove = this.bestMove;
        this.$('li').get(bestMove).innerHTML = this.playerO;
        this.playAudio();
        this.checkWinner(this.playerO);
    },

    playAudio: function(audio) {
        if (audio) {
            this.$('audio')[0].src = 'assets/audio/' + audio;
        }

        this.$('audio')[0].play();
    },

    resetAudio: function() {
        this.$('audio')[0].src = 'assets/audio/button.mp3';
    },

    playAgain: function(e) {
        this.counter = 1;
        this.hideModalWinner();
        this.resetAudio();
        this.clearStage();
        this.setup();
    },

    restartGame: function() {
        this.counter = 1;
        this.clearStage();
        this.clearCpuConfig();
        this.setup();
    },

    clearStage: function() {
        this.$('li').html('');
    },

    cpuMove: function() {
        for (var i = 0; i < this.map.length; i++) {
            if (this.map[i] == '') {
                this.bestMove = i;
            }
        }

        if (this.map[4] == '') {
            this.bestMove = 4;
        }

        return this.bestMove;
    },

    getValues: function() {
        el = this.$('li');
        this.map = [];

        for (var i = 0; i < el.length; i++) {
            this.map[i] = el.get(i).innerHTML;
        }

        this.match = [
            [0,1,2],[3,4,5],[6,7,8],[0,3,6],
            [1,4,7],[2,5,8],[0,4,8],[2,4,6]
        ];
    },

    checkWinner: function(player) {
        this.getValues();

        for (var a = 0; a < this.match.length; a++) {
            if (
                this.map[this.match[a][0]] == player &&
                this.map[this.match[a][1]] == player &&
                this.map[this.match[a][2]] == player
            ) {
                this.showModalWinner(player);
                this.playAudio('winner.mp3');
            }
        }
    },

    showModalWinner: function(player) {
        this.$('.success b').text(player);
        this.$('.overlay, .success').removeClass('hide');
    },

    hideModalWinner: function() {
        this.$('.overlay, .success').addClass('hide');
    }
});
