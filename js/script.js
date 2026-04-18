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
        if (player1.marker === winner) {
            playerScore(player1);
            console.table(player1);
            console.table(player2);
        }
        else if (player2.marker === winner) {
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
                return board[0].name; 
        }
        // Center-Y
        else if (board[3].mark !== "" && board[4].mark !== "" && board[5].mark !== ""
            && (board[3].mark === board[4].mark && board[4].mark === board[5].mark)) {
                let winner = markOwner(board[3].mark);
                console.log("CENTER-Y Victory!");
                console.log(`Winner ${winner}!`);
                return board[3].name; 
        }
        // Bottom-Y
        else if (board[6].mark !== "" && board[7].mark !== "" && board[8].mark !== ""
            && (board[6].mark === board[7].mark && board[7].mark === board[8].mark)) {
                let winner = markOwner(board[6].mark);
                console.log("BOTTOM-Y Victory!");
                console.log(`Winner ${winner}!`);
                return board[6].name; 
        }
        // Top-X
        else if (board[0].mark !== "" && board[3].mark !== "" && board[6].mark !== ""
            && (board[0].mark === board[3].mark && board[3].mark === board[6].mark)) {
                let winner = markOwner(board[0].mark);
                console.log("TOP-X Victory!");
                console.log(`Winner ${winner}!`);
                return board[0].name; 
        }
        // Center-X
        else if (board[1].mark !== "" && board[4].mark !== "" && board[7].mark !== ""
            && (board[1].mark === board[4].mark && board[4].mark === board[7].mark)) {
                let winner = markOwner(board[1].mark);
                console.log("CENTER-X Victory!");
                console.log(`Winner ${winner}!`);
                return board[1].name; 
        }
        // Bottom-X
        else if (board[2].mark !== "" && board[5].mark !== "" && board[8].mark !== ""
            && (board[2].mark === board[5].mark && board[5].mark === board[8].mark)) {
                let winner = markOwner(board[2].mark);
                console.log("BOTTOM-X Victory!");
                console.log(`Winner ${winner}!`);
                return board[2].name; 
        }
        // Left-XY
        else if (board[0].mark !== "" && board[4].mark !== "" && board[8].mark !== ""
            && (board[0].mark === board[4].mark && board[4].mark === board[8].mark)) {
                console.clear();
                console.log(board[0].mark);
                console.log(`MARKOWNER: ${markOwner(board[0].mark)}`)
                let winner = markOwner(board[0].mark);
                console.log("LEFT-XY Victory!");
                console.log(`Winner ${winner}!`);
                return board[0].name; 
        }
        // Right-XY
        else if (board[6].mark !== "" && board[4].mark !== "" && board[2].mark !== ""
            && (board[6].mark === board[4].mark && board[4].mark === board[2].mark)) {
                console.clear();
                console.log(board[6].mark);
                console.log(`MARKOWNER: ${markOwner(board[6].mark)}`)
                let winner = markOwner(board[6].mark);
                console.log("RIGHT-XY Victory!");
                console.log(`Winner ${winner}!`);
                return board[6].name; 
        }

        function markOwner(mark){
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