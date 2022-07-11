import CellState from "./CellState.js";
import Player from "./Player.js";
import RotateState from "./RotateState.js";
import State from "./State.js";

export default class PositionState extends State {
    constructor(obj) {
        super(obj);
    }
    position(cell, player) {
        if (this.game.getTurn() !== player) {
            throw new Error("It's not your turn.");
        }
        let { x, y } = cell;
        if (this.game.board[x][y].player !== CellState.EMPTY) {
            throw new Error("Cell must be empty.");
        }
        this.game.positionedPiece = cell;
        this.game.board[x][y].player = player === Player.PLAYER1 ? CellState.PLAYER1 : CellState.PLAYER2;
        this.game.change(new RotateState(this.game));
        return this.game.endOfGame();
    }
    rotate() {
        throw new Error("You can't rotate a piece now.");
    }
    move() {
        throw new Error("You can't move a piece now.");
    }
    changeTurn() {
        throw new Error("You must position a piece in the board.");
    }
}
