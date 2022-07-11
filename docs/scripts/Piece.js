import CellState from "./CellState.js";
import Orientation from "./Orientation.js";

export default class Piece {
    constructor(p = CellState.EMPTY, o = Orientation.ORTHOGONAL) {
        this.player = p;
        this.orientation = o;
    }
}