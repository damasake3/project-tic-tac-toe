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

    function display(board) {
        let top, center, bot;
        const between = "-----+-----+-----";

        console.log(between);
        console.log(`  ${check(board[0].mark)}  |  ${check(board[1].mark)}  |  ${check(board[2].mark)}  `);
        console.log(between);
        console.log(`  ${check(board[3].mark)}  |  ${check(board[4].mark)}  |  ${check(board[5].mark)}  `);
        console.log(between);
        console.log(`  ${check(board[6].mark)}  |  ${check(board[7].mark)}  |  ${check(board[8].mark)}  `);

        function check (boardMark){
            if (boardMark === "") {
                return "*";
            }
            else {
                return boardMark;
            }
        }

    }

    return {
        init,
        display
    }
    
})();

// Transfer these to the `Game=(()=>{})();` or `Player=(()=>{})();`later, if applicable. 
const gameboard = gameBoard.init();
console.log(gameboard);

gameBoard.display(gameboard);

