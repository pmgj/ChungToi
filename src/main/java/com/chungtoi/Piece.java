package com.chungtoi;

public class Piece {
    
    private CellState player;
    private Orientation orientation;
    
    public Piece() {
        this.player = CellState.EMPTY;
        this.orientation = Orientation.ORTHOGONAL;
    }    

    public CellState getPlayer() {
        return player;
    }

    public void setPlayer(CellState player) {
        this.player = player;
    }

    public Orientation getOrientation() {
        return orientation;
    }

    public void setOrientation(Orientation orientation) {
        this.orientation = orientation;
    }

    @Override
    public String toString() {
        return String.format("(%s %s)", this.player, this.orientation);
    }
}
