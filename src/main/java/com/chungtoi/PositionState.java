package com.chungtoi;

public class PositionState extends State {

    public PositionState(ChungToi obj) {
        super(obj);
    }

    @Override
    public Winner position(Cell cell, Player player) {
        if (this.game.getTurn() != player) {
            throw new Error("It's not your turn.");
        }
        int x = cell.getX(), y = cell.getY();
        if (this.game.getBoard()[x][y].getPlayer() != CellState.EMPTY) {
            throw new Error("Cell must be empty.");
        }
        this.game.setPositionedPiece(cell);
        this.game.getBoard()[x][y].setPlayer(player == Player.PLAYER1 ? CellState.PLAYER1 : CellState.PLAYER2);
        this.game.change(new RotateState(this.game));
        return this.game.endOfGame();
    }

    @Override
    public void rotate(Cell cell) {
        throw new Error("You can't rotate a piece now.");
    }

    @Override
    public Winner move(Cell beginCell, Cell endCell) {
        throw new Error("You can't move a piece now.");
    }

    @Override
    public void changeTurn() {
        throw new Error("You must position a piece in the board.");
    }
}
