import CellState from "./CellState.js";
import Position from "./Position.js";

export default class Piece {
    constructor(p = CellState.EMPTY, po = Position.ORTHOGONAL) {
        this.player = p;
        this.position = po;
    }
}