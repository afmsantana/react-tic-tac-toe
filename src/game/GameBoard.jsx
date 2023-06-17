import Square from "../Square";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "../contexts/GameContext";

export default function GameBoard({ xIsNext, squares, onPlay }) {

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

    let winner = calculateWinner(squares);
    const [status, setStatus] = useState("");
    const [statusPlayer, setStatusPlayer] = useState("");

    useEffect(() => {
      if (!squares.includes(null)) {
        if (!context.gameEnded) {
          context.setGameHistory([...context.gameHistory, {squares: squares, win: []}])
        }
        context.setGameEnded(true);
        setStatus("DRAW")
        setStatusPlayer("")
      } else if (winner) {
        if (!context.gameEnded) {
          if (winner[0] === "X") {
            let newScore = context.player1.score + 1;
            context.setPlayer1(player1 => ({name: player1.name, score: newScore}))
            context.setGameHistory([...context.gameHistory, {squares: squares, win: winner[1]}])
          } else{
            let newScore = context.player2.score + 1;
            context.setPlayer2(player2 => ({name: player2.name, score: newScore}))
            context.setGameHistory([...context.gameHistory, {squares: squares, win: winner[1]}])
          }
        }
        context.setGameEnded(true);
        setStatus("Winner");
        setStatusPlayer(winner[0] === "X" ?
          "X - " + context.player1.name : 
          "O - " + context.player2.name);
        
      } else {
          setStatus("Next Player") 
          setStatusPlayer(xIsNext ? 
            "X - " + context.player1.name : 
            "O - " + context.player2.name);
      }
    }, [context, squares, winner, xIsNext])

    const board = Array(3).fill(null).map((_, i) => {
        const row = Array(3).fill(null).map((_, j) => 
            <Square key={"s"+ (3 * i + j)} 
                    className={winner ? winner[1].includes((3 * i + j)) ? "square bg-yellow-400" : "square" : "square"}
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
                  <input min={0} type={"text"} placeholder={"Player 1"} value={context.player1.name === "Player 1" ? "" : context.player1.name} onChange={e => context.setPlayer1({name: e.target.value, score: context.player1.score})} 
                    className="bg-info input input-sm input-bordered border-gray-400 w-full focus:outline-0 focus:border-none"/></div>
              </div>

              <div className="grid place-content-center">
                {statusPlayer ? 
                <div className="mb-4 grid grid-cols-2">
                  <div className="text-amber-800 p-2 font-bold text-center">{status}</div>
                  <div className="p-2 border border-black text-center">{statusPlayer}</div>
                </div> :
                <div className="mb-4 grid grid-cols-1">
                  <div className="text-amber-800 p-2 font-bold text-center">{status}</div>
                </div>}
                {board}
              </div>

              <div className="grid place-content-center mt-4 md:mt-0">
                <div className="bg-amber-800 p-2 text-white border border-black border-b-0">O - Player 2</div>
                <div className="border border-black p-2">
                  <input min={0} type={"text"} placeholder={"Player 2"} value={context.player2.name === "Player 2" ? "" : context.player2.name} onChange={e => context.setPlayer2({name: e.target.value, score: context.player2.score})} 
                    className="bg-info input input-sm input-bordered border-gray-400 w-full focus:outline-0 focus:border-none"/></div>
              </div>

            </div>
        </>
    );
}