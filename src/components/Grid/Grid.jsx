import { useState } from "react";
import Card from "../Card/Card";
import './Grid.css';
import isWinner from "../../helper/checkWinner";

function Grid({numberOfCards}) {
    const [board, setBoard] = useState(Array(numberOfCards).fill(""));
    const [turn, setTurn] = useState(true);  // true: O's turn, false: X's turn
    const [winner, setWinner] = useState(null);

    function play(index) {
        if (board[index] !== "") return; // Avoid playing on an already-filled square

        const newBoard = [...board];
        newBoard[index] = turn ? 'O' : 'X';
        setBoard(newBoard);

        const currentPlayer = turn ? 'O' : 'X';
        const win = isWinner(newBoard, currentPlayer);

        if (win) {
            setWinner(win);  // Set the winner
        }

        setTurn(!turn); // Switch turns
    }

    function reset() {
        setTurn(true); // O's turn starts first
        setWinner(null); // No winner
        setBoard(Array(numberOfCards).fill("")); // Empty board
    }

    return (
        <div className="grid-wrapper">
            {winner && (
                <>
                    <h1 className="turn-highlight">Winner is: {winner}</h1>
                    <button className="reset" onClick={reset}>Reset game</button>
                </>
            )}
            <h1 className="turn-highlight">Current Turn: {(turn) ? 'O' : 'X'}</h1>
            <div className="grid">
                {board.map((el, idx) => (
                    <Card key={idx} gameEnd={winner ? true : false} onPlay={play} player={el} index={idx} />
                ))}
            </div>
        </div>
    );
}
export default Grid;