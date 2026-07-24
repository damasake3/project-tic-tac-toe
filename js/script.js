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
        board.push(...template);
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

    function get(x) {
        if (x === "board") {
            return board;
        } else if (x === "boardLength") {
            return board.length;
        } else if (x === "freeTiles") {
            let result = Number(board.length);
            for (let i = 0; i < board.length; i++) {
                if (board[i].mark !== "") {
                    result--;
                }
            }
            return result;
        }
    }

    return {
        init,
        display,
        reset,
        mark,
        get
    }

})();

const Players = (() => {
    const template = [
        { id: "player1", name: "Player1", mark: "X", score: 0 },
        { id: "player2", name: "Player2", mark: "O", score: 0 }
    ]

    const testTemplate = [
        { id: "player1", name: "Luke Skywalker", mark: "X", score: 99 },
        { id: "player2", name: "Darth Vader", mark: "O", score: 69 }
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

const gameScreen = (() => {
    const ticTacBoard = document.getElementById("ticTacBoard");
    const ticTacTiles = ticTacBoard.querySelectorAll("*");

    function refresh(gameboard, players) {
        renderBoard(gameboard);
        renderPlayers(players);
    }

    // Using gameBoard's TestTemplate, gameboard should fill the UI with actual markings
    // UnMarked Tiles will be filled with index number plus one as shown below
    function renderBoard(gameboard) {
        ticTacTiles.forEach((tile) => {
            for (let i = 0; i < gameboard.length; i++) {
                if (tile.dataset.position === gameboard[i].position) {
                    tile.dataset.mark = gameboard[i].mark;
                    tile.innerText = gameboard[i].mark;

                    if (gameboard[i].mark === "") {
                        tile.innerText = i + 1;
                    }
                }
            }
        });
    }

    function renderPlayers(players) {
        const player1 = document.getElementById("player1");
        const player1Data = player1.querySelectorAll("*");

        const player2 = document.getElementById("player2");
        const player2Data = player2.querySelectorAll("*");

        render(player1Data, "player1");
        render(player2Data, "player2");

        function render(data, playerId) {
            data.forEach((item) => {
                for (let i = 0; i < players.length; i++) {
                    if (players[i].id === playerId) {
                        console.log(`data-name=${item.dataset.name}`);
                        if (item.classList.contains("player-name")) {
                            item.dataset.name = players[i].name;
                            item.innerText = item.dataset.name;
                        }

                        if (item.classList.contains("player-score")) {
                            item.dataset.score = players[i].score;
                            item.innerText = item.dataset.score;
                        }
                    }
                }
            });
        }
    }

    return {
        refresh,
        renderBoard,
        renderPlayers,
    }

})();

const gameController = (() => {

    function renderStart(gameboard, player1) {
        const startBtn = document.getElementById("start-btn");

        startBtn.addEventListener("click", (e) => {
            gameScreen.renderBoard(gameboard);
            gameScreen.renderPlayers(player1);
            gameController.renderEvents();
            console.log("Game Start");
        });
    }

    function renderEvents() {
        ticTacBoard.addEventListener("mouseover", (e) => {
            let target = e.target;

            if (target.classList.contains("grid-item")) {
                if (target.dataset.mark === "") {
                    console.log(`${target.dataset.position} is FREE`);
                } else {
                    console.log(`${target.dataset.position} is TAKEN by ${target.dataset.mark}`);
                }
            }
        });

        ticTacBoard.addEventListener("click", (e) => {
            let target = e.target;
            let clickPosition;
            let boardLength = gameBoard.get("boardLength");
            let turnNumber = boardLength - gameBoard.get("freeTiles");

            if (target.classList.contains("grid-item")) {
                if (target.dataset.mark === "") {
                    // turn(clickPosition) => playerTurn
                    //  (gameboard, checkTurn(turnNumber)) =>
                    //   gameScreen.refresh(gameboard, players);

                    // console.log(`CLICKED! ${target.dataset.position} is FREE`);
                    // console.table(gameBoard.get("board"));
                    // console.log(boardLength);
                    // console.log(turnNumber);
                    clickPosition = gamePlay.getPosition(target.dataset.position);
                    // gamePlay.turn(clickPosition, gamePlay.turnNumber);
                    encounter(clickPosition, turnNumber);

                } else {
                    console.log(`CLICKED! ${target.dataset.position} is TAKEN by ${target.dataset.mark}`);
                }
            }

            function encounter(clickPosition, turnNumber) {
                console.log(`turnNumber: ${turnNumber}`);
                console.log(`clickPosition ${clickPosition}`);

                switch (gamePlay.turn(clickPosition, turnNumber) === true) {
                    case true:
                        console.log("wala na finish na");
                        break;
                    case false:
                        console.log(turnNumber);
                        console.log("Pildi player1");
                        switch (gamePlay.enemyTurn(turnNumber) === true) {
                            case true:
                                console.log(turnNumber);
                                console.log("Ah wala pildi ka boss");
                                break;
                            case false:
                                console.log(turnNumber);
                                console.log("Ah way daog uli namo haha");
                                break;
                        }
                }
            }
        });

    }

    function playerNaming(p) {
        const player = p;
        const nameBtn = document.getElementById("name-btn");
        const playerName = document.getElementById("player-name");

        nameBtn.addEventListener("click", (e) => {
            let target = e.target;
            e.preventDefault();

            console.log(e);
            console.log(playerName.value);
            console.table(player);

            if (playerName.value !== "") {
                player.map(pl => {
                    if (pl.id === "player1") {
                        pl.name = playerName.value
                    };
                })
            }
            console.table(player);
            gameScreen.renderPlayers(player);
        });
    }

    return {
        renderStart,
        renderEvents,
        playerNaming
    }
})();

const gamePlay = (() => {
    const gameboard = gameBoard.init();
    const players = Players.init();

    const player1 = players[0];
    const player2 = players[1];

    let turnNumber = 0;

    function getPosition(clickPosition) {
        let position = clickPosition;
        let isFree = false;

        // Replace prompt with a button click on the physical gameboard
        // while (isFree === false) {
        //     position = prompt("Choose Position (Pick from gameboard template array)");
        //     checkMark(position);
        // }

        console.log("HERE");
        console.log(position);

        return position;

        // check if position marked already
        function checkMark(position) {
            for (let i = 0; i < gameboard.length; i++) {
                if (gameboard[i].position === position && gameboard[i].mark === "") {
                    isFree = true;
                }
            }
        }
    }

    function playerTurn(board, mark, position) {
        gameBoard.mark(board, mark, position);
        display();
        //Still using the outdated turnNumber
        //turnNumber++;
    }

    // A turn is a players turn to mark a valid position from the board
    // A turn only ends when either player gets a win condition
    // 9 turns max per game
    function turn(position, turnNumber) {
        display();

        // Mark  changes depending on turn Number
        //  (i.e.: Player1 === even numbers && Player2 === Odd Numbers)
        let mark = checkTurn(turnNumber);
        console.log(`FROM TURN(POSITION)\n\n${mark}`);

        if (mark === player1.mark) {
            playerTurn(gameboard, checkTurn(turnNumber), position);
            if (checkWin(gameboard) === true) {
                // Display Winner GUI
                console.log("WIN");
                gameScreen.refresh(gameboard, players);
                return true;
            }
        } else if (mark === player2.mark) {
            playerTurn(gameboard, checkTurn(turnNumber), getRandomPosition(gameboard));
            if (checkWin(gameboard) === true) {
                // Display Winner GUI
                console.log("WIN");
                gameScreen.refresh(gameboard, players);
                return true
            }
        } else {
            gameScreen.refresh(gameboard, players);
            return false;
        }

        gameScreen.refresh(gameboard, players);
    }

    function enemyTurn(turnNumber) {
        display();
        let mark = checkTurn(turnNumber++);

        console.log(`FROM TURN(POSITION)\n\n${mark}`);
        playerTurn(gameboard, checkTurn(turnNumber), getRandomPosition(gameboard));

        if (checkWin(gameboard) === true) {
            // Display Winner GUI
            console.log("WIN");
            gameScreen.refresh(gameboard, players);
            return true;
        }

        gameScreen.refresh(gameboard, players);
    }

    function checkTurn(turnNumber) {
        console.log(`checkTurn(${turnNumber})`);
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

    function getRandomPosition(board) {
        const freePositions = [];
        let randomPick;

        for (let i = 0; i < board.length; i++) {
            console.log(board[i]);
            if (board[i].mark === "") {
                console.log(board[i]);
                freePositions.push(board[i].position);

                randomPick = freePositions[Math.floor(Math.random() * freePositions.length)];
            }
        }

        console.log(freePositions);
        return randomPick;
    }

    function display() {
        // console.clear();
        gameBoard.display(gameboard);
        Players.display(players);
    }

    function play(mode) {
        let announce;
        switch (mode) {
            // Win by Three in a Row. No ties
            case "Normal": {
                while (player1.score < 3 && player2.score < 3) {
                    round();
                }
                console.log(checkChampion(player1.score, player2.score));
                break;
            }
            // Three Rounds. Winner has the biggest score in 3 rounds. Game may end in a Draw.
            case "3Rounds": {
                for (let i = 0; i < 3; i++) {
                    round();
                }
                console.log(checkChampion(player1.score, player2.score));
                break;
            }
        }
    }

    function round() {
        for (let i = 0; i < 9; i++) {
            turn();
            console.log(`Turn Number: ${turnNumber}`);
            if (checkWin(gameboard) === true) {
                break;
            }
        }

        turnNumber = 0;
        gameBoard.reset(gameboard);
    }

    // Check the Winner of a Play(Mode)
    //   --> which consist of many Round()s
    function checkChampion(player1, player2) {
        if (player1 > player2) {
            return "YOU WIN!";
        } else if (player1 < player2) {
            return "YOU LOSE!";
        } else {
            return "DRAW";
        }
    }

    // Check the Winner of a Round()
    function checkWin(board) {
        let horizontalTemp = [];
        let verticalTemp = [];
        let diagonalTemp = [];
        let result;

        scan(board);
        display(board);
        return result;

        function scan(board) {
            for (let i = 0; i < 9; i++) {
                if (horizontalTemp.length < 3) {
                    horizontalTemp.push(board[i]);
                }

                if (verticalTemp.length < 3) {
                    if (i === 0 || i === 1 || i === 2) {
                        verticalTemp.push(board[i]);
                        verticalTemp.push(board[i + 3]);
                        verticalTemp.push(board[i + 3 + 3]);
                    }
                }

                if (diagonalTemp.length < 3) {
                    if (i === 0) {
                        diagonalTemp.push(board[i]);
                        diagonalTemp.push(board[i + 4]);
                        diagonalTemp.push(board[i + 4 + 4]);
                    }

                    if (i === 2) {
                        diagonalTemp.push(board[i]);
                        diagonalTemp.push(board[i + 2]);
                        diagonalTemp.push(board[i + 2 + 2]);
                    }
                }

                if (horizontalTemp.length === 3) {
                    console.log("Horizontal Check");
                    result = isWin(horizontalTemp);

                    console.log(`isWin: ${result}`);

                    if (result === true) {
                        break;
                    } else {
                        horizontalTemp.length = 0;
                    }

                }

                if (verticalTemp.length === 3) {
                    console.log("Vertical Check");
                    result = isWin(verticalTemp);

                    console.log(`isWin: ${result}`);

                    if (result === true) {
                        break;
                    } else {
                        verticalTemp.length = 0;
                    }
                }

                if (diagonalTemp.length === 3) {
                    console.log("Diagonal Check");
                    result = isWin(diagonalTemp);

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
                if (temp[0].mark === temp[1].mark && temp[0].mark === temp[2].mark && temp[0].mark !== "") {
                    console.log("WIN");
                    score(temp[0].mark);
                    return true;
                }
                return false;

                function score(temp) {
                    if (temp === player1.mark) {
                        player1.score++;
                    } else if (temp === player2.mark) {
                        player2.score++;
                    }
                }
            }
        }

    }

    function testPosition(position) {
        let isFree = false;
        for (let i = 0; i < gameboard.length; i++) {
            if (gameboard[i].position === position && gameboard[i].mark === "") {

                isFree = true;
            } else {
                isFree = false;
            }
        }

        if (isFree === false) {
            console.log("FREE POSITION");
            console.log(`${position} is free and unmarked`);
        } else {
            console.log("POSITION NOT FREE");
        }
    }

    function start() {
        gameController.playerNaming(players);
        gameController.renderStart(gameboard, player1);
    }

    return {
        start,
        getPosition,
        turn,
        enemyTurn,
        turnNumber
    }
})();

gamePlay.start();

