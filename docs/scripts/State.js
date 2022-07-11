import Orientation from "./Orientation.js";

export default class State {
    constructor(obj) {
        this.game = obj;
    }
    rotate(cell) {
        let { x, y } = cell;
        let piece = this.game.board[x][y];
        if (this.game.getTurn() !== piece.player) {
            throw new Error("You can't rotate an opponent's piece.");
        }
        if (this.game.positionedPiece && !cell.equals(this.game.positionedPiece)) {
            throw new Error("You can only rotate the recently moved piece.");
        }
        piece.orientation = piece.orientation === Orientation.ORTHOGONAL ? Orientation.DIAGONAL : Orientation.ORTHOGONAL;
        this.changeTurn();
    }
}
