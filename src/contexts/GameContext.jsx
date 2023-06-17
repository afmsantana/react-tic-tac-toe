import { createContext, useState } from "react";

export const GameContext = createContext();

export const GameProvider = (props) => {

    const [player1, setPlayer1] = useState({name: "Player 1", score: 0})
    const [player2, setPlayer2] = useState({name: "Player 2", score: 0})
    const [gameHistory, setGameHistory] = useState([]);
    
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [moveHistory, setMoveHistory] = useState([]);
    const [currentMove, setCurrentMove] = useState(0);
    const [gameEnded, setGameEnded] = useState(false);
    const [scored, setScored] = useState(false);

    const [descending, setDescending] = useState(false);

    function resetGame() {
        setHistory([Array(9).fill(null)]);
        setMoveHistory([])
        setCurrentMove(0);
        setGameEnded(false);
        setScored(false);
    }

    function resetGameHistory() {
        setPlayer1({name: player1.name, score: 0})
        setPlayer2({name: player2.name, score: 0})
        setGameHistory([]);
    }

    let game = {
        player1,
        setPlayer1,
        player2,
        setPlayer2,
        gameHistory,
        setGameHistory,

        history,
        setHistory,
        moveHistory,
        setMoveHistory,
        currentMove,
        setCurrentMove,
        gameEnded,
        setGameEnded,
        scored,
        setScored,

        descending,
        setDescending,

        resetGame,
        resetGameHistory
    };

    return <GameContext.Provider value={game}>{props.children}</GameContext.Provider>;
};