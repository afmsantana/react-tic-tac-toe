import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import ResultsBoard from "./ResultsBoard";

export default function GameResults() {

    const context = useContext(GameContext)

    const games = context.gameHistory.map((game,i) => { //[game], index
        let description = 'Game #' + (i + 1);
        return (
        <li key={"g" + i}>
          <div className="p-2">
            <div className="bg-amber-800 p-2 text-white border border-black border-b-0 rounded-t-md text-center cursor-pointer w-32">{description}</div>
            <ResultsBoard squares={game.squares} win={game.win}/>
          </div>
        </li>);
    });

    return(
    <>

        <div className="grid place-content-center mt-4">
            <div className="flex flex-row">

            <div className="md:mb-0">
                <div className="bg-amber-800 p-2 text-white border border-black border-b-0">X - Player 1</div>
                <div className="border border-black p-2">
                    <input type={"text"} placeholder={"Player 1"} value={context.player1.name === "Player 1" ? "" : context.player1.name} onChange={e => context.setPlayer1({name: e.target.value, score: context.player1.score})} 
                    className="bg-info input input-sm input-bordered border-gray-400 w-full focus:outline-0 focus:border-none"/>
                </div>
            </div>

            <div className="grid place-content-center md:mb-0">
                <div className="border border-black p-6 text-2xl border-l-0 border-r-0">
                    {context.player1.score}
                </div>
            </div>

            <div className="grid place-content-center md:mb-0">
                <div className="border border-black p-6 text-2xl border-r-0">
                    {context.player2.score}
                </div>
            </div>


            <div className="md:mt-0">
                <div className="bg-amber-800 p-2 text-white border border-black border-b-0">O - Player 2</div>
                <div className="border border-black p-2">
                    <input type={"text"} placeholder={"Player 2"} value={context.player2.name === "Player 2" ? "" : context.player2.name} onChange={e => context.setPlayer2({name: e.target.value, score: context.player2.score})} 
                    className="bg-info input input-sm input-bordered border-gray-400 w-full focus:outline-0 focus:border-none"/>
                </div>
            </div>

            </div>

        </div>

        <div className="flex flex-row space-x-4 mb-4 border-t border-b p-2 mt-4 border-black">
            <h1 className="text-amber-800 font-bold text-2xl">Games</h1>
            <button className="bg-amber-800 rounded-md px-2 text-white border border-black" onClick={() => context.resetGameHistory()}>Reset History</button> 
        </div>

        <ol className="px-2 flex flex-row flex-wrap">{games}</ol>
    </>)
}