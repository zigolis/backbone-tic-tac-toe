var app = app || {};

app.TictactoeView = Backbone.View.extend({
    el: '.stage',

    events: {
        'click li'     : 'isEmpty',
        'click button' : 'restartGame'
    },

    initialize: function(){
        player = 1;
    },

    restartGame: function() {
        player = 1;
        this.$el.find('li').html('');
    },

    getValuesMult: function() {
        map = [
            [
                this.$el.find('li').get(0).innerHTML,
                this.$el.find('li').get(1).innerHTML,
                this.$el.find('li').get(2).innerHTML
            ],
            [
                this.$el.find('li').get(3).innerHTML,
                this.$el.find('li').get(4).innerHTML,
                this.$el.find('li').get(5).innerHTML
            ],
            [
                this.$el.find('li').get(6).innerHTML,
                this.$el.find('li').get(7).innerHTML,
                this.$el.find('li').get(8).innerHTML
            ]
        ];
    },

    checkWinner: function() {
        this.getValuesMult();

        combinations = [
                            [0,1,2],[3,4,5],[6,7,8],
                            [0,3,6],[1,4,7],[2,5,8],
                            [0,4,8],[2,4,6]
                       ];

        for (var a = 0; a < combinations.length; a++) {
            console.log(combinations[1]);
            if( combinations[a][0] == 'X' && combinations[a][1] == 'X' && combinations[a][2] == 'X'){
                console.log(combinations[a][0]);
            }
        };
    },

    getValues: function() {
        map = [
            this.$el.find('li').get(0).innerHTML,
            this.$el.find('li').get(1).innerHTML,
            this.$el.find('li').get(2).innerHTML,
            this.$el.find('li').get(3).innerHTML,
            this.$el.find('li').get(4).innerHTML,
            this.$el.find('li').get(5).innerHTML,
            this.$el.find('li').get(6).innerHTML,
            this.$el.find('li').get(7).innerHTML,
            this.$el.find('li').get(8).innerHTML
        ];
    },

    checkWin: function() {
        this.getValues();

        // check rows
        if (map[0] == 'X' && map[1] == 'X' && map[2] == 'X') {
            alert('there is a winner');
        } else if (map[3] == 'X' && map[4] == 'X' && map[5] == 'X') {
            alert('there is a winner');
        } else if (map[6] == 'X' && map[7] == 'X' && map[8] == 'X') {
            alert('there is a winner');
        }

        // check cols
        if (map[0] == 'X' && map[3] == 'X' && map[6] == 'X') {
            alert('there is a winner');
        } else if (map[1] == 'X' && map[4] == 'X' && map[7] == 'X') {
            alert('there is a winner');
        } else if (map[2] == 'X' && map[5] == 'X' && map[8] == 'X') {
            alert('there is a winner');
        }

        // check diagonals
        if (map[0] == 'X' && map[4] == 'X' && map[8] == 'X') {
            alert('there is a winner');
        } else if (map[2] == 'X' && map[4] == 'X' && map[6] == 'X') {
            alert('there is a winner');
        }
    },

    setPlayer: function(e) {
        if (player === 1) {
            player --;
            this.setXPlayer(e);
            this.checkWinner();
        } else {
            player ++;
            this.setOPlayer(e);
            this.checkWinner();
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
            return;
        };

        this.setPlayer(e);
    }
});
