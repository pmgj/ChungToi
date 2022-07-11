import ChungToi from "./ChungToi.js";
import Cell from "./Cell.js";
import Player from "./Player.js";

function GUI() {
    let game = new ChungToi();
    let origin, choosePosition = false;
    function coordinates(cell) {
        return new Cell(cell.parentNode.rowIndex, cell.cellIndex);
    }
    function setErrors(message) {
        let msg = document.getElementById("errors");
        msg.textContent = message;
    }
    function setMessage(message) {
        let msg = document.getElementById("message");
        msg.textContent = message;
        setErrors("");
    }
    function changeMessage(m) {
        let objs = { PLAYER2: "Blue's win!", PLAYER1: "Red's win!" };
        if (objs[m]) {
            setMessage(`Game Over! ${objs[m]}`);
            disableMoves();
        } else {
            let msgs = { PLAYER1: "Red's turn.", PLAYER2: "Blue's turn." };
            setMessage(msgs[game.getTurn()]);
        }
    }
    function disableMoves() {
        let cells = document.querySelectorAll("#board td");
        cells.forEach(c => {
            c.onclick = undefined;
            c.oncontextmenu = undefined;
        });
    }
    function enableMoves() {
        let cells = document.querySelectorAll("#board td");
        cells.forEach(c => c.onclick = move);
    }
    function move() {
        try {
            if (choosePosition) {
                if (this.firstChild) {
                    choosePosition = false;
                    game.changeTurn();
                    changeMessage();
                }
            } else if (origin) {
                origin.className = "unselected";
                let w = game.move(coordinates(origin), coordinates(this));
                changeMessage(w);
                this.appendChild(origin.firstChild);
                choosePosition = true;
                origin = null;
            } else {
                origin = this;
                origin.className = "selected";
                choosePosition = false;
            }
        } catch (ex) {
            setErrors(ex.message);
            origin = null;
        }
    }
    function play() {
        try {
            if (origin) {
                let w = game.position(coordinates(this), origin.firstChild.player);
                this.appendChild(origin.firstChild);
                changeMessage(w);
                origin.className = "";
                origin = null;
                choosePosition = true;
            } else if (choosePosition && this.firstChild) {
                game.changeTurn();
                changeMessage();
                startMovingPieces();
                choosePosition = false;
            }
        } catch (ex) {
            setErrors(ex.message);
        }
    }
    function startMovingPieces() {
        let pieces1 = document.querySelectorAll("#pieces1 img");
        let pieces2 = document.querySelectorAll("#pieces2 img");
        if (pieces1.length === 0 && pieces2.length === 0) {
            enableMoves();
        }
    }
    function select() {
        if (this === origin) {
            origin.className = "";
            origin = null;
        } else {
            clearSelectedPieces();
            origin = this;
            choosePosition = false;
            origin.className = "selected";
            setErrors("");
        }
    }
    function clearSelectedPieces() {
        let pieces1 = document.querySelectorAll("#pieces1 td");
        pieces1.forEach(p => p.className = "");
        let pieces2 = document.querySelectorAll("#pieces2 td");
        pieces2.forEach(p => p.className = "");
    }
    function rotate(evt) {
        evt.preventDefault();
        try {
            let img = this.firstChild;
            if (img) {
                game.rotate(coordinates(this));
                choosePosition = false;
                if (img.style.transform === "rotate(45deg)") {
                    let anim = img.animate([{ transform: 'rotate(45deg)' }, { transform: 'rotate(0)' }], 1000);
                    anim.onfinish = () => img.style.transform = "rotate(0)";
                } else {
                    let anim = img.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(45deg)' }], 1000);
                    anim.onfinish = () => img.style.transform = "rotate(45deg)";
                }
                startMovingPieces();
            }
            changeMessage();
        } catch (ex) {
            setErrors(ex.message);
        }
    }
    function init() {
        let board = game.getBoard();
        let add = n => {
            let tbody = document.querySelector(`#pieces${n} tbody`);
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            let img = document.createElement("img");
            img.src = `images/Piece${n}.svg`;
            img.player = n === 1 ? Player.PLAYER1 : Player.PLAYER2;
            td.appendChild(img);
            td.onclick = select;
            tr.appendChild(td);
            tbody.appendChild(tr);
        };
        let tbody = document.querySelector("#board tbody");
        for (let i = 0; i < board.length; i++) {
            let tr = document.createElement("tr");
            for (let j = 0; j < board[0].length; j++) {
                let td = document.createElement("td");
                td.className = "unselected";
                td.onclick = play;
                td.oncontextmenu = rotate;
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
            add(1);
            add(2);
        }
        document.oncontextmenu = evt => evt.preventDefault();
        changeMessage();
    }
    return { init };
}
let gui = new GUI();
gui.init();