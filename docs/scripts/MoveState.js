import CellState from "./CellState.js";
import Player from "./Player.js";
import Orientation from "./Orientation.js";
import Piece from "./Piece.js";
import RotateState from "./RotateState.js";
import State from "./State.js";

export default class MoveState extends State {
    constructor(obj) {
        super(obj);
    }
    position() {
        throw new Error("You can't position a piece now.");
    }
    move(beginCell, endCell) {
        if (!beginCell) {
            throw new Error("Origin parameter must not be null.");
        }
        if (!endCell) {
            throw new Error("End parameter must not be null.");
        }
        let board = this.game.getBoard();
        let { x: or, y: oc } = beginCell;
        let beginPiece = board[or][oc];
        if (beginPiece.player === CellState.EMPTY) {
            throw new Error("Origin cell must not be empty.");
        }
        if (beginPiece.player !== this.game.getTurn()) {
            throw new Error("It's not your turn.");
        }
        let { x: dr, y: dc } = endCell;
        if (board[dr][dc].player !== CellState.EMPTY) {
            throw new Error("Destination cell must be empty.");
        }
        if ((beginPiece.orientation === Orientation.ORTHOGONAL && or !== dr && oc !== dc) || (beginPiece.orientation === Orientation.DIAGONAL && Math.abs(or - dr) !== Math.abs(oc - dc))) {
            throw new Error("This move is invalid.");
        }
        this.game.positionedPiece = endCell;
        board[dr][dc] = board[or][oc];
        board[or][oc] = new Piece();
        this.game.change(new RotateState(this.game));
        return this.game.endOfGame();
    }
    changeTurn() {
        this.game.positionedPiece = null;
        this.game.turn = (this.game.turn === Player.PLAYER1) ? Player.PLAYER2 : Player.PLAYER1;
    }
}
