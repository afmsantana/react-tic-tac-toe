import { useState } from "react";
import GameBoard from "./GameBoard";
import Board from "../Board";

export default function Games() {

    const [gameEnded, setGameEnded] = useState(false);

    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [moveHistory, setMoveHistory] = useState([]);
    const [currentMove, setCurrentMove] = useState(0);
    const [descending, setDescending] = useState(true);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares,nextMove) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        const nextMoveHistory = [...moveHistory.slice(0, currentMove + 1), nextMove];
        setHistory(nextHistory);
        setMoveHistory(nextMoveHistory)
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const descendingMoves = history.map((squares, move) => { //[plays], index
        let description = 'Go to #' + move + ": " + moveHistory[move];
        return (
        <li key={"m" + move}>
          {move === (history.length - 1) ? 
          <>
            {!gameEnded ?
            <div className="p-2">
                <div className="bg-amber-800 p-2 text-white border border-black border-b-0 rounded-t-md text-center w-32">#{move}</div>
                <div className="p-2 border border-black">Playing</div>
            </div>
            :
            <div className="p-2">
                <div className="bg-amber-800 p-2 text-white border border-black border-b-0 rounded-md text-center w-32">Game Ended</div>
            </div>}
          </> 
          :
          <div onClick={() => jumpTo(move)} className="p-2">
            <div className="bg-amber-800 p-2 text-white border border-black border-b-0 rounded-t-md text-center cursor-pointer w-32">{description}</div>
            <Board squares={squares}/>
          </div>}

        </li>);
    });

    const ascendingMoves = history.slice().reverse().map((squares, move) => { //[plays], index
        let description = 'Go to #' + (history.length - 1 - move) + ": " + moveHistory[history.length-1-move];
        return (
        <li key={"m" + move}>
          {move === 0 ? 
          <>
            {!gameEnded ?
            <div className="p-2">
                <div className="bg-amber-800 p-2 text-white border border-black border-b-0 rounded-t-md text-center w-32">#{history.length - 1 - move}</div>
                <div className="p-2 border border-black">Playing</div>
            </div>
            :
            <div className="p-2">
                <div className="bg-amber-800 p-2 text-white border border-black border-b-0 rounded-md text-center w-32">Game Ended</div>
            </div>}
          </> 
          :
          <div onClick={() => jumpTo(history.length - 1 - move)} className="p-2">
            <div className="bg-amber-800 p-2 text-white border border-black border-b-0 rounded-t-md text-center cursor-pointer w-32">{description}</div>
            <Board squares={squares}/>
          </div>}
        </li>);
    });

    return(
    <>
        <GameBoard xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} setGameEnded={setGameEnded} />
        <div className="flex flex-row space-x-4 mb-4 border-t border-b p-2 mt-4 border-black">
            <h1 className="text-amber-800 font-bold text-2xl">Plays</h1>
            {descending ? 
                <button className="bg-gradient-to-r from-amber-900 to-amber-700 rounded-md py-1 px-2 text-white border border-black from-current" onClick={() => setDescending(!descending)}>Ascending (Last to First)</button> : 
                <button className="bg-gradient-to-r from-amber-700 to-amber-900 rounded-md py-1 px-2 text-white border border-black from-current" onClick={() => setDescending(!descending)}>Descending (First to Last)</button>}
        </div>
        {descending ? 
            <ol className="px-2 flex flex-row flex-wrap">{descendingMoves}</ol> : 
            <ol className="px-2 flex flex-row flex-wrap">{ascendingMoves}</ol>}
    </>)
}