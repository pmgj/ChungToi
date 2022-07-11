import Piece from "./Piece.js";
import Player from "./Player.js";
import Winner from "./Winner.js";
import CellState from "./CellState.js";
import PositionState from "./PositionState.js";

export default class ChungToi {
    constructor() {
        this.rows = 3;
        this.cols = 3;
        this.board = this.startBoard();
        this.turn = Player.PLAYER1;
        this.state = new PositionState(this);
        this.positionedPiece = null;
    }
    startBoard() {
        let matrix = [];
        for (let i = 0; i < this.rows; i++) {
            matrix.push([]);
            for (let j = 0; j < this.cols; j++) {
                matrix[i].push(new Piece());
            }
        }
        return matrix;
    }
    getBoard() {
        return this.board;
    }
    getTurn() {
        return this.turn;
    }
    move(beginCell, endCell) {
        return this.state.move(beginCell, endCell);
    }
    position(cell, player) {
        return this.state.position(cell, player);
    }
    rotate(cell) {
        this.state.rotate(cell);
    }
    change(newstate) {
        this.state = newstate;
    }
    changeTurn() {
        this.state.changeTurn();
    }
    endOfGame(matrix = this.board) {
        let testRow = (row) => {
            let p1 = matrix[row].every(x => x.player === CellState.PLAYER1);
            let p2 = matrix[row].every(x => x.player === CellState.PLAYER2);
            return p1 || p2;
        };
        for (let i = 0; i < this.rows; i++) {
            if (testRow(i)) {
                return matrix[i][0].player === CellState.PLAYER1 ? Winner.PLAYER1 : Winner.PLAYER2;
            }
        }
        let testColumn = (col) => {
            let p1 = matrix.map(a => a[col]).every(x => x.player === CellState.PLAYER1);
            let p2 = matrix.map(a => a[col]).every(x => x.player === CellState.PLAYER2);
            return p1 || p2;
        };
        for (let i = 0; i < this.cols; i++) {
            if (testColumn(i)) {
                return matrix[0][i].player === CellState.PLAYER1 ? Winner.PLAYER1 : Winner.PLAYER2;
            }
        }
        let testMainDiagonal = () => {
            let cells = [];
            for (let i = 0, max = this.rows; i < max; i++) {
                cells.push(matrix[i][i]);
            }
            let p1 = cells.every(x => x.player === CellState.PLAYER1);
            let p2 = cells.every(x => x.player === CellState.PLAYER2);
            return p1 || p2;
        };
        let testSecondDiagonal = () => {
            let cells = [];
            for (let i = 0, j = this.rows - 1, max = this.rows; i < max; i++, j--) {
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
}
