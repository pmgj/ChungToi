package com.chungtoi;

import java.util.function.Function;
import java.util.stream.Stream;

public class RotateState extends State {

    public RotateState(ChungToi obj) {
        super(obj);
    }

    @Override
    public Winner position(Cell cell, Player player) {
        throw new Error("You can't position a piece now.");
    }

    @Override
    public Winner move(Cell beginCell, Cell endCell) {
        throw new Error("You can't move a piece now.");
    }

    @Override
    public void changeTurn() {
        this.game.setPositionedPiece(null);
        this.game.setTurn((this.game.getTurn() == Player.PLAYER1) ? Player.PLAYER2 : Player.PLAYER1);
        Function<CellState, Long> count = v -> Stream.of(this.game.getBoard()).flatMap(Stream::of).filter(c -> c.getPlayer() == v).count();
        if (count.apply(CellState.PLAYER1) == this.game.getRows() && count.apply(CellState.PLAYER2) == this.game.getRows()) {
            this.game.change(new MoveState(this.game));
        } else {
            this.game.change(new PositionState(this.game));
        }
    }
}
