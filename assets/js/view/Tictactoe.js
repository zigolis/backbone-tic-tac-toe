var app = app || {};

app.TictactoeView = Backbone.View.extend({
    counter: 1,
    playerX: 'X',
    playerO: '0',
    bestMove: 0,
    map: [],
    match: [],

    el: '.stage',

    events: {
        'click li'       : 'isEmpty',
        'click .play'    : 'play',
        'click .restart' : 'restartGame'
    },

    initialize: function() {
        start = confirm('Would you like to play against the CPU?');

        if (!start) {
            this.multi = true;
        }
    },

    play: function(e) {
        this.hideModalWinner();
        this.resetAudio();
        this.restartGame();
        this.initialize();
    },

    isEmpty: function(e) {
        if (e.currentTarget.innerHTML) {
            return;
        }

        if (this.multi) {
            this.setMultiPlayer(e);
        } else {
            this.setAgainstCpuPlayer(e);
        }

    },

    setMultiPlayer: function(e) {
        if (this.counter === 1) {
            this.counter --;
            this.setPlayerX(e);
            this.playAudio();
            this.checkWinner(this.playerX);
        } else {
            this.counter ++;
            this.setPlayerO(e);
            this.playAudio();
            this.checkWinner(this.playerO);
        }
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

    restartGame: function() {
        this.counter = 1;
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

        this.map = [
            el.get(0).innerHTML, el.get(1).innerHTML, el.get(2).innerHTML,
            el.get(3).innerHTML, el.get(4).innerHTML, el.get(5).innerHTML,
            el.get(6).innerHTML, el.get(7).innerHTML, el.get(8).innerHTML
        ];

        this.match = [
            [0,1,2],[3,4,5],[6,7,8],[0,3,6],
            [1,4,7],[2,5,8],[0,4,8],[2,4,6]
        ];
    },

    checkWinner: function(player) {
        this.getValues();

        for (var a = 0; a < this.match.length; a++) {
            if (this.map[this.match[a][0]] == player && this.map[this.match[a][1]] == player && this.map[this.match[a][2]] == player) {
                this.showModalWinner(player);
                this.playAudio('winner.mp3');
            }
        }
    },

    showModalWinner: function(player) {
        this.$('.success b').text(player);
        this.$('.hide').removeClass('hide');
    },

    hideModalWinner: function() {
        this.$('.overlay').addClass('hide');
        this.$('.success').addClass('hide');
    }
});
