package com.chungtoi;

public class MoveState extends State {

    public MoveState(ChungToi obj) {
        super(obj);
    }

    @Override
    public Winner position(Cell cell, Player player) {
        throw new Error("You can't position a piece now.");
    }

    @Override
    public Winner move(Cell beginCell, Cell endCell) {
        if (beginCell == null) {
            throw new Error("Origin parameter must not be null.");
        }
        if (endCell == null) {
            throw new Error("End parameter must not be null.");
        }
        Piece[][] board = this.game.getBoard();
        int or = beginCell.x(), oc = beginCell.y();
        Piece beginPiece = board[or][oc];
        if (beginPiece.getPlayer() == CellState.EMPTY) {
            throw new Error("Origin cell must not be empty.");
        }
        if ((this.game.getTurn() == Player.PLAYER1 && beginPiece.getPlayer() != CellState.PLAYER1) || (this.game.getTurn() == Player.PLAYER2 && beginPiece.getPlayer() != CellState.PLAYER2)) {
          throw new Error("It's not your turn.");
        }
        int dr = endCell.x(), dc = endCell.y();
        if (board[dr][dc].getPlayer() != CellState.EMPTY) {
            throw new Error("Destination cell must be empty.");
        }
        if ((beginPiece.getOrientation() == Orientation.ORTHOGONAL && or != dr && oc != dc) || (beginPiece.getOrientation() == Orientation.DIAGONAL && Math.abs(or - dr) != Math.abs(oc - dc))) {
            throw new Error("This move is invalid.");
        }
        this.game.setPositionedPiece(endCell);
        board[dr][dc] = board[or][oc];
        board[or][oc] = new Piece();
        this.game.change(new RotateState(this.game));
        return this.game.endOfGame();
    }

    @Override
    public void changeTurn() {
        this.game.setPositionedPiece(null);
        this.game.setTurn((this.game.getTurn() == Player.PLAYER1) ? Player.PLAYER2 : Player.PLAYER1);
    }
}
