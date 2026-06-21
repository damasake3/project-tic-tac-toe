const gameBoard = (() => {

    // THE GAMEBOARD
    //       *  |  *  |  *    1. Positions are exactly how it says in template = [{ postion:"position",... }
    //     -----+-----+-----        * This is for mine own readability
    //       *  |  *  |  *    2. Marks are either "O" or "X"
    //     -----+-----+-----
    //       *  |  *  |  *   

    const template =  [
        { position: "top-left", mark: "" }, { position: "top-center", mark: "" }, { position: "top-right", mark: "" },
        { position: "center-left", mark: "" }, { position: "center-center", mark: "" }, { position: "center-right", mark: "" },
        { position: "bottom-left", mark: "" }, { position: "bottom-center", mark: "" }, { position: "bottom-right", mark: "" }
    ]

    const testTemplate = [
        { position: "top-left", mark: "X" }, { position: "top-center", mark: "X" }, { position: "top-right", mark: "O" },
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

    function display(board) {
        let temp = [];
        const between = "-----+-----+-----";

        function check (boardMark){
            if (boardMark === "") {
                return "*";
            }
            else {
                return boardMark;
            }
        }

        // display by 3s in all rows followed by a in-betweener per row
        //  - thru temp[], pushed, emptied it out then repeated as shown below
        function create (board) {
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

// Transfer these to the `Game=(()=>{})();` or `Player=(()=>{})();`later, if applicable. 
const gameboard = gameBoard.init();
gameBoard.display(gameboard);

console.log("\n");

gameBoard.reset(gameboard);
gameBoard.display(gameboard);

console.log("\n");

gameBoard.mark(gameboard, "X", "center-center");
gameBoard.display(gameboard);
