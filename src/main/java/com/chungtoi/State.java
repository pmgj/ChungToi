package com.chungtoi;

public abstract class State {

    protected ChungToi game;

    public State(ChungToi obj) {
        this.game = obj;
    }

    public void rotate(Cell cell) {
        int x = cell.x(), y = cell.y();
        Piece piece = this.game.getBoard()[x][y];
        if ((this.game.getTurn() == Player.PLAYER1 && piece.getPlayer() != CellState.PLAYER1) || (this.game.getTurn() == Player.PLAYER2 && piece.getPlayer() != CellState.PLAYER2)) {
            throw new Error("You can't rotate an opponent's piece.");
        }
        if (this.game.getPositionedPiece() != null && !cell.equals(this.game.getPositionedPiece())) {
            throw new Error("You can only rotate the recently moved piece.");
        }
        piece.setOrientation(piece.getOrientation() == Orientation.ORTHOGONAL ? Orientation.DIAGONAL : Orientation.ORTHOGONAL);
        this.changeTurn();
    }
    
    protected abstract void changeTurn();
    protected abstract Winner move(Cell beginCell, Cell endCell);
    protected abstract Winner position(Cell cell, Player player);
}
