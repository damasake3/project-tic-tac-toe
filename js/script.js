const GameBoard = (function () {
    const gameBoard = [];

    function createTile (pos) {
        return {
            position: pos,
            mark: ""
        }
    }

    function createBoard () {
        for (let i = 0; i < 9; i++) {
            gameBoard.push(createTile(i));
        }
    }

    return {
        init: function() {
            createBoard();
            return gameBoard;
        }
    }
})();

console.log(GameBoard.init());