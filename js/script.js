const Game = (function () {

    function start() {
        const board = GameBoard.test();
        let freeTiles = GameBoard.scan(board);

        const player1 = Players.init()[0];
        const player2 = Players.init()[1];

        let turn;

        //console.table(board);
        // console.table(player1);
        // console.table(player2);

        round(board, player1, player2);

    }

    function round(board, player1, player2) {
        let winner = checkWin(board);
        console.log(player1.name);
        console.log(player2.name);

        if (player1.mark === winner) {
            playerScore(player1);
            console.table(player1);
            console.table(player2);
        }
        else if (player2.mark === winner) {
            playerScore(player2);
            console.table(player1);
            console.table(player2);
        }
        else {
            console.log("TIE");
            console.table(player1);
            console.table(player2);
        }
    }

    function checkWin(board) {
        /*

                0  |   1   |  2  
              -----+-------+-----
                3  |   4   |  5  
              -----+-------+-----
                6  |   7   |  8  

                Checks      === Position Coordinates
                                    WIN if either `OOO` or `XXX`, TIE/DRAW if N/A
            Horizontal Checks:
                top-y       === 0,1,2
                center-y    === 3,4,5
                bottom-y    === 6,7,8
            Vertical Checks:
                top-x       === 0,3,6
                center-x    === 1,4,7
                bottom-x    === 2,5,8
            Diagonal Checks:
                left-xy     === 0,4,8
                right-xy    === 6,4,2

        */

        console.table(board);
        console.table(GameBoard.scan(board));

        function markOwner(mark){
            if (mark === "O") {
                return "Player";
            }
            else if (mark === "X") {
                return "Computer";
            }
        }

        // Top-Y
        if (board[0].mark !== "" && board[1].mark !== "" && board[2].mark !== 2 
            && (board[0].mark === board[1].mark && board[1].mark === board[2].mark)) {
                let winner = markOwner(board[0].mark);
                console.log(`Winner ${winner}!`);
                return board[0].name; 
        }

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
                "mark": "X"
            },
            {
                "position": 2,
                "mark": "X"
            },
            {
                "position": 3,
                "mark": "O"
            },
            {
                "position": 4,
                "mark": "O"
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