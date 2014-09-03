var app = app || {};

app.TictactoeView = Backbone.View.extend({
    counter: 1,
    playerX: 'X',
    playerO: '0',
    map: [],
    match: [],
    
    el: '.stage',

    events: {
        'click li'       : 'isEmpty',
        'click .play'    : 'hideModalWinner',
        'click .restart' : 'restartGame'
    },

    isEmpty: function(e) {
        if (e.currentTarget.innerHTML) {
            return;
        }

        this.setPlayer(e);
    },

    setPlayer: function(e) {
        if (this.counter === 1) {
            this.counter --;
            this.setPlayerX(e);
            this.checkWinner(this.playerX);
        } else {
            this.counter ++;
            this.setPlayerO(e);
            this.checkWinner(this.playerO);
        }
    },

    setPlayerX: function(e) {
        e.currentTarget.innerHTML = this.playerX;
    },

    setPlayerO: function(e) {
        e.currentTarget.innerHTML = this.playerO;
    },

    restartGame: function() {
        this.counter = 1;
        this.$el.find('li').html('');
    },

    getValues: function() {
        el  = this.$el.find('li');
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
            }
        }
    },

    showModalWinner: function(player) {
        this.$el.find('.success b').text(player);
        this.$el.find('.hide').removeClass('hide');
    },

    hideModalWinner: function() {
        this.$el.find('.overlay').addClass('hide');
        this.$el.find('.success').addClass('hide');

        this.restartGame();
    }
});
