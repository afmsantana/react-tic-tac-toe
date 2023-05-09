import Square from "../Square";
import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";

export default function GameBoard({ xIsNext, squares, onPlay, setGameEnded }) {

    const context = useContext(GameContext)

    function handleClick(i,j) {
        if (calculateWinner(squares) || squares[3 * i + j]) {
          return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
          nextSquares[3 * i + j] = "X";
        } else {
          nextSquares[3 * i + j] = "O";
        }
        onPlay(nextSquares,'(' + i + ',' + j + ')');
    }

    function calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [squares[a],lines[i]];
          }
        }
        return null;
    }

    context.winner = calculateWinner(squares);
    let status;
    let statusPlayer;
    if (context.winner) {
        setGameEnded(true);
        status = "Winner"
        statusPlayer = (context.winner[0] === "X" ?
          "X - " + (context.player1 ? context.player1 : "Player 1") : 
          "O - " + (context.player2 ? context.player2 : "Player 2"));
    } else {
        status = "Next Player" 
        statusPlayer = (xIsNext ? 
          "X - " + (context.player1 ? context.player1 : "Player 1") : 
          "O - " + (context.player2 ? context.player2 : "Player 2"));
    }

    const board = Array(3).fill(null).map((_, i) => {
        const row = Array(3).fill(null).map((_, j) => 
            <Square key={"s"+ (3 * i + j)} 
                    className={context.winner ? context.winner[1].includes((3 * i + j)) ? "square bg-yellow-400" : "square" : "square"}
                    value={squares[3 * i + j]} 
                    onSquareClick={() => handleClick(i,j)}/>);
        return (
          <div key={"r" + i} className="board-row">
            {row}
          </div>
        );
    });

    return (
        <>
            
            <div className="md:grid md:grid-cols-3 place-content-center mt-4">

              <div className="grid place-content-center mb-4 md:mb-0">
                <div className="bg-amber-800 p-2 text-white border border-black border-b-0">X - Player 1</div>
                <div className="border border-black p-2">
                  <input min={0} type={"text"} placeholder={"Player 1"} value={context.player1} onChange={e => context.setPlayer1(e.target.value)} 
                    className="bg-info input input-sm input-bordered border-gray-400 w-full focus:outline-0 focus:border-none"/></div>
              </div>

              <div className="grid place-content-center">
                <div className="mb-4 grid grid-cols-2">
                  <div className="text-amber-800 p-2 font-bold text-center">{status}</div>
                  <div className="p-2 border border-black text-center">{statusPlayer}</div>
                </div>
                {board}
              </div>

              <div className="grid place-content-center mt-4 md:mt-0">
                <div className="bg-amber-800 p-2 text-white border border-black border-b-0">O - Player 2</div>
                <div className="border border-black p-2">
                  <input min={0} type={"text"} placeholder={"Player 2"} value={context.player2} onChange={e => context.setPlayer2(e.target.value)} 
                    className="bg-info input input-sm input-bordered border-gray-400 w-full focus:outline-0 focus:border-none"/></div>
              </div>

            </div>
        </>
    );
}