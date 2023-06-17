import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import GameBoard from "./GameBoard";
import PlaysBoard from "./PlaysBoard";

export default function Games() {

    const context = useContext(GameContext)

    const xIsNext = context.currentMove % 2 === 0;
    const currentSquares = context.history[context.currentMove];

    function handlePlay(nextSquares,nextMove) {
        const nextHistory = [...context.history.slice(0, context.currentMove + 1), nextSquares];
        const nextMoveHistory = [...context.moveHistory.slice(0, context.currentMove + 1), nextMove];
        context.setHistory(nextHistory);
        context.setMoveHistory(nextMoveHistory)
        context.setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
      if (!context.gameEnded) {
        context.setCurrentMove(nextMove);
      }
    }

    const descendingMoves = context.history.map((squares, move) => { //[plays], index
        let description = 'Go to #' + move + ": " + context.moveHistory[move];
        return (
        <li key={"m" + move}>
          {move === (context.history.length - 1) ? 
          <>
            {!context.gameEnded ?
            <div className="p-2">
                <div className="bg-amber-800 p-2 text-white border border-black border-b-0 rounded-t-md text-center w-32">#{move}</div>
                <div className="p-2 border border-black">Playing</div>
            </div>
            :
            <div className="p-2">
                <div className="bg-amber-800 p-2 text-white border border-black border-b-0 rounded-t-md text-center w-32">Game Ended</div>
                <div className="p-2 border border-black">
                  <button className="bg-amber-800 rounded-md py-1 px-2 text-white border border-black" onClick={() => context.resetGame()}>Reset Game</button> 
                </div>
            </div>}
          </> 
          :
          <div onClick={() => jumpTo(move)} className="p-2">
            <div className="bg-amber-800 p-2 text-white border border-black border-b-0 rounded-t-md text-center cursor-pointer w-32">{description}</div>
            <PlaysBoard squares={squares}/>
          </div>}

        </li>);
    });

    const ascendingMoves = context.history.slice().reverse().map((squares, move) => { //[plays], index
        let description = 'Go to #' + (context.history.length - 1 - move) + ": " + context.moveHistory[context.history.length-1-move];
        return (
        <li key={"m" + move}>
          {move === 0 ? 
          <>
            {!context.gameEnded ?
            <div className="p-2">
                <div className="bg-amber-800 p-2 text-white border border-black border-b-0 rounded-t-md text-center w-32">#{context.history.length - 1 - move}</div>
                <div className="p-2 border border-black text-center">Playing</div>
            </div>
            :
            <div className="p-2">
                <div className="bg-amber-800 p-2 text-white border border-black border-b-0 rounded-t-md text-center w-32">Game Ended</div>
                <div className="p-2 border border-black">
                  <button className="bg-amber-800 rounded-md py-1 px-2 text-white border border-black" onClick={() => context.resetGame()}>Reset Game</button> 
                </div>
            </div>}
          </> 
          :
          <div onClick={() => jumpTo(context.history.length - 1 - move)} className="p-2">
            <div className="bg-amber-800 p-2 text-white border border-black border-b-0 rounded-t-md text-center cursor-pointer w-32">{description}</div>
            <PlaysBoard squares={squares}/>
          </div>}
        </li>);
    });

    return(
    <>
        <GameBoard xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        <div className="flex flex-row space-x-4 mb-4 border-t border-b p-2 mt-4 border-black">
            <h1 className="text-amber-800 font-bold text-2xl">Plays - 
            {context.descending ? 
                <span className="text-lg"> Descending (First to Last)</span> :
                <span className="text-lg"> Ascending (Last to First)</span>}
            </h1>
            <button className="bg-amber-800 rounded-md py-1 px-2 text-white border border-black" onClick={() => context.setDescending(!context.descending)}>Change</button>
        </div>
        {context.descending ? 
            <ol className="px-2 flex flex-row flex-wrap">{descendingMoves}</ol> : 
            <ol className="px-2 flex flex-row flex-wrap">{ascendingMoves}</ol>}
    </>)
}