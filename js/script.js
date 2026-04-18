const Game = (function () {

    function start() {
        const board = GameBoard.test();
        const player1 = Players.init()[0];
        const player2 = Players.init()[1];
        let turn = 0;


        playerChoice(player1, board);
        console.table(board);
    }

    function round(board, player1, player2) {
        let winner = checkWin(board);
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

        // Top-Y
        if (board[0].mark !== "" && board[1].mark !== "" && board[2].mark !== ""
            && (board[0].mark === board[1].mark && board[1].mark === board[2].mark)) {
            let winner = markOwner(board[0].mark);
            console.log("TOP-Y Victory!");
            console.log(`Winner ${winner}!`);
            return board[0].mark;
        }
        // Center-Y
        else if (board[3].mark !== "" && board[4].mark !== "" && board[5].mark !== ""
            && (board[3].mark === board[4].mark && board[4].mark === board[5].mark)) {
            let winner = markOwner(board[3].mark);
            console.log("CENTER-Y Victory!");
            console.log(`Winner ${winner}!`);
            return board[3].mark;
        }
        // Bottom-Y
        else if (board[6].mark !== "" && board[7].mark !== "" && board[8].mark !== ""
            && (board[6].mark === board[7].mark && board[7].mark === board[8].mark)) {
            let winner = markOwner(board[6].mark);
            console.log("BOTTOM-Y Victory!");
            console.log(`Winner ${winner}!`);
            return board[6].mark;
        }
        // Top-X
        else if (board[0].mark !== "" && board[3].mark !== "" && board[6].mark !== ""
            && (board[0].mark === board[3].mark && board[3].mark === board[6].mark)) {
            let winner = markOwner(board[0].mark);
            console.log("TOP-X Victory!");
            console.log(`Winner ${winner}!`);
            return board[0].mark;
        }
        // Center-X
        else if (board[1].mark !== "" && board[4].mark !== "" && board[7].mark !== ""
            && (board[1].mark === board[4].mark && board[4].mark === board[7].mark)) {
            let winner = markOwner(board[1].mark);
            console.log("CENTER-X Victory!");
            console.log(`Winner ${winner}!`);
            return board[1].mark;
        }
        // Bottom-X
        else if (board[2].mark !== "" && board[5].mark !== "" && board[8].mark !== ""
            && (board[2].mark === board[5].mark && board[5].mark === board[8].mark)) {
            let winner = markOwner(board[2].mark);
            console.log("BOTTOM-X Victory!");
            console.log(`Winner ${winner}!`);
            return board[2].mark;
        }
        // Left-XY
        else if (board[0].mark !== "" && board[4].mark !== "" && board[8].mark !== ""
            && (board[0].mark === board[4].mark && board[4].mark === board[8].mark)) {
            console.log(board[0].mark);
            console.log(`MARKOWNER: ${markOwner(board[0].mark)}`)
            let winner = markOwner(board[0].mark);
            console.log("LEFT-XY Victory!");
            console.log(`Winner ${winner}!`);
            return board[0].mark;
        }
        // Right-XY
        else if (board[6].mark !== "" && board[4].mark !== "" && board[2].mark !== ""
            && (board[6].mark === board[4].mark && board[4].mark === board[2].mark)) {
            console.log(board[6].mark);
            console.log(`MARKOWNER: ${markOwner(board[6].mark)}`)
            let winner = markOwner(board[6].mark);
            console.log("RIGHT-XY Victory!");
            console.log(`Winner ${winner}!`);
            return board[6].mark;
        }

        function markOwner(mark) {
            if (mark === "O") {
                return "Player";
            }
            else if (mark === "X") {
                return "Computer";
            }
        }

        console.table(board);
        console.table(GameBoard.scan(board));

    }

    function playerScore(player) {
        player.score++;
        console.log(`${player.name} wins!`);
    }

    function playerChoice(player, board) {
        const availaboard = GameBoard.scan(board);
        const mark = player.mark;
        console.log(`PlayerMark: ${mark}`);
        let result = [];

        while (result.availability !== true) {
            result = validate(Number(prompt("Enter Position (number)",)), availaboard);
            console.log(result);
        }

        markBoard(board, mark, result.position);

        function validate(choice, board) {
            for (let i = 0; i < board.length; i++) {
                if (choice === board[i].position) {
                    return {
                        availability: true,
                        position: choice
                    }
                }
            }

            return {
                availability: false,
                position: null
            }
        }

        function markBoard(board, mark, position) {
            for (let i = 0; i < board.length; i++) {
                if(board[i].position === position) {
                    console.log("\n");
                    console.log(board[i]);
                    board[i].mark = mark;
                }
            }
        }

    }

    return {
        start
    }

})();

const Players = (function () {
    const players = [
        { name: "Player", mark: "O", score: 0 },
        { name: "Computer", mark: "X", score: 0 },
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
                "mark": ""
            },
            {
                "position": 1,
                "mark": ""
            },
            {
                "position": 2,
                "mark": "O"
            },
            {
                "position": 3,
                "mark": "X"
            },
            {
                "position": 4,
                "mark": "O"
            },
            {
                "position": 5,
                "mark": "X"
            },
            {
                "position": 6,
                "mark": "O"
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