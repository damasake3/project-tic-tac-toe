const Game = (function () {

    function start() {
        const board = GameBoard.init();
        let freeTiles = GameBoard.scan(board);
        const player1 = Players.init()[0];
        const player2 = Players.init()[1];

        // console.table(board);
        // console.table(player1);
        // console.table(player2);
        console.log(freeTiles);
       
    }

    function playerScore(player) {
        player.score++;
        console.log(`${player.name} wins!`);
    }

    function playerChoice() {

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

    function clearBoard() {
        gameBoard.length = 0;
    }

    function scan(board) {
        let freeTiles = board.filter((tile) => {
            return tile.mark === "";
        });

        return freeTiles;
    }

    function init() {
        clearBoard();
        createBoard();
        return gameBoard;
    }

    function test() {
        return [
            {
                "position": 0,
                "mark": "X"
            },
            {
                "position": 1,
                "mark": ""
            },
            {
                "position": 2,
                "mark": ""
            },
            {
                "position": 3,
                "mark": "O"
            },
            {
                "position": 4,
                "mark": ""
            },
            {
                "position": 5,
                "mark": ""
            },
            {
                "position": 6,
                "mark": ""
            },
            {
                "position": 7,
                "mark": ""
            },
            {
                "position": 8,
                "mark": ""
            }
        ]
    }

    return {
        init,
        scan,
        test
    }
})();

Game.start();