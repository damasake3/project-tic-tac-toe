const gameBoard = (() => {

    // THE GAMEBOARD
    //       *  |  *  |  *    1. Positions are exactly how it says in template = [{ postion:"position",... }
    //     -----+-----+-----        * This is for mine own readability
    //       *  |  *  |  *    2. Marks are either "O" or "X"
    //     -----+-----+-----
    //       *  |  *  |  *   

    const template = [
        { position: "top-left", mark: "" }, { position: "top-center", mark: "" }, { position: "top-right", mark: "" },
        { position: "center-left", mark: "" }, { position: "center-center", mark: "" }, { position: "center-right", mark: "" },
        { position: "bottom-left", mark: "" }, { position: "bottom-center", mark: "" }, { position: "bottom-right", mark: "" }
    ]

    const testTemplate = [
        { position: "top-left", mark: "O" }, { position: "top-center", mark: "O" }, { position: "top-right", mark: "O" },
        { position: "center-left", mark: "O" }, { position: "center-center", mark: "X" }, { position: "center-right", mark: "" },
        { position: "bottom-left", mark: "X" }, { position: "bottom-center", mark: "O" }, { position: "bottom-right", mark: "O" }
    ]

    const board = [];

    function init() {
        board.push(...testTemplate);
        return board;
    }

    function reset(board) {
        for (let i = 0; i < board.length; i++) {
            board[i].mark = "";
        }
    }

    function check(boardMark) {
        if (boardMark === "") {
            return "*";
        }
        else {
            return boardMark;
        }
    }

    function display(board) {
        let temp = [];
        const between = "-----+-----+-----";

        // display by 3s in all rows followed by a in-betweener per row
        //  - thru temp[], pushed, emptied it out then repeated as shown below
        function create(board) {
            for (let i = 0; i < board.length; i++) {
                temp.push(check(board[i].mark));
                if (i === 0) {
                    console.log(between);
                }
                if (i === 2 || i === 5 || i === 8) {

                    console.log(`  ${temp[0]}  |  ${temp[1]}  |  ${temp[2]}  `);
                    console.log(between);
                    temp = [];
                }
            }
        }

        create(board);

    }

    function mark(board, mark, position) {
        for (let i = 0; i < board.length; i++) {
            if (position === board[i].position && board[i].mark === "") {
                board[i].mark = mark;
            }
        }
    }

    return {
        init,
        display,
        reset,
        mark
    }

})();

const Players = (() => {
    const template = [
        { name: "Player1", mark: "X", score: 0 },
        { name: "Player2", mark: "O", score: 0 }
    ]

    const data = [];

    function init() {
        data.push(...template);
        return data;
    }

    function display(data) {
        console.table(data);
    }

    return {
        init,
        display
    }
})();

const gamePlay = (() => {
    const gameboard = gameBoard.init();

    const players = Players.init();
    const player1 = players[0];
    const player2 = players[1];

    let turnNumber = 0;

    function game() {

        // for (let i = 0; i < 9; i++) {
        //     turn();
        // }

        console.log(`Player1: ${player1.name}, Mark: ${player1.mark}`);
        checkWin(gameboard);

        // A turn is a players turn to mark a valid position from the board
        // A turn only ends when either player gets a win condition
        // 9 turns max per game

        // function turn() {
        //     display();
        //     playerTurn(gameboard, checkTurn(turnNumber), getPosition());
        // }

        function playerTurn(board, mark, position) {
            gameBoard.mark(board, mark, position);
            display();
            turnNumber++;
        }

        function checkTurn(turnNumber) {
            if (turnNumber % 2 === 0) {
                console.log("Player1's turn");
                return player1.mark;
            } else if (turnNumber % 2 !== 0) {
                console.log("Player2's turn");
                return player2.mark;
            } else {
                console.log("Something's wrong");
            }
        }

        function checkWin(board) {
            let horizontalTemp = [];
            let verticalTemp = [];
            let diagonalTemp = [];

            scan(board);
            display(board);

            function scan(board) {
                for (let i = 0; i < 9; i++){
                    if (horizontalTemp.length < 3) {
                        horizontalTemp.push(board[i]);
                    }

                    if (verticalTemp.length < 3) {
                        if (i === 0 || i === 1 || i === 2) {
                            verticalTemp.push(board[i]);
                            verticalTemp.push(board[i+3]);
                            verticalTemp.push(board[i+3+3]);
                        }
                    }

                    if (diagonalTemp.length < 3) {
                        if (i === 0) {
                            diagonalTemp.push(board[i]);
                            diagonalTemp.push(board[i+4]);
                            diagonalTemp.push(board[i+4+4]);
                        }

                        if (i === 2) {
                            diagonalTemp.push(board[i]);
                            diagonalTemp.push(board[i+2]);
                            diagonalTemp.push(board[i+2+2]);
                        }
                    }

                    if (horizontalTemp.length === 3) {
                        console.log("Horizontal Check");
                        let result = isWin(horizontalTemp);

                        console.log(`isWin: ${result}`);
                        
                        if (result === true) {
                            break;
                        } else {
                            horizontalTemp.length = 0;
                        }

                    }

                    if (verticalTemp.length === 3) {
                        console.log("Vertical Check");
                        let result = isWin(verticalTemp);

                        console.log(`isWin: ${result}`);
                        
                        if (result === true) {
                            break;
                        } else {
                            verticalTemp.length = 0;
                        }
                    }

                    if (diagonalTemp.length === 3) {
                        console.log("Diagonal Check");
                        let result = isWin(diagonalTemp);

                        console.log(`isWin: ${result}`);
                        
                        if (result === true) {
                            break;
                        } else {
                            diagonalTemp.length = 0;
                        }
                    }

                }

                function isWin(temp) {
                    // console.clear();
                    console.log(temp[0].mark);
                    console.log(temp[1].mark);
                    console.log(temp[2].mark);
                    if (temp[0].mark === temp[1].mark && temp[0].mark === temp[2].mark) {
                        console.log("WIN");
                        score(temp[0].mark);
                        return true;
                    }
                    return false;

                    function score(temp){
                        if (temp === player1.mark) {
                            player1.score++;
                        } else if (temp === player2.mark) {
                            player2.score++;
                        }
                    }
                }
            }
        }

        function getPosition() {
            return prompt("Choose Position (Pick from gameboard template array)");
        }


        function display() {
            // console.clear();
            gameBoard.display(gameboard);
            Players.display(players);
        }

    }

    return {
        game
    }
})();

gamePlay.game();