var app = app || {};

app.TictactoeView = Backbone.View.extend({
    el: '.stage',

    events: {
        'click li'     : 'isEmpty',
        'click button' : 'restartGame'
    },

    initialize: function(){
        player = 1;

        // arrayChicao = [
        //     this.$el.find('li').get(0).id,
        //     this.$el.find('li').get(1).id,
        //     this.$el.find('li').get(2).id,
        //     this.$el.find('li').get(3).id,
        //     this.$el.find('li').get(4).id,
        //     this.$el.find('li').get(5).id,
        //     this.$el.find('li').get(6).id,
        //     this.$el.find('li').get(7).id,
        //     this.$el.find('li').get(8).id
        // ]

        // console.log('Array-> ' + arrayChicao[0] + ' && HTML-> ' + this.$el.find('li').get(0).id)
        // console.log('Array-> ' + arrayChicao[1] + ' && HTML-> ' + this.$el.find('li').get(1).id)
        // console.log('Array-> ' + arrayChicao[2] + ' && HTML-> ' + this.$el.find('li').get(2).id)
        // console.log('Array-> ' + arrayChicao[3] + ' && HTML-> ' + this.$el.find('li').get(3).id)
        // console.log('Array-> ' + arrayChicao[4] + ' && HTML-> ' + this.$el.find('li').get(4).id)
        // console.log('Array-> ' + arrayChicao[5] + ' && HTML-> ' + this.$el.find('li').get(5).id)
        // console.log('Array-> ' + arrayChicao[6] + ' && HTML-> ' + this.$el.find('li').get(6).id)
        // console.log('Array-> ' + arrayChicao[7] + ' && HTML-> ' + this.$el.find('li').get(7).id)
        // console.log('Array-> ' + arrayChicao[8] + ' && HTML-> ' + this.$el.find('li').get(8).id)
    },

    restartGame: function() {
        player = 1;
        this.$el.find('li').html('');
    },

    verifyWinner: function(e) {
        pieces = [
            this.$el.find('li').get(0).innerHTML,
            this.$el.find('li').get(1).innerHTML,
            this.$el.find('li').get(2).innerHTML,
            this.$el.find('li').get(3).innerHTML,
            this.$el.find('li').get(4).innerHTML,
            this.$el.find('li').get(5).innerHTML,
            this.$el.find('li').get(6).innerHTML,
            this.$el.find('li').get(7).innerHTML,
            this.$el.find('li').get(8).innerHTML
        ]

        if (
            pieces[0, 1, 2] == 'X' ||
            pieces[3, 4, 5] == 'X' ||
            pieces[6, 7, 8] == 'X' ||
            pieces[0, 3, 6] == 'X' ||
            pieces[1, 4, 7] == 'X' ||
            pieces[2, 5, 8] == 'X'
        ) {
            alert('there is a winner');
        };
    },

    setPlayer: function(e) {
        this.verifyWinner();

        if (player === 1) {
            player --;
            this.setXPlayer(e);
        } else {
            player ++;
            this.setOPlayer(e);
        }
    },

    setXPlayer: function(e) {
        e.currentTarget.innerHTML = 'X';
    },

    setOPlayer: function(e) {
        e.currentTarget.innerHTML = '0';
    },

    isEmpty: function(e) {
        if (e.currentTarget.innerHTML) {
            console.log('Hey there, here was already clicked!')
            return;
        };

        this.setPlayer(e);
    }
});
