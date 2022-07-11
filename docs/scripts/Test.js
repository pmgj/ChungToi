import ChungToi from "./ChungToi.js";
import Cell from "./Cell.js";
import Player from "./Player.js";
import Winner from "./Winner.js";

function exception(f) {
    try {
        f();
        console.assert(false);
    } catch (ex) {
    }
}

let ct = new ChungToi();
console.assert(ct.position(new Cell(0, 0), Player.PLAYER1) === Winner.NONE);
exception(() => ct.position(new Cell(0, 1), Player.PLAYER1));
exception(() => ct.position(new Cell(0, 1), Player.PLAYER2));
exception(() => ct.move(new Cell(0, 0), new Cell(0, 1)));
exception(() => ct.rotate(new Cell(1, 0)));
ct.rotate(new Cell(0, 0));
exception(() => ct.changeTurn());
console.assert(ct.position(new Cell(0, 1), Player.PLAYER2) === Winner.NONE);
exception(() => ct.position(new Cell(0, 2), Player.PLAYER1));
exception(() => ct.position(new Cell(0, 2), Player.PLAYER2));
exception(() => ct.move(new Cell(0, 1), new Cell(0, 2)));
exception(() => ct.move(new Cell(0, 0), new Cell(1, 0)));
exception(() => ct.rotate(new Cell(0, 0)));
ct.changeTurn();
console.assert(ct.position(new Cell(0, 2), Player.PLAYER1) === Winner.NONE);
ct.rotate(new Cell(0, 2));
console.assert(ct.position(new Cell(1, 0), Player.PLAYER2) === Winner.NONE);
ct.changeTurn();
console.assert(ct.position(new Cell(1, 1), Player.PLAYER1) === Winner.NONE);
ct.changeTurn();
console.assert(ct.position(new Cell(1, 2), Player.PLAYER2) === Winner.NONE);
ct.rotate(new Cell(1, 2));
exception(() => ct.move(new Cell(1, 0), new Cell(2, 0)));
exception(() => ct.move(new Cell(0, 0), new Cell(2, 1)));
console.assert(ct.move(new Cell(0, 0), new Cell(2, 2)) === Winner.NONE);
ct.rotate(new Cell(2, 2));
console.assert(ct.move(new Cell(0, 1), new Cell(2, 1)) === Winner.NONE);
ct.changeTurn();
ct.rotate(new Cell(0, 2));
console.assert(ct.move(new Cell(1, 2), new Cell(0, 1)) === Winner.NONE);
ct.changeTurn();
console.assert(ct.move(new Cell(0, 2), new Cell(0, 0)) === Winner.PLAYER1);
console.table(ct.getBoard());
