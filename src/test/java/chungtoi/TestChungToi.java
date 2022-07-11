package chungtoi;

import java.util.Arrays;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import com.chungtoi.Cell;
import com.chungtoi.ChungToi;
import com.chungtoi.Piece;
import com.chungtoi.Player;
import com.chungtoi.Winner;

public class TestChungToi {

    @Test
    public void testMove() {
        ChungToi ct = new ChungToi();
        Winner m;

        m = ct.position(new Cell(0, 0), Player.PLAYER1);
        Assertions.assertEquals(Winner.NONE, m);

        try {
            ct.position(new Cell(0, 1), Player.PLAYER1);
            Assertions.fail();
        } catch (Error ex) {
        }

        try {
            ct.position(new Cell(0, 1), Player.PLAYER2);
            Assertions.fail();
        } catch (Error ex) {
        }

        try {
            ct.move(new Cell(0, 0), new Cell(0, 1));
            Assertions.fail();
        } catch (Error ex) {
        }

        try {
            ct.rotate(new Cell(1, 0));
            Assertions.fail();
        } catch (Error ex) {
        }

        ct.rotate(new Cell(0, 0));

        try {
            ct.changeTurn();
            Assertions.fail();
        } catch (Error ex) {
        }

        m = ct.position(new Cell(0, 1), Player.PLAYER2);
        Assertions.assertEquals(Winner.NONE, m);

        try {
            ct.position(new Cell(0, 2), Player.PLAYER1);
            Assertions.fail();
        } catch (Error ex) {
        }

        try {
            ct.position(new Cell(0, 2), Player.PLAYER2);
            Assertions.fail();
        } catch (Error ex) {
        }

        try {
            ct.move(new Cell(0, 1), new Cell(0, 2));
            Assertions.fail();
        } catch (Error ex) {
        }

        try {
            ct.move(new Cell(0, 0), new Cell(1, 0));
            Assertions.fail();
        } catch (Error ex) {
        }

        try {
            ct.rotate(new Cell(0, 0));
            Assertions.fail();
        } catch (Error ex) {
        }

        ct.changeTurn();

        m = ct.position(new Cell(0, 2), Player.PLAYER1);
        Assertions.assertEquals(Winner.NONE, m);

        ct.rotate(new Cell(0, 2));

        m = ct.position(new Cell(1, 0), Player.PLAYER2);
        Assertions.assertEquals(Winner.NONE, m);

        ct.changeTurn();

        m = ct.position(new Cell(1, 1), Player.PLAYER1);
        Assertions.assertEquals(Winner.NONE, m);

        ct.changeTurn();

        m = ct.position(new Cell(1, 2), Player.PLAYER2);
        Assertions.assertEquals(Winner.NONE, m);

        ct.rotate(new Cell(1, 2));

        try {
            ct.move(new Cell(1, 0), new Cell(2, 0));
            Assertions.fail();
        } catch (Error ex) {
        }

        try {
            ct.move(new Cell(0, 0), new Cell(2, 1));
            Assertions.fail();
        } catch (Error ex) {
        }

        m = ct.move(new Cell(0, 0), new Cell(2, 2));
        Assertions.assertEquals(Winner.NONE, m);

        ct.rotate(new Cell(2, 2));

        m = ct.move(new Cell(0, 1), new Cell(2, 1));
        Assertions.assertEquals(Winner.NONE, m);

        ct.changeTurn();

        ct.rotate(new Cell(0, 2));

        m = ct.move(new Cell(1, 2), new Cell(0, 1));
        Assertions.assertEquals(Winner.NONE, m);

        ct.changeTurn();

        m = ct.move(new Cell(0, 2), new Cell(0, 0));
        Assertions.assertEquals(Winner.PLAYER1, m);

        for (Piece[] row : ct.getBoard()) {
            System.out.println(Arrays.toString(row));
        }
    }
}
