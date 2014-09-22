var TicTacToe = TicTacToe || {};

TicTacToe.Cpu = TicTacToe.Player.extend({
	move: function(board) {
	    this.nextMove(board).$el.click();
	},
	
	nextMove: function(board) {
	    if (board.getPosition(4).isAvailable()) {
	        return board.getPosition(4);
	    }
	    
	    return board.nextAvailablePosition();
	}
});