import CellState from "./CellState.js";
import Player from "./Player.js";
import PositionState from "./PositionState.js";
import MoveState from "./MoveState.js";
import State from "./State.js";

export default class RotateState extends State {
    constructor(obj) {
        super(obj);
    }
    position() {
        throw new Error("You can't position a piece now.");
    }
    move() {
        throw new Error("You can't move a piece now.");
    }
    changeTurn() {
        this.game.positionedPiece = null;
        this.game.turn = (this.game.turn === Player.PLAYER1) ? Player.PLAYER2 : Player.PLAYER1;
        let count = v => this.game.board.flat().filter(c => c.player === v).length;
        if (count(CellState.PLAYER1) === this.game.rows && count(CellState.PLAYER2) === this.game.rows) {
            this.game.change(new MoveState(this.game));
        } else {
            this.game.change(new PositionState(this.game));
        }
    }
}
