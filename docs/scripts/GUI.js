import ChungToi from "./ChungToi.js";
import Cell from "./Cell.js";
import Player from "./Player.js";

class GUI {
    constructor() {
        this.game = new ChungToi();
        this.origin = null;
        this.choosePosition = false;    
    }
    coordinates(cell) {
        return new Cell(cell.parentNode.rowIndex, cell.cellIndex);
    }
    setErrors(message) {
        let msg = document.getElementById("errors");
        msg.textContent = message;
    }
    setMessage(message) {
        let msg = document.getElementById("message");
        msg.textContent = message;
        this.setErrors("");
    }
    changeMessage(m) {
        let objs = { PLAYER2: "Blue's win!", PLAYER1: "Red's win!" };
        if (objs[m]) {
            this.setMessage(`Game Over! ${objs[m]}`);
            this.disableMoves();
        } else {
            let msgs = { PLAYER1: "Red's turn.", PLAYER2: "Blue's turn." };
            this.setMessage(msgs[this.game.getTurn()]);
        }
    }
    disableMoves() {
        let cells = document.querySelectorAll("#board td");
        cells.forEach(c => {
            c.onclick = undefined;
            c.oncontextmenu = undefined;
        });
    }
    enableMoves() {
        let cells = document.querySelectorAll("#board td");
        cells.forEach(c => c.onclick = this.move.bind(this));
    }
    move(evt) {
        let td = evt.currentTarget;
        try {
            if (this.choosePosition) {
                if (td.firstChild) {
                    this.choosePosition = false;
                    this.game.changeTurn();
                    this.changeMessage();
                }
            } else if (this.origin) {
                this.origin.className = "unselected";
                let w = this.game.move(this.coordinates(this.origin), this.coordinates(td));
                this.changeMessage(w);
                td.appendChild(this.origin.firstChild);
                this.choosePosition = true;
                this.origin = null;
            } else {
                this.origin = td;
                this.origin.className = "selected";
                this.choosePosition = false;
            }
        } catch (ex) {
            this.setErrors(ex.message);
            this.origin = null;
        }
    }
    play(evt) {
        let td = evt.currentTarget;
        try {
            if (this.origin) {
                let w = this.game.position(this.coordinates(td), this.origin.firstChild.player);
                td.appendChild(this.origin.firstChild);
                this.changeMessage(w);
                this.origin.className = "";
                this.origin = null;
                this.choosePosition = true;
            } else if (this.choosePosition && td.firstChild) {
                this.game.changeTurn();
                this.changeMessage();
                this.startMovingPieces();
                this.choosePosition = false;
            }
        } catch (ex) {
            this.setErrors(ex.message);
        }
    }
    startMovingPieces() {
        let pieces1 = document.querySelectorAll("#pieces1 img");
        let pieces2 = document.querySelectorAll("#pieces2 img");
        if (pieces1.length === 0 && pieces2.length === 0) {
            this.enableMoves();
        }
    }
    select(evt) {
        let td = evt.currentTarget;
        if (td === this.origin) {
            this.origin.className = "";
            this.origin = null;
        } else {
            this.clearSelectedPieces();
            this.origin = td;
            this.choosePosition = false;
            this.origin.className = "selected";
            this.setErrors("");
        }
    }
    clearSelectedPieces() {
        let pieces1 = document.querySelectorAll("#pieces1 td");
        pieces1.forEach(p => p.className = "");
        let pieces2 = document.querySelectorAll("#pieces2 td");
        pieces2.forEach(p => p.className = "");
    }
    rotate(evt) {
        evt.preventDefault();
        try {
            let td = evt.currentTarget;
            let img = td.firstChild;
            if (img) {
                this.game.rotate(this.coordinates(td));
                this.choosePosition = false;
                if (img.style.transform === "rotate(45deg)") {
                    let anim = img.animate([{ transform: 'rotate(45deg)' }, { transform: 'rotate(0)' }], 1000);
                    anim.onfinish = () => img.style.transform = "rotate(0)";
                } else {
                    let anim = img.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(45deg)' }], 1000);
                    anim.onfinish = () => img.style.transform = "rotate(45deg)";
                }
                this.startMovingPieces();
            }
            this.changeMessage();
        } catch (ex) {
            this.setErrors(ex.message);
        }
    }
    init() {
        let board = this.game.getBoard();
        let add = n => {
            let tbody = document.querySelector(`#pieces${n} tbody`);
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            let img = document.createElement("img");
            img.src = `images/Piece${n}.svg`;
            img.player = n === 1 ? Player.PLAYER1 : Player.PLAYER2;
            td.appendChild(img);
            td.onclick = this.select.bind(this);
            tr.appendChild(td);
            tbody.appendChild(tr);
        };
        let tbody = document.querySelector("#board tbody");
        for (let i = 0; i < board.length; i++) {
            let tr = document.createElement("tr");
            for (let j = 0; j < board[0].length; j++) {
                let td = document.createElement("td");
                td.className = "unselected";
                td.onclick = this.play.bind(this);
                td.oncontextmenu = this.rotate.bind(this);
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
            add(1);
            add(2);
        }
        document.oncontextmenu = evt => evt.preventDefault();
        this.changeMessage();
    }
}
let gui = new GUI();
gui.init();