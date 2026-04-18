const Game = (function () {

    function start() {
        const board = GameBoard.init();
        const player1 = Players.init()[0];
        const player2 = Players.init()[1];

        console.table(board);
        console.table(player1);
        console.table(player2);
    }

    return {
        start
    }

})();

const Players = (function () {
    const players = [
        { name: "Player", marker: "O", score: 0 },
        { name: "Computer", marker: "X", score: 0 },
    ];

    function init() {
        return players;
    }

    return {
        init
    }
})();

const GameBoard = (function () {
    const gameBoard = [];

    function createTile(pos) {
        return {
            position: pos,
            mark: ""
        }
    }

    function createBoard() {
        for (let i = 0; i < 9; i++) {
            gameBoard.push(createTile(i));
        }
    }

    function init() {
        createBoard();
        return gameBoard;
    }

    return {
        init
    }
})();

Game.start();
