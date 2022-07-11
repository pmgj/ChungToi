package com.chungtoi;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ChungToi {

    private final int rows = 3;

    private final int cols = 3;

    private final Piece[][] board = this.startBoard();

    private Player turn = Player.PLAYER1;

    private State state = new PositionState(this);

    private Cell positionedPiece = null;

    public Piece[][] startBoard() {
        Piece[][] matrix = new Piece[this.rows][this.cols];
        for (int i = 0; i < this.rows; i++) {
            for (int j = 0; j < this.cols; j++) {
                matrix[i][j] = new Piece();
            }
        }
        return matrix;
    }

    public Piece[][] getBoard() {
        return board;
    }

    public Player getTurn() {
        return turn;
    }

    public void setTurn(Player turn) {
        this.turn = turn;
    }

    public Cell getPositionedPiece() {
        return positionedPiece;
    }

    public int getRows() {
        return rows;
    }

    public void setPositionedPiece(Cell positionedPiece) {
        this.positionedPiece = positionedPiece;
    }
    
    public Winner move(Cell beginCell, Cell endCell) {
        return this.state.move(beginCell, endCell);
    }
    
    public Winner position(Cell cell, Player player) {
        return this.state.position(cell, player);
    }

    public void rotate(Cell cell) {
        this.state.rotate(cell);
    }

    public void change(State newstate) {
        this.state = newstate;
    }

    public void changeTurn() {
        this.state.changeTurn();
    }

    public Winner endOfGame() {
        return endOfGame(this.board);
    }
    
    public Winner endOfGame(Piece[][] matrix) {
        for (int i = 0; i < board.length; i++) {
            if (this.testRow(i)) {
                return board[i][0].getPlayer() == CellState.PLAYER1 ? Winner.PLAYER1 : Winner.PLAYER2;
            }
        }
        for (int i = 0; i < board[0].length; i++) {
            if (this.testColumn(i)) {
                return board[0][i].getPlayer() == CellState.PLAYER1 ? Winner.PLAYER1 : Winner.PLAYER2;
            }
        }
        if (this.testMainDiagonal() || this.testSecondDiagonal()) {
            return board[1][1].getPlayer() == CellState.PLAYER1 ? Winner.PLAYER1 : Winner.PLAYER2;
        }
        return Winner.NONE;
    }

    private boolean testRow(int row) {
        boolean p1 = Arrays.stream(board[row]).allMatch(x -> x.getPlayer() == CellState.PLAYER1);
        boolean p2 = Arrays.stream(board[row]).allMatch(x -> x.getPlayer() == CellState.PLAYER2);
        return p1 || p2;
    }

    private boolean testColumn(int col) {
        boolean p1 = Arrays.stream(board).map(a -> a[col]).allMatch(x -> x.getPlayer() == CellState.PLAYER1);
        boolean p2 = Arrays.stream(board).map(a -> a[col]).allMatch(x -> x.getPlayer() == CellState.PLAYER2);
        return p1 || p2;
    }

    private boolean testMainDiagonal() {
        List<Piece> cells = new ArrayList<>();
        for (int i = 0, max = board.length; i < max; i++) {
            cells.add(board[i][i]);
        }
        boolean p1 = cells.stream().allMatch(x -> x.getPlayer() == CellState.PLAYER1);
        boolean p2 = cells.stream().allMatch(x -> x.getPlayer() == CellState.PLAYER2);
        return p1 || p2;
    }

    private boolean testSecondDiagonal() {
        List<Piece> cells = new ArrayList<>();
        for (int i = 0, j = board.length - 1, max = board.length; i < max; i++, j--) {
            cells.add(board[i][j]);
        }
        boolean p1 = cells.stream().allMatch(x -> x.getPlayer() == CellState.PLAYER1);
        boolean p2 = cells.stream().allMatch(x -> x.getPlayer() == CellState.PLAYER2);
        return p1 || p2;
    }
}
