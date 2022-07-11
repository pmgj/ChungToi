import Piece from "./Piece.js";
import Player from "./Player.js";
import Winner from "./Winner.js";
import CellState from "./CellState.js";
import Position from "./Position.js";
import State from "./State.js";

export default function ChungToi() {
    const rows = 3;
    const cols = 3;
    let board = startBoard();
    let turn = Player.PLAYER1;
    let state = State.POSITION;
    let positionedPiece;
    function startBoard() {
        let matrix = [];
        for (let i = 0; i < rows; i++) {
            matrix.push([]);
            for (let j = 0; j < cols; j++) {
                matrix[i].push(new Piece());
            }
        }
        return matrix;
    }
    function getBoard() {
        return board;
    }
    function getTurn() {
        return turn;
    }
    function move(beginCell, endCell) {
        if (state !== State.MOVE) {
            throw new Error("You can't move a piece now.");
        }
        if (!beginCell) {
            throw new Error("Origin must have a piece.");
        }
        let { x: or, y: oc } = beginCell;
        let beginPiece = board[or][oc];
        if (beginPiece.player !== turn) {
            throw new Error("It's not your turn.");
        }
        let { x: dr, y: dc } = endCell;
        if (board[dr][dc].player !== CellState.EMPTY) {
            throw new Error("Destination cell must be empty.");
        }
        if ((beginPiece.position === Position.ORTHOGONAL && or !== dr && oc !== dc) || (beginPiece.position === Position.DIAGONAL && Math.abs(or - dr) !== Math.abs(oc - dc))) {
            throw new Error("This move is invalid.");
        }
        positionedPiece = endCell;
        board[dr][dc] = board[or][oc];
        board[or][oc] = new Piece();
        state = State.ROTATE;
        return endOfGame();
    }
    function position(cell, player) {
        if (state !== State.POSITION) {
            throw new Error("You can't position a piece now.");
        }
        let { x, y } = cell;
        if (turn !== player) {
            throw new Error("It's not your turn.");
        }
        if (board[x][y].player !== CellState.EMPTY) {
            throw new Error("Cell must be empty.");
        }
        positionedPiece = cell;
        board[x][y].player = player === Player.PLAYER1 ? CellState.PLAYER1 : CellState.PLAYER2;
        state = State.ROTATE;
        return endOfGame();
    }
    function rotate(cell) {
        if (state !== State.ROTATE && state !== State.MOVE) {
            throw new Error("You can't rotate now.");
        }
        let { x, y } = cell;
        let piece = board[x][y];
        if (turn !== piece.player) {
            throw new Error("You can't rotate an opponent's piece.");
        }
        if (positionedPiece && !cell.equals(positionedPiece)) {
            throw new Error("You can only rotate the recently moved piece.");
        }
        piece.position = piece.position === Position.ORTHOGONAL ? Position.DIAGONAL : Position.ORTHOGONAL;
        changeTurn();
    }
    function changeTurn() {
        if (state === State.POSITION) {
            throw new Error("You must position a piece in the board.");
        }
        positionedPiece = null;
        turn = (turn === Player.PLAYER1) ? Player.PLAYER2 : Player.PLAYER1;
        let count = v => board.flat().filter(c => c.player === v).length;
        if (count(CellState.PLAYER1) === rows && count(CellState.PLAYER2) === rows) {
            state = State.MOVE;
        } else {
            state = State.POSITION;
        }
    }
    function endOfGame(matrix = board) {
        let testRow = (row) => {
            let p1 = matrix[row].every(x => x.player === CellState.PLAYER1);
            let p2 = matrix[row].every(x => x.player === CellState.PLAYER2);
            return p1 || p2;
        };
        for (let i = 0; i < rows; i++) {
            if (testRow(i)) {
                return matrix[i][0].player === CellState.PLAYER1 ? Winner.PLAYER1 : Winner.PLAYER2;
            }
        }
        let testColumn = (col) => {
            let p1 = matrix.map(a => a[col]).every(x => x.player === CellState.PLAYER1);
            let p2 = matrix.map(a => a[col]).every(x => x.player === CellState.PLAYER2);
            return p1 || p2;
        };
        for (let i = 0; i < cols; i++) {
            if (testColumn(i)) {
                return matrix[0][i].player === CellState.PLAYER1 ? Winner.PLAYER1 : Winner.PLAYER2;
            }
        }
        let testMainDiagonal = () => {
            let cells = [];
            for (let i = 0, max = rows; i < max; i++) {
                cells.push(matrix[i][i]);
            }
            let p1 = cells.every(x => x.player === CellState.PLAYER1);
            let p2 = cells.every(x => x.player === CellState.PLAYER2);
            return p1 || p2;
        };
        let testSecondDiagonal = () => {
            let cells = [];
            for (let i = 0, j = rows - 1, max = rows; i < max; i++, j--) {
                cells.push(matrix[i][j]);
            }
            let p1 = cells.every(x => x.player === CellState.PLAYER1);
            let p2 = cells.every(x => x.player === CellState.PLAYER2);
            return p1 || p2;
        };
        if (testMainDiagonal() || testSecondDiagonal()) {
            return matrix[1][1].player === CellState.PLAYER1 ? Winner.PLAYER1 : Winner.PLAYER2;
        }
        return Winner.NONE;
    }
    return { getBoard, getTurn, move, position, rotate, changeTurn };
}
